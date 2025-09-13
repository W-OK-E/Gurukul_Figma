import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { AuthProvider } from '../lib/auth-context'
import { Navigation } from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TutorPlatform - K-12 Tutoring Excellence',
  description: 'Comprehensive tutoring platform for K-12 students with expert instructors in robotics, music, science, and math.',
  keywords: 'tutoring, K-12, education, online learning, robotics, music, science, math',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-16">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}