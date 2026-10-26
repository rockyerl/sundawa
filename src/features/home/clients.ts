export type ClientDetails = {
    challenge: string
    architecture: string
    role: string
    impact: string
}

export type Client = {
    num: string
    name: string
    initials: string
    type: string
    desc: string
    confidential?: boolean
    details: ClientDetails
}

export type ClientStat = {
    num: string
    label: string
}

export const INITIAL_VISIBLE_CLIENTS = 6
