'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Users,
    BookOpen,
    Calendar,
    Clock,
    TrendingUp,
    Plus,
    Video,
    MoreVertical,
    ArrowUpRight,
    Star
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function InstructorDashboard() {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
        })
    }, [])

    const stats = [
        { label: 'Active Students', value: '42', icon: Users, color: 'text-blue-500' },
        { label: 'My Courses', value: '3', icon: BookOpen, color: 'text-green-500' },
        { label: 'Teaching Hours', value: '156', icon: Clock, color: 'text-purple-500' },
        { label: 'Avg Rating', value: '4.9', icon: TrendingUp, color: 'text-orange-500' },
    ]

    const todayClasses = [
        {
            id: 1,
            student: 'Liam Thompson',
            subject: 'Advanced Mathematics',
            time: '4:00 PM - 5:00 PM',
            status: 'upcoming',
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&auto=format&fit=crop'
        },
        {
            id: 2,
            student: 'Emma Rodriguez',
            subject: 'Physics: Mechanics',
            time: '6:30 PM - 7:30 PM',
            status: 'upcoming',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop'
        }
    ]

    const myCourses = [
        { id: 1, title: 'Calculus Fundamentals', students: 18, rating: 4.8 },
        { id: 2, title: 'Introduction to Physics', students: 12, rating: 4.9 },
        { id: 3, title: 'Linear Algebra for Robotics', students: 12, rating: 5.0 },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Instructor Panel</h1>
                    <p className="text-muted-foreground mt-1">Manage your students, sessions, and course materials.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline">View Calendar</Button>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Create New Course
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon
                    return (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className={`p-3 rounded-full bg-slate-50 ${stat.color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Schedule */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            Today&apos;s Sessions
                        </h2>
                        <Button variant="link" className="text-primary p-0 h-auto">View Full Schedule</Button>
                    </div>
                    <div className="grid gap-4">
                        {todayClasses.map((cls) => (
                            <Card key={cls.id} className="hover:border-primary/50 transition-colors">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <img
                                        src={cls.image}
                                        alt={cls.student}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold truncate">{cls.student}</p>
                                            <Badge variant="outline" className="text-xs uppercase bg-green-50 text-green-700 border-green-200">
                                                {cls.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-primary font-medium">{cls.subject}</p>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {cls.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" className="gap-1 px-4">
                                            <Video className="h-4 w-4" /> Start Session
                                        </Button>
                                        <Button size="icon" variant="ghost">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* My Courses Summary */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        My Courses
                    </h2>
                    <Card>
                        <CardHeader className="pb-3 px-6 pt-6">
                            <CardTitle className="text-base font-medium">Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border">
                                {myCourses.map((course) => (
                                    <div key={course.id} className="p-4 px-6 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-sm">{course.title}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Users className="h-3 w-3" /> {course.students}
                                                </span>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> {course.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 px-6">
                                <Button className="w-full" variant="outline" size="sm">Manage All Courses</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
