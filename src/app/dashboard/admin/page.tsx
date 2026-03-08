'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Users,
    BookOpen,
    Calendar,
    GraduationCap,
    TrendingUp,
    Users2,
    CheckCircle2,
    Clock
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminOverview() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalInstructors: 0,
        totalCourses: 0,
        pendingRegistrations: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            setLoading(true)

            // Total Students
            const { count: studentCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('role', 'student')

            // Total Instructors
            const { count: instructorCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('role', 'instructor')

            // Total Courses
            const { count: courseCount } = await supabase
                .from('courses')
                .select('*', { count: 'exact', head: true })

            // Pending Registrations
            const { count: regCount } = await supabase
                .from('registrations')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending')

            setStats({
                totalStudents: studentCount || 0,
                totalInstructors: instructorCount || 0,
                totalCourses: courseCount || 0,
                pendingRegistrations: regCount || 0
            })
            setLoading(false)
        }

        fetchStats()
    }, [])

    const statCards = [
        {
            title: 'Active Students',
            value: stats.totalStudents,
            icon: GraduationCap,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
        },
        {
            title: 'Instructors',
            value: stats.totalInstructors,
            icon: Users2,
            color: 'text-purple-600',
            bg: 'bg-purple-100'
        },
        {
            title: 'Courses',
            value: stats.totalCourses,
            icon: BookOpen,
            color: 'text-orange-600',
            bg: 'bg-orange-100'
        },
        {
            title: 'Pending Trials',
            value: stats.pendingRegistrations,
            icon: Clock,
            color: 'text-rose-600',
            bg: 'bg-rose-100'
        }
    ]

    return (
        <div className="space-y-8 p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, Admin. Here is what is happening today.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <Card key={index} className="border-none shadow-md overflow-hidden group hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`${stat.bg} p-2 rounded-lg`}>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {loading ? '...' : stat.value}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    <span>Updated just now</span>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-lg border-primary/5">
                    <CardHeader>
                        <CardTitle>Recent Registrations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Go to "New Registrations" to manage trial requests.</p>
                        {/* Placeholder for simple list */}
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-primary/5">
                    <CardHeader>
                        <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                Supabase Database
                            </span>
                            <span className="text-green-500 font-medium">Online</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                Edge Functions
                            </span>
                            <span className="text-green-500 font-medium">Operational</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
