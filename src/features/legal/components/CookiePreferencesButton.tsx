'use client'

import { openCookiePreferences } from '../consent'

interface CookiePreferencesButtonProps {
    label: string
    className?: string
}

export default function CookiePreferencesButton({ label, className }: CookiePreferencesButtonProps) {
    return (
        <button
            type="button"
            onClick={openCookiePreferences}
            className={
                className ??
                'cursor-pointer bg-transparent p-0 text-left text-xs text-cream/80 transition-colors hover:text-gold'
            }
        >
            {label}
        </button>
    )
}
