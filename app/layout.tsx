
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sundawa Teknologi — Professional Precision, Customer Comfort',
  description: 'Perusahaan IT yang berfokus pada kenyamanan dan kebutuhan klien dengan solusi inovatif.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
