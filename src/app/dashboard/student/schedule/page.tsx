'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Video, Calendar as CalendarIcon, Clock, MoreVertical } from 'lucide-react'

export default function SchedulePage() {
    const sessions = [
        {
            id: 1,
            title: 'Mathematics Advanced',
            date: 'March 15, 2024',
            time: '04:00 PM',
            duration: '60 min',
            tutor: 'Dr. Sarah Wilson'
        },
        {
            id: 2,
            title: 'Physics Mechanics',
            date: 'March 16, 2024',
            time: '10:30 AM',
            duration: '90 min',
            tutor: 'Prof. Michael Chen'
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
                    <p className="text-muted-foreground mt-1">Manage and view your upcoming tutoring sessions.</p>
                </div>
                <Button className="gap-2">
                    <CalendarIcon className="h-4 w-4" /> Book New Session
                </Button>
            </div>

            <div className="grid gap-4">
                {sessions.map((session) => (
                    <Card key={session.id} className="hover:border-primary/50 transition-colors">
                        <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                    <CalendarIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{session.title}</h3>
                                    <p className="text-sm text-muted-foreground">Tutor: {session.tutor}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> {session.date}</span>
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {session.time} ({session.duration})</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="gap-2">
                                    <Video className="h-4 w-4" /> Join Session
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
    )
}
