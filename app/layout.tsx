import type { ReactNode } from 'react'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html suppressHydrationWarning data-scroll-behavior="smooth">
        <body>{children}</body>
        </html>
    )
}