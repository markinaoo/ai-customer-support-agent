$ErrorActionPreference = "Stop"

$root = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$nodeDir = Join-Path $root ".tools\node-v22.11.0-win-x64"
$npm = Join-Path $nodeDir "npm.cmd"
$logDir = Join-Path $root ".logs"
$logPath = Join-Path $logDir "dev-server.log"
$url = "http://127.0.0.1:3000"

if (-not (Test-Path -LiteralPath $npm)) {
  throw "Portable Node was not found. Expected npm at: $npm"
}

New-Item -ItemType Directory -Force -Path $logDir | Out-Null

function Test-Site {
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -ge 200 -and $response.StatusCode -lt 500
  } catch {
    return $false
  }
}

if (-not (Test-Site)) {
  $command = @"
`$env:Path = '$nodeDir;' + `$env:Path
Set-Location -LiteralPath '$root'
& '$npm' run dev -- --hostname 127.0.0.1 --port 3000 *> '$logPath'
"@

  Start-Process -FilePath "powershell.exe" `
    -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", $command) `
    -WindowStyle Hidden

  for ($i = 0; $i -lt 80; $i++) {
    if (Test-Site) {
      break
    }
    Start-Sleep -Milliseconds 750
  }
}

if (-not (Test-Site)) {
  throw "The site did not start on $url. Check the log at $logPath"
}

Start-Process $url
