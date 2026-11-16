Add-Type -AssemblyName System.Drawing

function Generate-OgImage {
    param (
        [string]$OutputPath,
        [string]$Category,
        [string]$Title,
        [string]$Subtitle,
        [string]$Highlight1,
        [string]$Highlight2,
        [string]$BadgeText
    )

    $width = 1200
    $height = 630
    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # 1. Background gradient
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point($width, $height)),
        [System.Drawing.ColorTranslator]::FromHtml('#081320'),
        [System.Drawing.ColorTranslator]::FromHtml('#0E2238')
    )
    $g.FillRectangle($bgBrush, 0, 0, $width, $height)
    $bgBrush.Dispose()

    # 2. Ambient radial accent (top right sky/blue glow, bottom left subtle gold glow)
    $blueGlowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 0, 240, 255))
    $g.FillEllipse($blueGlowBrush, 850, -100, 450, 450)
    $blueGlowBrush.Dispose()

    $goldGlowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(18, 219, 201, 119))
    $g.FillEllipse($goldGlowBrush, -100, 400, 400, 400)
    $goldGlowBrush.Dispose()

    # 3. Outer border and decorative accents
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#DBC977'), 1.5)
    $g.DrawRectangle($borderPen, 32, 32, $width - 64, $height - 64)
    $borderPen.Dispose()

    # Corner decorative brackets
    $accentPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#00F0FF'), 3)
    # Top-left
    $g.DrawLine($accentPen, 32, 56, 56, 56)
    $g.DrawLine($accentPen, 56, 32, 56, 56)
    # Bottom-right
    $g.DrawLine($accentPen, $width - 56, $height - 32, $width - 56, $height - 56)
    $g.DrawLine($accentPen, $width - 32, $height - 56, $width - 56, $height - 56)
    $accentPen.Dispose()

    # 4. Top Header: Sundawa Logo & Identity + Badge
    $fontBrand = New-Object System.Drawing.Font('Arial', 13, [System.Drawing.FontStyle]::Bold)
    $fontBrandSub = New-Object System.Drawing.Font('Arial', 9, [System.Drawing.FontStyle]::Regular)
    $fontCategory = New-Object System.Drawing.Font('Arial', 11, [System.Drawing.FontStyle]::Bold)
    $fontTitle = New-Object System.Drawing.Font('Arial', 32, [System.Drawing.FontStyle]::Bold)
    $fontSubtitle = New-Object System.Drawing.Font('Arial', 17, [System.Drawing.FontStyle]::Regular)
    $fontHighlight = New-Object System.Drawing.Font('Arial', 13, [System.Drawing.FontStyle]::Bold)
    $fontBadge = New-Object System.Drawing.Font('Arial', 10, [System.Drawing.FontStyle]::Bold)

    $brushGold = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#DBC977'))
    $brushCream = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#F8F8F8'))
    $brushSky = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#00F0FF'))
    $brushMuted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 248, 248, 248))

    # Try loading Sundawa logo if present
    $logoPath = 'd:\work\sundawa-web\public\assets\logo2.png'
    if (Test-Path $logoPath) {
        $logoImg = [System.Drawing.Image]::FromFile($logoPath)
        $g.DrawImage($logoImg, 72, 68, 48, 48)
        $logoImg.Dispose()
    }

    $g.DrawString('SUNDAWA TEKNOLOGI', $fontBrand, $brushCream, 132, 72)
    $g.DrawString('Client-Centric Comfort, Professional Precision', $fontBrandSub, $brushGold, 132, 95)

    # Top Right Badge
    $badgeRect = New-Object System.Drawing.Rectangle(760, 70, 368, 38)
    $badgeBgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(40, 0, 240, 255))
    $badgeBorderPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#00F0FF'), 1)
    $g.FillRectangle($badgeBgBrush, $badgeRect)
    $g.DrawRectangle($badgeBorderPen, $badgeRect)
    $badgeBgBrush.Dispose()
    $badgeBorderPen.Dispose()

    $badgeFormat = New-Object System.Drawing.StringFormat
    $badgeFormat.Alignment = [System.Drawing.StringAlignment]::Center
    $badgeFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString($BadgeText, $fontBadge, $brushSky, (New-Object System.Drawing.RectangleF(760, 70, 368, 38)), $badgeFormat)

    # Horizontal divider under brand
    $divPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(50, 219, 201, 119), 1)
    $g.DrawLine($divPen, 72, 140, $width - 72, 140)
    $divPen.Dispose()

    # 5. Category Eyebrow
    $g.DrawString($Category.ToUpper(), $fontCategory, $brushGold, 72, 170)

    # 6. Main Title
    $titleRect = New-Object System.Drawing.RectangleF(72, 205, 1056, 95)
    $titleFormat = New-Object System.Drawing.StringFormat
    $g.DrawString($Title, $fontTitle, $brushCream, $titleRect, $titleFormat)

    # 7. Subtitle / Core Message
    $subRect = New-Object System.Drawing.RectangleF(72, 310, 1056, 75)
    $g.DrawString($Subtitle, $fontSubtitle, $brushMuted, $subRect, $titleFormat)

    # 8. Highlight Cards (2 columns at bottom)
    $card1Rect = New-Object System.Drawing.Rectangle(72, 410, 510, 110)
    $card2Rect = New-Object System.Drawing.Rectangle(618, 410, 510, 110)

    $cardBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 219, 201, 119))
    $cardBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(80, 219, 201, 119), 1)

    $g.FillRectangle($cardBg, $card1Rect)
    $g.DrawRectangle($cardBorder, $card1Rect)
    $g.FillRectangle($cardBg, $card2Rect)
    $g.DrawRectangle($cardBorder, $card2Rect)
    $cardBg.Dispose()
    $cardBorder.Dispose()

    # Draw highlights inside cards
    $g.DrawString("01 / ARSITEKTUR TERUJI", $fontBadge, $brushGold, 92, 426)
    $g.DrawString($Highlight1, $fontHighlight, $brushCream, (New-Object System.Drawing.RectangleF(92, 450, 470, 60)), $titleFormat)

    $g.DrawString("02 / DAMPAK STRATEGIS", $fontBadge, $brushGold, 638, 426)
    $g.DrawString($Highlight2, $fontHighlight, $brushCream, (New-Object System.Drawing.RectangleF(638, 450, 470, 60)), $titleFormat)

    # 9. Bottom Footer URL & Assurances
    $g.DrawString("sundawa.net", $fontBadge, $brushGold, 72, 548)
    $g.DrawString("PT Sundawa Teknologi Indonesia · Bandung, Jawa Barat", $fontBadge, $brushMuted, 200, 548)

    # Save to disk
    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

    # Cleanup
    $fontBrand.Dispose()
    $fontBrandSub.Dispose()
    $fontCategory.Dispose()
    $fontTitle.Dispose()
    $fontSubtitle.Dispose()
    $fontHighlight.Dispose()
    $fontBadge.Dispose()
    $brushGold.Dispose()
    $brushCream.Dispose()
    $brushSky.Dispose()
    $brushMuted.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated: $OutputPath"
}

