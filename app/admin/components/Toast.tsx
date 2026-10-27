'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { X, CheckCircle, AlertCircle } from 'lucide-react'

type ToastType = 'success' | 'error'

interface Toast {
    id: string
    message: string
    type: ToastType
}

// Simple global toast queue — shared across all admin components
const toasts: Toast[] = []
let toastListeners: (() => void)[] = []

// Global data refresh event system — notifies all subscribers when CRUD happens
const dataRefreshSubscribers = new Set<(resource: 'blog' | 'portfolio') => void>()

export function refreshData(resource: 'blog' | 'portfolio') {
    dataRefreshSubscribers.forEach(fn => fn(resource))
}

export function onDataRefresh(callback: (resource: 'blog' | 'portfolio') => void) {
    dataRefreshSubscribers.add(callback)
    return () => {
        dataRefreshSubscribers.delete(callback)
    }
}

function notify() {
    toastListeners.forEach(fn => fn())
}

export function showToast(message: string, type: ToastType = 'success') {
    const id = crypto.randomUUID()
    toasts.push({ id, message, type })
    notify()
    setTimeout(() => {
        const idx = toasts.findIndex(t => t.id === id)
        if (idx !== -1) {
            toasts.splice(idx, 1)
            notify()
        }
    }, 3500)
}

export function useToasts() {
    const [list, setList] = useState<Toast[]>([])
    const isInitialMount = useRef(true)

    const subscribe = useCallback(() => setList([...toasts]), [])

    useEffect(() => {
        toastListeners.push(subscribe)
        // On initial mount, set state directly to avoid flash of empty toasts
        if (isInitialMount.current) {
            isInitialMount.current = false
            setList([...toasts])
        }
        return () => {
            toastListeners = toastListeners.filter(l => l !== subscribe)
        }
    }, [subscribe])

    const dismiss = useCallback((id: string) => {
        const idx = toasts.findIndex(t => t.id === id)
        if (idx !== -1) {
            toasts.splice(idx, 1)
            notify()
        }
    }, [])

    return { list, dismiss }
}

export default function ToastContainer() {
    const { list, dismiss } = useToasts()

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm" aria-live="polite">
            {list.map(toast => (
                <div
                    key={toast.id}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl animate-slide-in"
                    style={{
                        background: toast.type === 'success' ? '#065F46' : '#7F1D1D',
                        border: `1px solid ${toast.type === 'success' ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)'}`,
                    }}
                >
                    {toast.type === 'success' ? (
                        <CheckCircle size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    ) : (
                        <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm text-[#F8F8F8] flex-1">{toast.message}</p>
                    <button
                        onClick={() => dismiss(toast.id)}
                        className="text-[#F8F8F8]/50 hover:text-[#F8F8F8] transition-colors flex-shrink-0"
                        aria-label="Dismiss"
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    )
}
