'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Award, BookOpen, Star } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

type Profile = {
    id: string
    full_name: string
    avatar_url: string
    role: string
    bio: string
    expertise: string[]
    qualifications: string
}

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTeachers() {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'instructor')

            if (data) setTeachers(data)
            setLoading(false)
        }
        fetchTeachers()
    }, [])

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-accent/5">
            <div className="max-w-7xl mx-auto pt-8">
                <div className="text-center space-y-4 mb-16">
                    <Badge variant="secondary" className="px-4 py-1">Meet Our Faculty</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold">World-Class Educators & Mentors</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Our instructors are industry experts and specialized academics dedicated to shaping the next generation.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-96 rounded-xl bg-accent/20 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teachers.map((teacher) => (
                            <Card key={teacher.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/10">
                                <div className="relative h-64 overflow-hidden">
                                    <ImageWithFallback
                                        src={teacher.avatar_url || 'https://images.unsplash.com/photo-1544717297-fa15739a5447?q=80&w=1080'}
                                        alt={teacher.full_name}
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                                        <h2 className="text-2xl font-bold">{teacher.full_name}</h2>
                                        <p className="text-white/80 flex items-center gap-2">
                                            <GraduationCap className="h-4 w-4" /> {teacher.qualifications || 'Expert Tutor'}
                                        </p>
                                    </div>
                                </div>
                                <CardHeader>
                                    <div className="flex flex-wrap gap-2">
                                        {teacher.expertise?.map((skill) => (
                                            <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-none">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground line-clamp-3">
                                        {teacher.bio || 'Experienced educator focused on providing personalized learning paths for K-12 students.'}
                                    </p>
                                    <div className="pt-4 border-t border-border flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-1 text-yellow-600">
                                            <Star className="h-4 w-4 fill-current" /> 4.9 Rating
                                        </span>
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <BookOpen className="h-4 w-4" /> 15+ Courses
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {teachers.length === 0 && !loading && (
                    <div className="text-center py-20 bg-card rounded-2xl border-dashed border-2 border-border">
                        <h3 className="text-2xl font-semibold mb-2">Expanding Our Faculty</h3>
                        <p className="text-muted-foreground">We are currently onboarding new expert tutors. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
