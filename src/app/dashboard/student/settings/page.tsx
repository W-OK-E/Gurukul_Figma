'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'
import { User, Lock, Bell, Shield, Loader2 } from 'lucide-react'

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [profile, setProfile] = useState<any>(null)

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                setProfile(data || {
                    full_name: user.user_metadata?.full_name || '',
                    email: user.email || '',
                    role: user.user_metadata?.role || 'student'
                })
            }
            setLoading(false)
        }
        loadProfile()
    }, [])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No user found')

            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    full_name: profile.full_name,
                    email: profile.email,
                    updated_at: new Date().toISOString(),
                })

            if (error) throw error
            toast.success('Profile updated successfully')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="profile" className="gap-2">
                        <User className="h-4 w-4" /> Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                        <Lock className="h-4 w-4" /> Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" /> Notifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details and how others see you.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            value={profile?.full_name || ''}
                                            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" value={profile?.email || ''} disabled />
                                        <p className="text-xs text-muted-foreground">Email cannot be changed directly.</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="capitalize">{profile?.role}</Badge>
                                    </div>
                                </div>
                                <Button type="submit" disabled={saving}>
                                    {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                    Save Changes
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your password and account security.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Change Password</Label>
                                        <p className="text-sm text-muted-foreground">Update your password to keep your account secure.</p>
                                    </div>
                                    <Button variant="outline">Update</Button>
                                </div>
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="space-y-0.5">
                                        <Label className="text-base flex items-center gap-2">
                                            <Shield className="h-4 w-4 text-primary" /> Two-Factor Authentication
                                        </Label>
                                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                                    </div>
                                    <Button variant="outline">Enable</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
