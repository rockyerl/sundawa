'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type IntroContextValue = {
    introDone: boolean
    setIntroDone: (value: boolean) => void
}

const IntroContext = createContext<IntroContextValue>({
    introDone: false,
    setIntroDone: () => {},
})

export function IntroProvider({ children }: { children: ReactNode }) {
    const [introDone, setIntroDone] = useState(false)

    return (
        <IntroContext.Provider value={{ introDone, setIntroDone }}>
            {children}
        </IntroContext.Provider>
    )
}

export function useIntro() {
    return useContext(IntroContext)
}