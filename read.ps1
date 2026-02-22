<#
.SYNOPSIS
    Merges all files in the current folder (and subfolders) into one text file,
    with the option to exclude files inside specified folders and set a custom output file name.
.DESCRIPTION
    This script recursively scans the directory from which it is run.
    For each file (except those inside any avoided folder), it writes a header
    "---| filename.ext |---" followed by the file's content into a single output file.
    Progress is shown in the console using Write-Progress and file names.
.PARAMETER Avoid
    One or more folder names to exclude. Any file whose full path contains one of
    these folder names (case‑insensitive) will be skipped.
    You can provide multiple values either as a comma‑separated list (recommended):
        -Avoid node_modules,.idea,dist,.git
    or by repeating the parameter:
        -Avoid node_modules -Avoid .idea -Avoid dist -Avoid .git
.PARAMETER OutputFile
    The name of the output file. Default is "merged_output.txt".
    Example: -OutputFile "project_code.txt"
.NOTES
    - The output file is saved in the current working directory.
    - If the output file already exists, it is overwritten.
    - Binary files are read as text – their content may appear garbled.
#>

param(
    [string[]]$Avoid,
    [string]$OutputFile = "merged_output.txt"
)


$outFilePath = Join-Path (Get-Location) $OutputFile

# Delete any existing output file to start fresh
if (Test-Path $outFilePath) {
    Remove-Item $outFilePath -Force
}

# Get all files recursively, excluding the output file itself
$allFiles = Get-ChildItem -File -Recurse | Where-Object { $_.FullName -ne $outFilePath }

# Filter out files whose path contains any of the avoided folder names
if ($Avoid) {
    Write-Host "Excluding folders: $($Avoid -join ', ')" -ForegroundColor Yellow
    $files = $allFiles | Where-Object {
        $path = $_.FullName
        $segments = $path.Split([IO.Path]::DirectorySeparatorChar)
        $skip = $false
        foreach ($folder in $Avoid) {
            if ($segments -contains $folder) {   # case‑insensitive comparison
                $skip = $true
                break
            }
        }
        -not $skip
    }
} else {
    $files = $allFiles
}

$total = $files.Count
$index = 0

# If no files left after filtering, inform the user and exit
if ($total -eq 0) {
    Write-Host "No files to process after applying exclusions." -ForegroundColor Red
    exit
}

# Create a StreamWriter to write the output file (UTF-8 without BOM)
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$writer = New-Object System.IO.StreamWriter ($outFilePath, $false, $utf8NoBom)

try {
    foreach ($file in $files) {
        $index++
        $percent = [math]::Round(($index / $total) * 100, 2)

        # Show progress in the terminal
        Write-Progress -Activity "Merging files" -Status "Processing $($file.Name)" -PercentComplete $percent
        Write-Host "[$index/$total] Processing $($file.Name)" -ForegroundColor Cyan

        # Write the file header
        $writer.WriteLine("---| $($file.Name) |---")

        # Read and write the file content
        try {
            $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
            $writer.WriteLine($content)
        }
        catch {
            $writer.WriteLine("<<< Error reading file: $_ >>>")
        }

        # Blank line between files for readability
        $writer.WriteLine()
    }
}
finally {
    $writer.Close()
}

Write-Host "`nDone. Output saved to: $outFilePath" -ForegroundColor Green