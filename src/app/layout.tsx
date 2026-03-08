import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { Navigation } from '../components/Navigation'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gurukul - K-12 Tutoring Excellence',
  description: 'Comprehensive tutoring platform for K-12 students with expert instructors in robotics, music, science, and math.',
  keywords: 'tutoring, K-12, education, online learning, robotics, music, science, math',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Toaster position="top-center" richColors />
        </div>
      </body>
    </html>
  )
}