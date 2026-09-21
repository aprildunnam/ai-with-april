<#
.SYNOPSIS
  Seeds the signed-in demo mailbox with the April's Analog demo emails in emails.json.

.DESCRIPTION
  Creates each message directly in Inbox or Sent Items using Microsoft Graph, with the
  sender, date and read/unread state set so it looks like real mail. Dates are relative
  to the day you run it (daysAgo in emails.json), so run it 1-3 days before the session.
  Nothing is actually sent, so no one outside the tenant gets an email.

  Requires: PowerShell 7+ (or Windows PowerShell 5.1) and the Microsoft.Graph.Authentication module.
  Sign in as the DEMO user when prompted. Scope needed: Mail.ReadWrite (delegated).

.PARAMETER Sets
  Optional. Only seed these sets (the "set" field in emails.json). Default: all.

.EXAMPLE
  .\Seed-Mailbox.ps1
.EXAMPLE
  .\Seed-Mailbox.ps1 -Sets FestInbox
#>
param(
  [string]$JsonPath = (Join-Path $PSScriptRoot 'emails.json'),
  [string[]]$Sets
)

if (-not (Get-Module -ListAvailable -Name Microsoft.Graph.Authentication)) {
  Install-Module Microsoft.Graph.Authentication -Scope CurrentUser -Force
}
Import-Module Microsoft.Graph.Authentication
Connect-MgGraph -Scopes 'Mail.ReadWrite','User.Read' -NoWelcome

$me = Invoke-MgGraphRequest -Method GET -Uri 'https://graph.microsoft.com/v1.0/me?$select=displayName,mail,userPrincipalName'
$myAddress = if ($me.mail) { $me.mail } else { $me.userPrincipalName }
Write-Host "Seeding mailbox for $($me.displayName) <$myAddress>" -ForegroundColor Cyan

$emails = Get-Content -Path $JsonPath -Raw -Encoding UTF8 | ConvertFrom-Json
if ($Sets) { $emails = $emails | Where-Object { $Sets -contains $_.set } }

function Resolve-Address([string]$a) { if ($a -eq '{ME}') { $myAddress } else { $a } }

# Oldest first so conversations read in order
foreach ($e in ($emails | Sort-Object -Property @{Expression={[int]$_.daysAgo}; Descending=$true}, hour)) {
  $when = (Get-Date).Date.AddDays(-[int]$e.daysAgo).AddHours([int]$e.hour).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
  $fromName = if ($e.fromAddress -eq '{ME}') { $me.displayName } else { $e.fromName }
  $from = @{ emailAddress = @{ name = $fromName; address = (Resolve-Address $e.fromAddress) } }
  $to = @($e.to | ForEach-Object { @{ emailAddress = @{ name = $_.name; address = (Resolve-Address $_.address) } } })
  $flags = if ($e.isRead) { '1' } else { '0' }   # PR_MESSAGE_FLAGS: 1 = read, 0 = unread (not a draft)

  $msg = @{
    subject      = $e.subject
    body         = @{ contentType = 'Text'; content = $e.body }
    from         = $from
    sender       = $from
    toRecipients = $to
    isRead       = [bool]$e.isRead
    singleValueExtendedProperties = @(
      @{ id = 'Integer 0x0E07';    value = $flags },   # message flags (not a draft)
      @{ id = 'SystemTime 0x0E06'; value = $when },    # delivery time
      @{ id = 'SystemTime 0x0039'; value = $when }     # sent time
    )
  }
  $folder = if ($e.folder -eq 'sentitems') { 'sentitems' } else { 'inbox' }
  try {
    Invoke-MgGraphRequest -Method POST -Uri "https://graph.microsoft.com/v1.0/me/mailFolders/$folder/messages" `
      -Body ($msg | ConvertTo-Json -Depth 10) -ContentType 'application/json' | Out-Null
    Write-Host "  [$($e.set)] $folder : $($e.subject)"
  } catch {
    Write-Warning "Failed: $($e.subject) -> $($_.Exception.Message)"
  }
}
Write-Host 'Done. Give search and Copilot a few hours (ideally overnight) to index the new mail.' -ForegroundColor Green
