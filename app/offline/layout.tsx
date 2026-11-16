import type { ReactNode } from 'react'

export default function OfflineLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="id" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    )
}
