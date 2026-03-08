'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { ArrowLeft, GraduationCap, Phone, MapPin, Globe, Clock, Calendar, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'
import { sendNotificationAction } from '@/app/actions/register'

export function RegistrationForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        studentName: '',
        parentName: '',
        phoneNumber: '',
        grade: '',
        email: '',
        courses: [] as string[],
        country: '',
        currency: '',
        city: '',
        preferredHourlyRate: '',
        timeSlots: [] as string[],
        frequencyWeekly: '',
    })

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleCourseToggle = (course: string) => {
        setFormData(prev => ({
            ...prev,
            courses: prev.courses.includes(course)
                ? prev.courses.filter(c => c !== course)
                : [...prev.courses, course]
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // 1. Supabase insert
            const { error } = await supabase
                .from('registrations')
                .insert([{
                    student_name: formData.studentName,
                    parent_name: formData.parentName,
                    phone_number: formData.phoneNumber,
                    grade: formData.grade,
                    email: formData.email,
                    courses: formData.courses,
                    country: formData.country,
                    currency: formData.currency,
                    city: formData.city,
                    preferred_hourly_rate: formData.preferredHourlyRate,
                    time_slots: formData.timeSlots,
                    frequency_weekly: formData.frequencyWeekly,
                }])

            if (error) throw error

            // 2. Send email notification (fails silently if RESEND_API_KEY missing)
            await sendNotificationAction({
                ...formData,
                parentPhone: formData.phoneNumber
            });

            toast.success('Registration submitted successfully! Our team will contact you soon.', {
                duration: 5000,
            })

            // 3. Small delay so they can see the message
            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error: any) {
            console.error('Error submitting registration:', error)
            toast.error(error.message || 'Failed to submit registration. Please try again.')
            setLoading(false)
        }
    }

    const courseOptions = [
        'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Robotics', 'Music', 'Coding', 'English'
    ]

    const timeSlotOptions = [
        'Morning (8 AM - 12 PM)', 'Afternoon (12 PM - 4 PM)', 'Evening (4 PM - 8 PM)', 'Night (8 PM - 11 PM)'
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                <Card className="shadow-xl">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold">Book a Free Trial</CardTitle>
                        <CardDescription>
                            Fill out the form below. After your free demo, an admin will provide your personalized login credentials.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Section 1: Student & Parent Details */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-2 border-b pb-2">
                                    <GraduationCap className="w-5 h-5 text-primary" />
                                    <h3 className="text-xl font-semibold">Student & Parent Details</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="studentName">Student Name</Label>
                                        <Input
                                            id="studentName"
                                            placeholder="Enter student's full name"
                                            value={formData.studentName}
                                            onChange={(e) => handleInputChange('studentName', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="parentName">Parent Name</Label>
                                        <Input
                                            id="parentName"
                                            placeholder="Enter parent's full name"
                                            value={formData.parentName}
                                            onChange={(e) => handleInputChange('parentName', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phoneNumber">Phone Number (International)</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                            <Input
                                                id="phoneNumber"
                                                placeholder="+1 234 567 8900"
                                                className="pl-10"
                                                value={formData.phoneNumber}
                                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="grade">Grade Level</Label>
                                        <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select grade" />
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
                                        <Label htmlFor="country">Country</Label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                            <Input
                                                id="country"
                                                placeholder="e.g. USA"
                                                className="pl-10"
                                                value={formData.country}
                                                onChange={(e) => handleInputChange('country', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                            <Input
                                                id="city"
                                                placeholder="e.g. New York"
                                                className="pl-10"
                                                value={formData.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Interested Courses</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {courseOptions.map((course) => (
                                            <div key={course} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`course-${course}`}
                                                    checked={formData.courses.includes(course)}
                                                    onCheckedChange={() => handleCourseToggle(course)}
                                                />
                                                <Label htmlFor={`course-${course}`} className="text-sm font-normal cursor-pointer">
                                                    {course}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="currency">Preferred Currency</Label>
                                    <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USD">USD ($)</SelectItem>
                                            <SelectItem value="EUR">EUR (€)</SelectItem>
                                            <SelectItem value="GBP">GBP (£)</SelectItem>
                                            <SelectItem value="INR">INR (₹)</SelectItem>
                                            <SelectItem value="AED">AED (د.إ)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Section 2: Demo Details */}
                            <div className="space-y-6 pt-4">
                                <div className="flex items-center space-x-2 border-b pb-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <h3 className="text-xl font-semibold">Demo & Scheduling</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="hourlyRate">Preferred Hourly Rate</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                            <Input
                                                id="hourlyRate"
                                                placeholder="e.g. 25"
                                                className="pl-10"
                                                value={formData.preferredHourlyRate}
                                                onChange={(e) => handleInputChange('preferredHourlyRate', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="frequency">Weekly Frequency</Label>
                                        <Select value={formData.frequencyWeekly} onValueChange={(value) => handleInputChange('frequencyWeekly', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Classes per week" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 class / week</SelectItem>
                                                <SelectItem value="2">2 classes / week</SelectItem>
                                                <SelectItem value="3">3 classes / week</SelectItem>
                                                <SelectItem value="4+">4+ classes / week</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Comfortable Time Slots</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {timeSlotOptions.map((slot) => (
                                            <div key={slot} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`slot-${slot}`}
                                                    checked={formData.timeSlots.includes(slot)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            handleInputChange('timeSlots', [...formData.timeSlots, slot])
                                                        } else {
                                                            handleInputChange('timeSlots', formData.timeSlots.filter(s => s !== slot))
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`slot-${slot}`} className="text-sm font-normal cursor-pointer">
                                                    {slot}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit Registration'}
                                </Button>
                                <p className="text-center text-sm text-muted-foreground mt-4">
                                    By submitting, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
