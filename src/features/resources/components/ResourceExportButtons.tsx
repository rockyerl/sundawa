'use client'

import { Download, Printer } from 'lucide-react'

interface ResourceExportButtonsProps {
    guideId: string
    title: string
    pillar: string
    checklist: string[]
    csvLabel: string
    pdfLabel: string
}

export default function ResourceExportButtons({
    guideId,
    title,
    pillar,
    checklist,
    csvLabel,
    pdfLabel,
}: ResourceExportButtonsProps) {
    const handleExportCsv = () => {
        const escapeCell = (text: string) => `"${text.replace(/"/g, '""')}"`
        const rows = [
            ['No', 'Pillar', 'Guide', 'Evaluation Item', 'Status', 'Owner Notes'],
            ...checklist.map((item, idx) => [
                String(idx + 1),
                pillar,
                title,
                item,
                'Pending',
                '',
            ]),
        ]
        const csvContent = '\uFEFF' + rows.map((row) => row.map(escapeCell).join(',')).join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = `sundawa-${guideId}-checklist.csv`
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="print-hidden flex flex-wrap gap-2">
            <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 border border-sky/35 bg-sky/10 px-4 py-2.5 text-[0.68rem] font-bold tracking-[0.14em] text-sky uppercase transition-colors hover:border-sky hover:bg-sky/20"
            >
                <Download size={13} aria-hidden="true" />
                <span>{csvLabel}</span>
            </button>
            <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 border border-cream/20 px-4 py-2.5 text-[0.68rem] font-bold tracking-[0.14em] text-cream/85 uppercase transition-colors hover:border-gold/50 hover:text-gold"
            >
                <Printer size={13} aria-hidden="true" />
                <span>{pdfLabel}</span>
            </button>
        </div>
    )
}
