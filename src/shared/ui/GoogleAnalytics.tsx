'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { getGoogleAnalyticsId, getGoogleTagManagerId } from '@/lib/analytics'
import { hasAnalyticsConsent, subscribeConsentChanges } from '@/src/features/legal/consent'

/**
 * Consent-gated Google Analytics 4 & Google Tag Manager loader.
 * Non-essential analytics scripts are strictly withheld until the visitor
 * explicitly grants analytics consent via CookieConsentManager.
 */
export default function GoogleAnalytics() {
    const gaId = getGoogleAnalyticsId()
    const gtmId = getGoogleTagManagerId()
    const [consented, setConsented] = useState(false)

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            setConsented(hasAnalyticsConsent())
        })
        const unsubscribe = subscribeConsentChanges((record) => {
            setConsented(record?.analytics === true)
        })
        return () => {
            window.cancelAnimationFrame(frame)
            unsubscribe()
        }
    }, [])

    if (!consented || (!gaId && !gtmId)) return null

    return (
        <>
            {gtmId && (
                <Script
                    id="gtm-head"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
                        `,
                    }}
                />
            )}

            {gaId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script
                        id="ga-init"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', {
    page_path: window.location.pathname,
    anonymize_ip: true,
});
                            `,
                        }}
                    />
                </>
            )}
        </>
    )
}
