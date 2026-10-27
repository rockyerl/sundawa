export type City = 'bandung' | 'jakarta'
export type Mode = 'remote' | 'hybrid' | 'onsite'
export type Level = 'Junior' | 'Mid' | 'Senior'

export interface TalentEntry {
    cat: string
    pos: string
    level: Level
    hybridMin: number
    hybridMax: number
    remoteSell20: number
    remoteSell25: number
    hybridSell20: number
    hybridSell25: number
    onsiteSell20: number
    onsiteSell25: number
}

export interface CartItem {
    id: number
    city: City
    pos: string
    level: Level
    cat: string
    mode: Mode
    qty: number
    sell20: number
    sell25: number
    feeAvg: number
}

export interface CartTotals {
    totalCount: number
    totalPrice: number
}

export interface WAMessageTranslations {
    waButton: string
    summaryTitle: string
    totalTalent: string
}

export const LEVEL_ORDER: Level[] = ['Junior', 'Mid', 'Senior']

export function formatMillions(value: number): string {
    if (value <= 0) return 'Rp 0'
    if (value >= 1_000_000) return 'Rp ' + (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' jt'
    return 'Rp ' + value.toLocaleString('id-ID')
}

export function formatFullPrice(value: number): string {
    return 'Rp ' + value.toLocaleString('id-ID')
}

export function getSellPrice(entry: TalentEntry, mode: Mode): number {
    if (mode === 'remote') return entry.remoteSell20
    if (mode === 'hybrid') return entry.hybridSell20
    return entry.onsiteSell20
}

export function calculateCartTotals(cart: CartItem[]): CartTotals {
    return {
        totalCount: cart.reduce((sum, item) => sum + item.qty, 0),
        totalPrice: cart.reduce((sum, item) => sum + item.sell20 * item.qty, 0),
    }
}

export function buildWhatsAppMessage(
    cart: CartItem[],
    translations: WAMessageTranslations,
    margin: 20 | 25 = 20
): string {
    if (cart.length === 0) return ''
    const { totalCount, totalPrice } = calculateCartTotals(cart)
    let msg = translations.waButton + '\n\n' + translations.summaryTitle + ':\n'
    cart.forEach((i) => {
        const sell = margin === 20 ? i.sell20 : i.sell25
        const cityName = i.city === 'bandung' ? 'Bandung' : 'Jakarta'
        msg += `• ${i.qty}× ${i.pos} (${i.level}) — ${i.mode} — ${cityName} → ${formatMillions(sell * i.qty)}/bln\n`
    })
    msg += `\n${translations.totalTalent} ${totalCount}: ${formatFullPrice(totalPrice)}/bln`
    return msg
}

