import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

const components: PortableTextComponents = {
    block: {
        h1: ({ children }) => (
            <h1 className="text-4xl font-black mt-10 mb-5 text-[#F8F8F8]">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-8 mb-4 text-[#F8F8F8]">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-bold mt-6 mb-3 text-[#F8F8F8]">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-lg font-bold mt-6 mb-3 text-[#F8F8F8]">{children}</h4>
        ),
        normal: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
        ),
        blockquote: ({ children }) => (
            <blockquote
                className="pl-5 my-6 italic text-[#F8F8F8]/70"
                style={{ borderLeft: '3px solid #DBC977' }}
            >
                {children}
            </blockquote>
        ),
    },

    list: {
        bullet: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
        ),
    },

    listItem: {
        bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
        number: ({ children }) => <li className="leading-relaxed">{children}</li>,
    },

    marks: {
        strong: ({ children }) => <strong className="font-bold text-[#F8F8F8]">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        'strike-through': ({ children }) => <span className="line-through">{children}</span>,
        code: ({ children }) => (
            <code
                className="px-1.5 py-0.5 rounded text-sm"
                style={{ background: 'rgba(219,201,119,0.12)', color: '#DBC977' }}
            >
                {children}
            </code>
        ),
        link: ({ children, value }) => {
            const href = value?.href || '#'
            const isExternal = value?.blank ?? true
            return (
                <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="underline transition-colors duration-300"
                    style={{ color: '#DBC977' }}
                >
                    {children}
                </a>
            )
        },
    },

    types: {
        image: ({ value }) => {
            if (!value?.asset) return null
            return (
                <figure className="my-8">
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                        <Image
                            src={urlFor(value).width(1200).url()}
                            alt={value.alt || ''}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 768px"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="mt-2 text-sm text-center text-[#F8F8F8]/50">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        },

        code: ({ value }) => (
            <pre
                className="my-6 p-4 rounded-xl overflow-x-auto text-sm"
                style={{ background: 'rgba(248,248,248,0.05)', border: '1px solid rgba(219,201,119,0.15)' }}
            >
                <code>{value?.code}</code>
            </pre>
        ),
    },
}

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
    return <PortableText value={value} components={components} />
}