import { describe, expect, it } from 'vitest'
import {
    ASSESSMENT_QUESTIONS,
    buildAssessmentSummary,
    evaluateAssessment,
    getMaturityTier,
} from './domain'

describe('system health assessment domain', () => {
    it('evaluates minimum score as critical tier with 0%', () => {
        const answers = Object.fromEntries(ASSESSMENT_QUESTIONS.map((q) => [q.id, 0]))
        const result = evaluateAssessment(answers)

        expect(result.percentage).toBe(0)
        expect(result.totalScore).toBe(0)
        expect(result.maxScore).toBe(24)
        expect(result.tier).toBe('critical')
        expect(result.dimensions).toHaveLength(4)
    })

    it('evaluates maximum score as resilient tier with 100%', () => {
        const answers = Object.fromEntries(ASSESSMENT_QUESTIONS.map((q) => [q.id, 3]))
        const result = evaluateAssessment(answers)

        expect(result.percentage).toBe(100)
        expect(result.tier).toBe('resilient')
        expect(result.dimensions.every((d) => d.percentage === 100)).toBe(true)
    })

    it('identifies weakest dimension and maps to the right Sundawa service', () => {
        const answers: Record<string, number> = {
            legacy_maintenance: 3,
            legacy_release: 3,
            integration_manual: 0,
            integration_visibility: 0,
            security_access: 2,
            security_recovery: 2,
            operations_bottleneck: 3,
            operations_ownership: 2,
        }
        const result = evaluateAssessment(answers)

        expect(result.priorityDimensions[0]).toBe('integration')
        expect(result.recommendedServiceKey).toBe('integration')
        expect(getMaturityTier(39)).toBe('critical')
        expect(getMaturityTier(55)).toBe('fragmented')
        expect(getMaturityTier(75)).toBe('stabilizing')
        expect(getMaturityTier(90)).toBe('resilient')
    })

    it('formats a structured assessment summary for lead handoff', () => {
        const answers = Object.fromEntries(ASSESSMENT_QUESTIONS.map((q) => [q.id, 2]))
        const result = evaluateAssessment(answers)
        const summary = buildAssessmentSummary(
            result,
            {
                legacy: 'Legacy Architecture',
                integration: 'Data Integration',
                security: 'Security & Governance',
                operations: 'Operational Efficiency',
            },
            'Stabilizing',
            'PT Contoh Enterprise',
        )

        expect(summary).toContain('67/100 (Stabilizing)')
        expect(summary).toContain('Company: PT Contoh Enterprise')
        expect(summary).toContain('Legacy Architecture: 67%')
    })
})
