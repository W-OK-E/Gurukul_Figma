'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { updateCourse } from '@/app/actions/admin'
import { toast } from 'sonner'

export default function EditCoursePage() {
    const router = useRouter()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        grade: '',
        instructor: '',
        price: '',
        duration: '',
        description: '',
        syllabus: '',
        curriculums: ''
    })

    useEffect(() => {
        async function fetchCourse() {
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('id', id)
                .single()

            if (data) {
                setFormData({
                    title: data.title || '',
                    subject: data.subject || '',
                    grade: data.grade || '',
                    instructor: data.instructor || '',
                    price: data.price?.toString() || '',
                    duration: data.duration || '',
                    description: data.description || '',
                    syllabus: data.syllabus || '',
                    curriculums: data.curriculums || ''
                })
            }
            setLoading(false)
        }
        fetchCourse()
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const result = await updateCourse(id as string, {
            ...formData,
            price: parseFloat(formData.price)
        })

        if (result.success) {
            toast.success('Course updated successfully!')
            router.push('/dashboard/admin/courses')
        } else {
            toast.error(result.error || 'Failed to update course')
        }
        setSaving(false)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
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
                        <h1 className="text-3xl font-bold">Edit Course</h1>
                        <p className="text-muted-foreground">Modify course content and settings.</p>
                    </div>
                </div>
            </div>

            <Card className="shadow-lg border-primary/5">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Course Title</Label>
                                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instructor">Instructor Name</Label>
                                <Input id="instructor" name="instructor" value={formData.instructor} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <Select value={formData.subject} onValueChange={(v) => handleSelectChange('subject', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
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
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <SelectItem key={i + 1} value={`grade-${i + 1}`}>Grade {i + 1}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration / Schedule</Label>
                            <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="syllabus">Detailed Syllabus</Label>
                            <Textarea id="syllabus" name="syllabus" value={formData.syllabus} onChange={handleChange} rows={6} />
                        </div>

                        <div className="pt-4 text-right">
                            <Button type="submit" className="w-full h-12 text-lg gap-2" disabled={saving}>
                                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                                {saving ? 'Saving Changes...' : 'Save Course'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
