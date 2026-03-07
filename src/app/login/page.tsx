import { AuthForm } from '@/components/auth/AuthForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login - Gurukul',
    description: 'Log in to your Gurukul dashboard to manage your courses and schedules.',
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4">
            <div className="w-full max-w-md py-12">
                <AuthForm mode="login" />
            </div>
        </div>
    )
}
