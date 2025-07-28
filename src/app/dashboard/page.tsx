'use client'

import { useEffect } from 'react'
import api from '@/lib/axios'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
    const router = useRouter()

    useEffect(() => {
        const verifySession = async () => {
            try {
                await api.get('/auth/verify')
            } catch (error) {
                router.push('/auth/signin')
            }
        }
        verifySession()
    }, [router])

    return (
        <div>
            <h1>Dashboard Protegido</h1>
            {/* Seu conteúdo */}
        </div>
    )
}