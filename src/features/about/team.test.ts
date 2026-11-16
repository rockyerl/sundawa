import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import idMessages from '@/messages/id.json'
import enMessages from '@/messages/en.json'
import { ABOUT_STUDIO_IMAGE, LEADERSHIP_TEAM } from './team'

describe('about leadership and editorial media configuration', () => {
    it('references existing avatar and studio placeholder assets inside public/', () => {
        const publicDir = join(process.cwd(), 'public')
        expect(existsSync(join(publicDir, ABOUT_STUDIO_IMAGE.replace(/^\//, '')))).toBe(true)

        expect(LEADERSHIP_TEAM).toHaveLength(3)
        for (const member of LEADERSHIP_TEAM) {
            expect(existsSync(join(publicDir, member.avatarSrc.replace(/^\//, '')))).toBe(true)
        }
    })

    it('matches localized leadership entries, Stoic CEO quote, and enterprise pillars in id and en', () => {
        for (const msg of [idMessages.aboutPage, enMessages.aboutPage]) {
            expect(msg.leadership.members).toHaveLength(LEADERSHIP_TEAM.length)
            expect(msg.governance.items).toHaveLength(4)
            expect(msg.ceoGreeting.stoicQuote.quote.trim()).not.toBe('')
            expect(msg.ceoGreeting.stoicQuote.author).toContain('Marcus Aurelius')
            expect(msg.ceoGreeting.paragraphs).toHaveLength(2)
            expect(msg.howWeWork.pillars).toHaveLength(2)
            expect(msg.values.items).toHaveLength(6)
            expect(msg.criticalSectors.items.length).toBeGreaterThanOrEqual(5)
        }
    })
})
