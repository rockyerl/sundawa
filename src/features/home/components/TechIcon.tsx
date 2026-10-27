import Image from 'next/image'
import type { Tech, TechCategory } from '../tech'

type TechIconProps = {
    item: Tech | TechCategory
    size: number
    style?: React.CSSProperties
}

export default function TechIcon({ item, size, style }: TechIconProps) {
    if (item.svgIcon) {
        return (
            <span
                style={{ display: 'inline-block', width: size, height: size, flexShrink: 0, ...style }}
                dangerouslySetInnerHTML={{ __html: item.svgIcon }}
            />
        )
    }

    if (!item.icon) return null

    return (
        <Image
            src={item.icon}
            alt={item.name}
            width={size}
            height={size}
            unoptimized
            style={{ display: 'block', flexShrink: 0, ...style }}
        />
    )
}
