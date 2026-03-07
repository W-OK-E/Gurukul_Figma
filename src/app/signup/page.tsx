import { AuthForm } from '@/components/auth/AuthForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign Up - Gurukul',
    description: 'Join Gurukul as a student or instructor and start learning or teaching today.',
}

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4">
            <div className="w-full max-w-md py-12">
                <AuthForm mode="signup" />
            </div>
        </div>
    )
}
