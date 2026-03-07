'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type TutoringSessionData = {
    title?: string
    subject: string
    grade: string
    description?: string
    startTime: string
    endTime: string
    tutorId?: string
    studentId?: string
}

export async function createTutoringSession(data: TutoringSessionData) {
    const supabase = await createClient()

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser()

    console.log('Server Action: createTutoringSession')
    console.log('User:', user?.id)

    if (!user) {
        throw new Error(`Unauthorized: ${userError?.message || 'No user found'}`)
    }

    // Basic validation
    if (!data.subject || !data.startTime || !data.endTime) {
        return { error: 'Missing required fields' }
    }

    // Determine roles
    // If tutor creates it, they are the tutor. If student creates it, they are the student.
    // Ideally we check user role from DB, but for now we can infer or pass it.
    // Let's assume if tutorId is passed and matches user, or if not passed, user is student?
    // Better: Check user metadata or DB role.

    // For now, let's just insert what we have.
    // If the user is an instructor (we can check this later), they set tutor_id = user.id
    // If the user is a student, they set student_id = user.id

    // We'll fetch the user's role to be sure.
    const { data: userProfile } = await supabase.from('users').select('userType').eq('id', user.id).single()

    const insertData: any = {
        subject: data.subject,
        grade: data.grade,
        description: data.description,
        title: data.title || `${data.subject} Session`,
        start_time: data.startTime,
        end_time: data.endTime,
        status: 'pending',
    }

    if (userProfile?.userType === 'instructor' || userProfile?.userType === 'admin') {
        insertData.tutor_id = user.id
        // If they specified a student, add it
        if (data.studentId) insertData.student_id = data.studentId
    } else {
        insertData.student_id = user.id
        // Student requesting a specific tutor?
        if (data.tutorId) insertData.tutor_id = data.tutorId
    }

    const { error } = await supabase.from('tutoring_sessions').insert(insertData)

    if (error) {
        console.error('Error creating session:', error)
        return { error: 'Failed to create session' }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function getStudentSessions() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
        .from('tutoring_sessions')
        .select(`
            *,
            tutor:users!tutoring_sessions_tutor_id_fkey(firstname, lastname, email)
        `)
        .eq('student_id', user.id)
        .order('start_time', { ascending: true })

    if (error) {
        console.error('Error fetching student sessions:', error)
        return []
    }

    return data
}

export async function getInstructorSessions() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
        .from('tutoring_sessions')
        .select(`
            *,
            student:users!tutoring_sessions_student_id_fkey(firstname, lastname, email)
        `)
        .eq('tutor_id', user.id)
        .order('start_time', { ascending: true })

    if (error) {
        console.error('Error fetching instructor sessions:', error)
        return []
    }

    return data
}

