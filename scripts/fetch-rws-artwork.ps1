# Downloads the public-domain Rider-Waite-Smith deck (Pamela Colman Smith, 1909)
# scans from Wikimedia Commons into public/cards/<card-id>.jpg, one image per
# card id in src/data/tarot.json. Safe to re-run: already-downloaded cards are
# skipped unless -Force is given.

param(
  [switch]$Force,
  [int]$Width = 400
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root 'public\cards'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$cards = Get-Content -Raw -Encoding UTF8 (Join-Path $root 'src\data\tarot.json') | ConvertFrom-Json

# RWS majors: Strength is VIII and Justice is XI (Waite's swap), matching tarot.json.
$majorNum = @{
  '0' = '00'; 'I' = '01'; 'II' = '02'; 'III' = '03'; 'IV' = '04'; 'V' = '05'
  'VI' = '06'; 'VII' = '07'; 'VIII' = '08'; 'IX' = '09'; 'X' = '10'; 'XI' = '11'
  'XII' = '12'; 'XIII' = '13'; 'XIV' = '14'; 'XV' = '15'; 'XVI' = '16'; 'XVII' = '17'
  'XVIII' = '18'; 'XIX' = '19'; 'XX' = '20'; 'XXI' = '21'
}
$majorName = @{
  '00' = 'Fool'; '01' = 'Magician'; '02' = 'High Priestess'; '03' = 'Empress'
  '04' = 'Emperor'; '05' = 'Hierophant'; '06' = 'Lovers'; '07' = 'Chariot'
  '08' = 'Strength'; '09' = 'Hermit'; '10' = 'Wheel of Fortune'; '11' = 'Justice'
  '12' = 'Hanged Man'; '13' = 'Death'; '14' = 'Temperance'; '15' = 'Devil'
  '16' = 'Tower'; '17' = 'Star'; '18' = 'Moon'; '19' = 'Sun'; '20' = 'Judgement'
  '21' = 'World'
}
# Commons minor arcana prefixes ("Pents" is not a typo).
$suitFile = @{ 'wands' = 'Wands'; 'cups' = 'Cups'; 'swords' = 'Swords'; 'pentacles' = 'Pents' }
# Commons numbering: 01 Ace, 02-10 pips, 11 Page, 12 Knight, 13 Queen, 14 King.
$rankFile = @{ 'Ace' = '01'; 'Page' = '11'; 'Knight' = '12'; 'Queen' = '13'; 'King' = '14' }

function Get-CommonsFileName($card) {
  if ($card.arcana -eq 'major') {
    $n = $majorNum[$card.number]
    return "RWS Tarot $n $($majorName[$n]).jpg"
  }
  $rank = if ($rankFile.ContainsKey($card.number)) { $rankFile[$card.number] } else { '{0:D2}' -f [int]$card.number }
  return '{0}{1}.jpg' -f $suitFile[$card.suit], $rank
}

$headers = @{
  'User-Agent' = 'CelestiaCard-fetch/0.1 (static site asset fetch; Wikimedia Commons)'
}

function Test-Jpeg($path) {
  if (-not (Test-Path -LiteralPath $path)) { return $false }
  $bytes = [System.IO.File]::ReadAllBytes($path)
  return ($bytes.Length -gt 20000 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8)
}

function Save-Artwork($url, $dest) {
  $waits = @(8000, 15000, 25000)
  for ($attempt = 0; $attempt -le $waits.Count; $attempt++) {
    try {
      Invoke-WebRequest -Uri $url -OutFile $dest -Headers $headers -UseBasicParsing -TimeoutSec 60
      if (Test-Jpeg $dest) { return $true }
      Write-Output ('      invalid payload, retrying')
    }
    catch {
      if ($attempt -lt $waits.Count) {
        Write-Output ('      attempt {0} failed ({1}), backing off {2}s' -f ($attempt + 1), $_.Exception.Message.Split("`n")[0], $waits[$attempt])
        Start-Sleep -Milliseconds $waits[$attempt]
      }
      else {
        throw
      }
    }
  }
  return $false
}

$failed = @()
$total = $cards.Count
$i = 0
foreach ($card in $cards) {
  $i++
  $dest = Join-Path $outDir ($card.id + '.jpg')
  if (Test-Jpeg $dest) {
    Write-Output ('skip {0}' -f $card.id)
    continue
  }
  if ((Test-Path -LiteralPath $dest)) { Remove-Item -LiteralPath $dest -Force }
  $commonsName = Get-CommonsFileName $card
  $encoded = [uri]::EscapeDataString($commonsName)
  $url = "https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=$Width"
  try {
    if (Save-Artwork $url $dest) {
      Write-Output ('ok   {0,2}/{1} {2} <- {3}' -f $i, $total, $card.id, $commonsName)
    }
    else {
      Write-Output ('FAIL {0}: exhausted retries' -f $card.id)
      $failed += $card.id
    }
  }
  catch {
    Write-Output ('FAIL {0}: {1}' -f $card.id, $_.Exception.Message)
    $failed += $card.id
  }
  Start-Sleep -Milliseconds 1500
}

if ($failed.Count -gt 0) {
  Write-Output ('FAILED ({0}): {1}' -f $failed.Count, ($failed -join ', '))
  exit 1
}
Write-Output ('Done: {0} images in {1}' -f $total, $outDir)
