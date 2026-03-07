'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { Loader2 } from 'lucide-react'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState<'student' | 'instructor' | null>(null)

    useEffect(() => {
        async function checkUser() {
            const { data: { user }, error } = await supabase.auth.getUser()

            if (error || !user) {
                router.push('/login')
                return
            }

            setRole(user.user_metadata?.role || 'student')
            setLoading(false)
        }

        checkUser()
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-background text-foreground">
            <DashboardSidebar role={role || 'student'} />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
