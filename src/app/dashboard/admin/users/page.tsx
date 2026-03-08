'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    Trash2,
    Search,
    Shield,
    GraduationCap,
    BookOpen,
    Loader2,
    Mail
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabaseClient'
import { deleteUser } from '@/app/actions/admin'
import { toast } from 'sonner'

interface Profile {
    id: string
    full_name: string
    email: string
    role: 'student' | 'instructor' | 'admin'
    avatar_url: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        setLoading(true)
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('role', { ascending: false })

        if (data) setUsers(data)
        setLoading(false)
    }

    const handleDelete = async (user: Profile) => {
        if (!confirm(`Are you sure you want to delete ${user.full_name}? This will also delete their auth account.`)) return

        setDeletingId(user.id)
        const result = await deleteUser(user.id)
        if (result.success) {
            toast.success('User deleted successfully')
            fetchUsers()
        } else {
            toast.error(result.error || 'Failed to delete user')
        }
        setDeletingId(null)
    }

    const filteredUsers = users.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Manage Users</h1>
                    <p className="text-muted-foreground">View and manage all active Students and Instructors.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        No users found matching your search.
                    </div>
                ) : (
                    <Card className="border-none shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-accent/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-accent/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                                        {user.full_name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div className="font-medium text-sm">{user.full_name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant={user.role === 'admin' ? 'default' : 'secondary'}
                                                    className="gap-1 bg-opacity-10 capitalize"
                                                >
                                                    {user.role === 'admin' && <Shield className="h-3 w-3" />}
                                                    {user.role === 'instructor' && <BookOpen className="h-3 w-3" />}
                                                    {user.role === 'student' && <GraduationCap className="h-3 w-3" />}
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-muted-foreground">{user.email}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {user.role !== 'admin' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleDelete(user)}
                                                        disabled={deletingId === user.id}
                                                    >
                                                        {deletingId === user.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    )
}
