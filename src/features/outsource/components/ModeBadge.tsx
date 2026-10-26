import type { Mode } from '../domain'

type ModeBadgeProps = {
    mode: Mode
}

const styles: Record<Mode, React.CSSProperties> = {
    remote: { background: 'rgba(45,125,210,0.2)', color: '#7BB8EE' },
    hybrid: { background: 'rgba(219,201,119,0.18)', color: '#DBC977' },
    onsite: { background: 'rgba(166,106,44,0.25)', color: '#E0A060' },
}

const labels: Record<Mode, string> = {
    remote: 'Remote',
    hybrid: 'Hybrid',
    onsite: 'Onsite',
}

export default function ModeBadge({ mode }: ModeBadgeProps) {
    return (
        <span style={{
            ...styles[mode],
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: '0.6rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
        }}>
            {labels[mode]}
        </span>
    )
}
