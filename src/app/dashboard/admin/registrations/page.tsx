'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    Mail,
    Phone,
    Clock,
    CheckCircle2,
    UserPlus,
    Calendar,
    ChevronRight,
    Loader2
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { createStudentFromRegistration } from '@/app/actions/admin'
import { toast } from 'sonner'

interface Registration {
    id: string
    created_at: string
    student_name: string
    parent_name: string
    email: string
    phone_number: string
    grade: string
    courses: string[]
    status: string
}

export default function RegistrationsPage() {
    const [registrations, setRegistrations] = useState<Registration[]>([])
    const [loading, setLoading] = useState(true)
    const [processingId, setProcessingId] = useState<string | null>(null)

    useEffect(() => {
        fetchRegistrations()
    }, [])

    async function fetchRegistrations() {
        setLoading(true)
        const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setRegistrations(data)
        setLoading(false)
    }

    const handleCreateAccount = async (reg: Registration) => {
        setProcessingId(reg.id)
        const result = await createStudentFromRegistration(reg.id, reg.email, reg.student_name)

        if (result.success) {
            toast.success(`Account created for ${reg.student_name}! Temp password: ${result.password}`, {
                duration: 10000
            })
            fetchRegistrations()
        } else {
            toast.error(result.error || 'Failed to create account')
        }
        setProcessingId(null)
    }

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">New Registrations</h1>
                <p className="text-muted-foreground">Manage incoming student trial requests and activate their accounts.</p>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : registrations.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                            <Clock className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                            <h3 className="text-lg font-semibold">No registrations yet</h3>
                            <p className="text-muted-foreground">New trial requests will appear here once students register.</p>
                        </CardContent>
                    </Card>
                ) : (
                    registrations.map((reg) => (
                        <Card key={reg.id} className="overflow-hidden group border-primary/5 hover:border-primary/20 transition-all">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <Users className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{reg.student_name}</h3>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    Parent: {reg.parent_name} • <Badge variant="secondary" className="scale-90">{reg.grade.replace('grade-', 'Grade ')}</Badge>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Mail className="h-4 w-4" /> {reg.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Phone className="h-4 w-4" /> {reg.phone_number}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {reg.courses.map(course => (
                                                <Badge key={course} variant="outline" className="bg-primary/5">{course}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3 justify-center min-w-[200px]">
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(reg.created_at).toLocaleDateString()}
                                        </div>

                                        {reg.status === 'completed' ? (
                                            <Badge className="bg-green-500/10 text-green-600 border-green-200 gap-1 py-1 px-3">
                                                <CheckCircle2 className="h-3 w-3" /> Account Active
                                            </Badge>
                                        ) : (
                                            <Button
                                                className="w-full gap-2"
                                                onClick={() => handleCreateAccount(reg)}
                                                disabled={processingId === reg.id}
                                            >
                                                {processingId === reg.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <UserPlus className="h-4 w-4" />
                                                )}
                                                Create Login ID
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