# Generate LAKUPANDAI OG Image
Generate-OgImage `
    -OutputPath 'd:\work\sundawa-web\public\og-lakupandai.png' `
    -Category 'Enterprise Agent Banking Infrastructure' `
    -Title 'LAKUPANDAI by Sundawa' `
    -Subtitle 'Platform agent banking siap pakai untuk Bank Komersial, BPD, dan BPR. Perluas jangkauan nasabah tanpa mengorbankan kendali internal bank.' `
    -Highlight1 'On-Premise Ready, Maker-Checker, dan Hardware Key Binding yang aman.' `
    -Highlight2 'Rekonsiliasi 4-Arah otomatis dengan integrasi adaptor core banking.' `
    -BadgeText 'ENTERPRISE BANKING · ON-PREMISE READY'

# Generate Modernisasi Sistem OG Image
Generate-OgImage `
    -OutputPath 'd:\work\sundawa-web\public\og-modernisasi-sistem.png' `
    -Category 'Core Engineering & System Modernization' `
    -Title 'Modernisasi Sistem Lama (Legacy Systems)' `
    -Subtitle 'Benahi platform lama tanpa menghentikan operasional berjalan. Arsitektur modular, peremajaan komponen kritis, dan migrasi bertahap tanpa downtime.' `
    -Highlight1 'Peta ketergantungan sistem & analisis retensi vs refactor berbasis ROI.' `
    -Highlight2 'Penerapan Strangler Fig pattern dengan prosedur rollback nol risiko.' `
    -BadgeText 'ZERO DOWNTIME · STRANGLER FIG PATTERN'
