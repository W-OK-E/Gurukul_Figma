'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    BookOpen,
    Plus,
    Trash2,
    Edit2,
    Search,
    Loader2,
    DollarSign,
    GraduationCap,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabaseClient'
import { deleteCourse } from '@/app/actions/admin'
import { toast } from 'sonner'
import Link from 'next/link'

interface Course {
    id: string
    title: string
    subject: string
    grade: string
    instructor: string
    price: number
    students: number
}

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        fetchCourses()
    }, [])

    async function fetchCourses() {
        setLoading(true)
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setCourses(data)
        setLoading(false)
    }

    const handleDelete = async (course: Course) => {
        if (!confirm(`Are you sure you want to delete ${course.title}?`)) return

        setDeletingId(course.id)
        const result = await deleteCourse(course.id)
        if (result.success) {
            toast.success('Course deleted successfully')
            fetchCourses()
        } else {
            toast.error(result.error || 'Failed to delete course')
        }
        setDeletingId(null)
    }

    const filteredCourses = courses.filter(course =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Manage Courses</h1>
                    <p className="text-muted-foreground">Add, edit, or remove courses from the library.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link href="/dashboard/admin/courses/new">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> Add Course
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        No courses found.
                    </div>
                ) : (
                    filteredCourses.map((course) => (
                        <Card key={course.id} className="group border-primary/5 hover:border-primary/20 transition-all shadow-sm flex flex-col">
                            <CardHeader className="flex flex-row items-start justify-between">
                                <div className="space-y-1">
                                    <Badge variant="secondary" className="bg-primary/5 text-primary uppercase text-[10px] font-bold tracking-wider">
                                        {course.subject}
                                    </Badge>
                                    <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-1">
                                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4" /> {course.grade.replace('grade-', 'Grade ')}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4" /> ${course.price}
                                    </div>
                                </div>
                                <div className="text-sm font-medium">Instructor: {course.instructor}</div>
                            </CardContent>
                            <div className="p-4 pt-0 flex gap-2 border-t mt-auto">
                                <Link href={`/dashboard/admin/courses/${course.id}/edit`} className="flex-1">
                                    <Button variant="ghost" size="sm" className="w-full gap-2">
                                        <Edit2 className="h-4 w-4" /> Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex-1 gap-2 text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDelete(course)}
                                    disabled={deletingId === course.id}
                                >
                                    {deletingId === course.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
