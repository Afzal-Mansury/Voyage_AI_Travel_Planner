$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$gcloudPath = "$env:LocalAppData\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
$gcloudPathAlt = "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"

if (-not (Test-Path $gcloudPath)) {
    if (Test-Path $gcloudPathAlt) {
        $gcloudPath = $gcloudPathAlt
    } else {
        Write-Host "Google Cloud CLI not found. Downloading..."
        $uniqueId = [guid]::NewGuid().ToString().Substring(0,8)
        $installerPath = "$env:Temp\GoogleCloudSDKInstaller_$uniqueId.exe"
        
        Write-Host "Downloading to $installerPath..."
        Invoke-WebRequest -Uri "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe" -OutFile $installerPath -UseBasicParsing
        
        Write-Host "Installing silently... This might take a few minutes."
        Start-Process -FilePath $installerPath -ArgumentList "/S", "/noreporting" -Wait
        
        if (Test-Path "$env:LocalAppData\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd") {
            $gcloudPath = "$env:LocalAppData\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
        } elseif (Test-Path "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd") {
            $gcloudPath = "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
        } else {
            Write-Host "Failed to find gcloud after installation. Please install manually."
            exit 1
        }
    }
}

Write-Host "------------------------------------------------------"
Write-Host "A browser window will now open for you to log in to Google Cloud."
Write-Host "Please select your account and click 'Allow'."
Write-Host "------------------------------------------------------"

& $gcloudPath auth login

Write-Host "------------------------------------------------------"
Write-Host "Setting project to h2kfz-495706..."
& $gcloudPath config set project h2kfz-495706

Write-Host "Enabling Cloud Run and Cloud Build APIs (This may take a moment)..."
& $gcloudPath services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

Write-Host "Starting Deployment to Cloud Run! This takes about 3-5 minutes..."
& $gcloudPath run deploy voyage-ai --source . --platform managed --region us-central1 --allow-unauthenticated

Write-Host "------------------------------------------------------"
Write-Host "Deployment finished!"
