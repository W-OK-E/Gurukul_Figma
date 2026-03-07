'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    BookOpen,
    Calendar,
    Clock,
    Star,
    Play,
    TrendingUp,
    Award,
    Video
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function StudentDashboard() {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
        })
    }, [])

    const stats = [
        { label: 'Enrolled Courses', value: '4', icon: BookOpen, color: 'text-blue-500' },
        { label: 'Completed Lessons', value: '28', icon: Award, color: 'text-green-500' },
        { label: 'Study Hours', value: '12.5', icon: Clock, color: 'text-purple-500' },
        { label: 'Average Score', value: '92%', icon: TrendingUp, color: 'text-orange-500' },
    ]

    const upcomingClasses = [
        {
            id: 1,
            title: 'Advanced Mathematics',
            tutor: 'Dr. Sarah Wilson',
            time: 'Today, 4:00 PM',
            duration: '60 min',
            image: 'https://images.unsplash.com/photo-1509228468518-180dd48a542f?q=80&w=200&h=120&auto=format&fit=crop'
        },
        {
            id: 2,
            title: 'Intro to Robotics',
            tutor: 'Eng. Michael Chen',
            time: 'Tomorrow, 10:00 AM',
            duration: '90 min',
            image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=200&h=120&auto=format&fit=crop'
        }
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.user_metadata?.full_name || 'Student'}!</h1>
                    <p className="text-muted-foreground mt-1">Here's what's happening with your learning journey today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline">Schedule Lesson</Button>
                    <Button>Resume Learning</Button>
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
                {/* Upcoming Classes */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Upcoming Classes
                    </h2>
                    <div className="grid gap-4">
                        {upcomingClasses.map((cls) => (
                            <Card key={cls.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-48 h-32 relative">
                                        <img
                                            src={cls.image}
                                            alt={cls.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <Button size="icon" variant="secondary" className="rounded-full">
                                                <Play className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <CardHeader className="flex-1 p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{cls.title}</CardTitle>
                                                <CardDescription>Tutor: {cls.tutor}</CardDescription>
                                            </div>
                                            <Badge variant="secondary">{cls.time}</Badge>
                                        </div>
                                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" /> {cls.duration}
                                            </div>
                                            <Button variant="link" className="h-auto p-0 text-primary font-semibold">
                                                <Video className="h-4 w-4 mr-1" /> Join Class
                                            </Button>
                                        </div>
                                    </CardHeader>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Course Progress */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Learning Progress
                    </h2>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-medium">Weekly Target</CardTitle>
                            <CardDescription>Target: 10 hours</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Mathematics</span>
                                    <span className="font-semibold">80%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full rounded-full w-[80%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Physics</span>
                                    <span className="font-semibold">45%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="bg-purple-500 h-full rounded-full w-[45%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Robotics</span>
                                    <span className="font-semibold">60%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-full rounded-full w-[60%]" />
                                </div>
                            </div>

                            <Button className="w-full mt-4" variant="outline">View All Progress</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
