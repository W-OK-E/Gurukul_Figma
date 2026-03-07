'use client'

import { useState } from 'react'
import { createTutoringSession } from '@/app/actions/tutoring'
import { updateProfile } from '@/app/actions/profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function TestActionsPage() {
    const [message, setMessage] = useState('')

    async function handleCreateSession(formData: FormData) {
        const subject = formData.get('subject') as string
        const startTime = formData.get('startTime') as string
        const endTime = formData.get('endTime') as string

        const result = await createTutoringSession({
            subject,
            grade: '10', // hardcoded for test
            startTime,
            endTime,
        })

        if (result.error) {
            setMessage(`Error: ${result.error}`)
        } else {
            setMessage('Session created successfully!')
        }
    }

    async function handleUpdateProfile(formData: FormData) {
        const firstName = formData.get('firstName') as string

        const result = await updateProfile({
            firstName,
        })

        if (result.error) {
            setMessage(`Error: ${result.error}`)
        } else {
            setMessage('Profile updated successfully!')
        }
    }

    return (
        <div className="p-8 space-y-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold">Test Server Actions</h1>

            {message && (
                <div className="p-4 bg-secondary text-secondary-foreground rounded">
                    {message}
                </div>
            )}

            <div className="space-y-4 border p-4 rounded">
                <h2 className="text-xl">Create Session</h2>
                <form action={handleCreateSession} className="space-y-4">
                    <div>
                        <Label>Subject</Label>
                        <Input name="subject" defaultValue="Math" required />
                    </div>
                    <div>
                        <Label>Start Time</Label>
                        <Input name="startTime" type="datetime-local" required />
                    </div>
                    <div>
                        <Label>End Time</Label>
                        <Input name="endTime" type="datetime-local" required />
                    </div>
                    <Button type="submit">Create Session</Button>
                </form>
            </div>

            <div className="space-y-4 border p-4 rounded">
                <h2 className="text-xl">Update Profile</h2>
                <form action={handleUpdateProfile} className="space-y-4">
                    <div>
                        <Label>First Name</Label>
                        <Input name="firstName" required />
                    </div>
                    <Button type="submit">Update Profile</Button>
                </form>
            </div>
        </div>
    )
}
