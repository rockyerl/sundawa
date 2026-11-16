'use client'

import Image from 'next/image'
import { LEADERSHIP_TEAM, type LeaderId } from '../team'
import AboutSectionHeader from './AboutSectionHeader'

export interface LeadershipMemberCopy {
    id: LeaderId
    name: string
    role: string
    bio: string
}

interface LeadershipShowcaseProps {
    label: string
    heading: string
    members: LeadershipMemberCopy[]
}

export default function LeadershipShowcase({
    label,
    heading,
    members,
}: LeadershipShowcaseProps) {
    return (
        <div className="mb-20">
            <AboutSectionHeader label={label} heading={heading} />

            <div className="grid grid-cols-1 gap-[1px] border border-gold/20 bg-gold/20 md:grid-cols-3">
                {LEADERSHIP_TEAM.map((spec) => {
                    const member = members.find((m) => m.id === spec.id) ?? {
                        id: spec.id,
                        name: spec.initials,
                        role: '',
                        bio: '',
                    }

                    return (
                        <article
                            key={spec.id}
                            className="group relative flex flex-col bg-navy transition-colors duration-300 hover:bg-dark-slate/50"
                        >
                            {/* Framed Executive Portrait Slot */}
                            <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-gold/15 bg-[#07111D]">
                                <Image
                                    src={spec.avatarSrc}
                                    alt={`${member.name} — ${member.role}`}
                                    fill
                                    unoptimized
                                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />

                                {/* Top corner identifier */}
                                <div className="absolute top-4 left-4">
                                    <span className="border border-gold/30 bg-navy/85 px-2.5 py-1 text-[0.58rem] font-black tracking-[0.18em] text-gold uppercase backdrop-blur-sm">
                                        {spec.initials}
                                    </span>
                                </div>

                                {/* Engraved Nameplate at bottom of portrait */}
                                <div className="absolute right-0 bottom-0 left-0 p-5 sm:p-6">
                                    <span className="mb-1 block text-[0.62rem] font-extrabold tracking-[0.18em] text-gold uppercase">
                                        {member.role}
                                    </span>
                                    <h3 className="text-lg leading-snug font-black text-cream sm:text-xl">
                                        {member.name}
                                    </h3>
                                </div>
                            </div>

                            {/* Mandate Copy */}
                            <div className="flex flex-1 flex-col justify-between p-6">
                                <p className="text-xs leading-[1.8] font-light text-cream/75 sm:text-sm">
                                    {member.bio}
                                </p>
                                <div className="mt-5 h-px w-10 bg-gold/35 transition-all duration-300 group-hover:w-20 group-hover:bg-gold" />
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}
