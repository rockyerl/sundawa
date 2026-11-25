export type AssessmentDimensionId = 'legacy' | 'integration' | 'security' | 'operations'

export type MaturityTier = 'critical' | 'fragmented' | 'stabilizing' | 'resilient'

export interface AssessmentQuestionSpec {
    id: string
    dimension: AssessmentDimensionId
}

export interface DimensionScore {
    dimension: AssessmentDimensionId
    score: number
    maxScore: number
    percentage: number
}

export interface AssessmentResult {
    totalScore: number
    maxScore: number
    percentage: number
    tier: MaturityTier
    dimensions: DimensionScore[]
    priorityDimensions: AssessmentDimensionId[]
    recommendedServiceKey: 'modernization' | 'integration' | 'automation' | 'managed'
}

export const ASSESSMENT_QUESTIONS: readonly AssessmentQuestionSpec[] = [
    { id: 'legacy_maintenance', dimension: 'legacy' },
    { id: 'legacy_release', dimension: 'legacy' },
    { id: 'integration_manual', dimension: 'integration' },
    { id: 'integration_visibility', dimension: 'integration' },
    { id: 'security_access', dimension: 'security' },
    { id: 'security_recovery', dimension: 'security' },
    { id: 'operations_bottleneck', dimension: 'operations' },
    { id: 'operations_ownership', dimension: 'operations' },
] as const

const MAX_SCORE_PER_QUESTION = 3

const DIMENSION_ORDER: readonly AssessmentDimensionId[] = [
    'legacy',
    'integration',
    'security',
    'operations',
] as const

export function getMaturityTier(percentage: number): MaturityTier {
    if (percentage < 40) return 'critical'
    if (percentage < 65) return 'fragmented'
    if (percentage < 85) return 'stabilizing'
    return 'resilient'
}

export function evaluateAssessment(answers: Record<string, number>): AssessmentResult {
    const dimensionTotals: Record<AssessmentDimensionId, { score: number; maxScore: number }> = {
        legacy: { score: 0, maxScore: 0 },
        integration: { score: 0, maxScore: 0 },
        security: { score: 0, maxScore: 0 },
        operations: { score: 0, maxScore: 0 },
    }

    for (const q of ASSESSMENT_QUESTIONS) {
        const raw = answers[q.id]
        const clamped = typeof raw === 'number' && Number.isFinite(raw)
            ? Math.max(0, Math.min(MAX_SCORE_PER_QUESTION, Math.round(raw)))
            : 0
        dimensionTotals[q.dimension].score += clamped
        dimensionTotals[q.dimension].maxScore += MAX_SCORE_PER_QUESTION
    }

    const dimensions: DimensionScore[] = DIMENSION_ORDER.map((dimension) => {
        const { score, maxScore } = dimensionTotals[dimension]
        const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
        return { dimension, score, maxScore, percentage }
    })

    const totalScore = dimensions.reduce((sum, d) => sum + d.score, 0)
    const maxScore = dimensions.reduce((sum, d) => sum + d.maxScore, 0)
    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
    const tier = getMaturityTier(percentage)

    const sortedWeakest = [...dimensions].sort((a, b) => a.percentage - b.percentage)
    const priorityDimensions = sortedWeakest.slice(0, 2).map((d) => d.dimension)

    const weakest = sortedWeakest[0]?.dimension ?? 'legacy'
    const recommendedServiceKey =
        weakest === 'legacy'
            ? 'modernization'
            : weakest === 'integration'
                ? 'integration'
                : weakest === 'operations'
                    ? 'automation'
                    : 'managed'

    return {
        totalScore,
        maxScore,
        percentage,
        tier,
        dimensions,
        priorityDimensions,
        recommendedServiceKey,
    }
}

export interface AssessmentSummaryLabels {
    header: string
    company: string
    priority: string
}

const DEFAULT_SUMMARY_LABELS: AssessmentSummaryLabels = {
    header: 'System Health Assessment Result',
    company: 'Company',
    priority: 'Priority Areas',
}

export function buildAssessmentSummary(
    result: AssessmentResult,
    dimensionLabels: Record<AssessmentDimensionId, string>,
    tierLabel: string,
    company?: string,
    labels: AssessmentSummaryLabels = DEFAULT_SUMMARY_LABELS,
): string {
    const lines = [
        `${labels.header}: ${result.percentage}/100 (${tierLabel})`,
        ...(company ? [`${labels.company}: ${company}`] : []),
        ...result.dimensions.map(
            (d) => `- ${dimensionLabels[d.dimension]}: ${d.percentage}%`,
        ),
        `${labels.priority}: ${result.priorityDimensions.map((d) => dimensionLabels[d]).join(', ')}`,
    ]
    return lines.join('\n')
}
