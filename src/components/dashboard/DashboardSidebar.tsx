'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    Users,
    Settings,
    LogOut,
    GraduationCap
} from 'lucide-react'
import { cn } from '@/components/ui/utils'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface SidebarProps {
    role: 'student' | 'instructor'
}

export function DashboardSidebar({ role }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()

    const links = [
        {
            name: 'Overview',
            href: `/dashboard/${role}`,
            icon: LayoutDashboard
        },
        {
            name: role === 'student' ? 'My Courses' : 'Manage Courses',
            href: `/dashboard/${role}/courses`,
            icon: BookOpen
        },
        {
            name: 'Schedule',
            href: `/dashboard/${role}/schedule`,
            icon: Calendar
        },
        {
            name: role === 'student' ? 'My Instructors' : 'My Students',
            href: `/dashboard/${role}/people`,
            icon: Users
        },
        {
            name: 'Settings',
            href: `/dashboard/${role}/settings`,
            icon: Settings
        },
    ]

    const handleLogout = async () => {
        await supabase.auth.signOut()
        toast.success('Logged out successfully')
        router.push('/login')
    }

    return (
        <div className="flex flex-col h-full bg-card border-r border-border w-64">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
                    <GraduationCap className="h-8 w-8" />
                    <span>Gurukul</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {link.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    Log Out
                </Button>
            </div>
        </div>
    )
}
