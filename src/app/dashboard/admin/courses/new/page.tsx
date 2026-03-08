'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'

export default function NewCoursePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        subject: 'math',
        grade: 'grade-1',
        instructor: '',
        price: '',
        duration: '',
        description: '',
        syllabus: '',
        curriculums: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase
                .from('courses')
                .insert([{
                    ...formData,
                    price: parseFloat(formData.price),
                    students: 0,
                    rating: 5.0
                }])

            if (error) throw error

            toast.success('Course created successfully!')
            router.push('/dashboard/admin/courses')
        } catch (error: any) {
            toast.error(error.message || 'Failed to create course')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/admin/courses">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Add New Course</h1>
                        <p className="text-muted-foreground">Fill in the details to publish a new course.</p>
                    </div>
                </div>
            </div>

            <Card className="shadow-lg border-primary/5">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Course Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="e.g. Advanced Robotics with Python"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instructor">Instructor Name</Label>
                                <Input
                                    id="instructor"
                                    name="instructor"
                                    placeholder="e.g. Dr. Jane Smith"
                                    value={formData.instructor}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <Select value={formData.subject} onValueChange={(v) => handleSelectChange('subject', v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="math">Mathematics</SelectItem>
                                        <SelectItem value="science">Science</SelectItem>
                                        <SelectItem value="robotics">Robotics</SelectItem>
                                        <SelectItem value="music">Music</SelectItem>
                                        <SelectItem value="coding">Coding</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Grade Level</Label>
                                <Select value={formData.grade} onValueChange={(v) => handleSelectChange('grade', v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <SelectItem key={i + 1} value={`grade-${i + 1}`}>
                                                Grade {i + 1}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="299"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration / Schedule</Label>
                            <Input
                                id="duration"
                                name="duration"
                                placeholder="e.g. 12 weeks (2 classes/week)"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Brief overview of the course goals..."
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="syllabus">Detailed Syllabus</Label>
                            <Textarea
                                id="syllabus"
                                name="syllabus"
                                placeholder="List what will be covered week by week..."
                                value={formData.syllabus}
                                onChange={handleChange}
                                rows={6}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="curriculums">Aligned Curriculums</Label>
                            <Input
                                id="curriculums"
                                name="curriculums"
                                placeholder="e.g. Common Core, IGCSE"
                                value={formData.curriculums}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full h-12 text-lg gap-2" disabled={loading}>
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <Save className="h-5 w-5" />
                                )}
                                {loading ? 'Creating Course...' : 'Publish Course'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
