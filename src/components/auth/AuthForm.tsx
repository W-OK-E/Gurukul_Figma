'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { GraduationCap, BookOpen, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface AuthFormProps {
    mode: 'login' | 'signup'
}

export function AuthForm({ mode }: AuthFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [role, setRole] = useState<'student' | 'instructor'>('student')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            role: role,
                        },
                    },
                })
                if (error) throw error
                toast.success('Registration successful! Please check your email for verification.')
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error

                // Redirect based on role after short delay
                const { data: { user } } = await supabase.auth.getUser()
                const userRole = user?.user_metadata?.role || 'student'

                toast.success('Login successful!')
                router.push(`/dashboard/${userRole}`)
            }
        } catch (error: any) {
            console.error('Auth error:', error)
            toast.error(error.message || 'An error occurred during authentication')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-2xl border-primary/10">
            <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <GraduationCap className="h-10 w-10 text-primary" />
                    </div>
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                    {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
                </CardTitle>
                <CardDescription>
                    {mode === 'login'
                        ? 'Enter your credentials to access your dashboard'
                        : 'Join our platform and start your learning journey'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="role">I am a...</Label>
                                <Tabs defaultValue="student" className="w-full" onValueChange={(v) => setRole(v as any)}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="student" className="flex items-center gap-2">
                                            <GraduationCap className="h-4 w-4" /> Student
                                        </TabsTrigger>
                                        <TabsTrigger value="instructor" className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4" /> Instructor
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            {mode === 'login' && (
                                <Button variant="link" className="p-0 h-auto text-xs font-normal" type="button">
                                    Forgot password?
                                </Button>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button className="w-full flex items-center justify-center gap-2" type="submit" disabled={loading}>
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    {mode === 'login' ? (
                        <p className="text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => router.push('/signup')}>
                                Sign Up
                            </Button>
                        </p>
                    ) : (
                        <p className="text-muted-foreground">
                            Already have an account?{' '}
                            <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => router.push('/login')}>
                                Sign In
                            </Button>
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
