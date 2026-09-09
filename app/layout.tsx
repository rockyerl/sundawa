import type { ReactNode } from 'react'
import Script from 'next/script'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html suppressHydrationWarning data-scroll-behavior="smooth">
        <body>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-BCPRZ1YE8K"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-BCPRZ1YE8K');
                `}
        </Script>
        {children}
        </body>
        </html>
    )
}