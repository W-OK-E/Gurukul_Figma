'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type ProfileUpdateData = {
    firstName?: string
    lastName?: string
    grade?: string
    bio?: string
    subjects?: string[]
}

export async function updateProfile(data: ProfileUpdateData) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // Validate inputs
    if (data.firstName && data.firstName.length < 2) {
        return { error: 'First name must be at least 2 characters' }
    }

    const updates: any = {
        updated_at: new Date().toISOString(),
    }

    if (data.firstName) updates.firsName = data.firstName // Matching the typo in AuthPage.tsx for now, or should fix DB?
    // Let's assume we should fix it or use the existing column. 
    // I'll use 'first_name' as a better practice and maybe the DB has both or I should check.
    // Given AuthPage used 'firsName', I'll stick to it to avoid breaking, but I'll also add 'first_name' if I can.
    // Actually, let's just use what was in AuthPage: firsName. 
    // Wait, I should probably fix the typo in the DB if I could, but I can't see the DB.
    // I'll use 'firsName' to match the existing code I saw.
    if (data.firstName) updates.firsName = data.firstName
    if (data.lastName) updates.lastName = data.lastName
    if (data.grade) updates.grade = data.grade
    // if (data.bio) updates.bio = data.bio

    const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)

    if (error) {
        console.error('Error updating profile:', error)
        return { error: 'Failed to update profile' }
    }

    revalidatePath('/profile')
    return { success: true }
}

export async function verifyTutor(tutorId: string) {
    const supabase = await createClient()

    // Check if current user is admin
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const { data: currentUserProfile } = await supabase
        .from('users')
        .select('userType')
        .eq('id', user.id)
        .single()

    if (currentUserProfile?.userType !== 'admin') {
        return { error: 'Forbidden: Admin access required' }
    }

    const { error } = await supabase
        .from('users')
        .update({ verified: true })
        .eq('id', tutorId)

    if (error) {
        return { error: 'Failed to verify tutor' }
    }

    revalidatePath('/admin/tutors')
    return { success: true }
}
