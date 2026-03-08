'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

// Use service role key for admin actions
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function createStudentFromRegistration(registrationId: string, email: string, fullName: string) {
    try {
        // 1. Create the user in Auth
        // Generating a temporary password. In a real app, you'd send a reset password email.
        const tempPassword = Math.random().toString(36).slice(-8) + '123!';

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password: tempPassword,
            email_confirm: true,
            user_metadata: {
                full_name: fullName,
                role: 'student'
            }
        });

        if (authError) throw authError;

        // 2. Update registration status
        const { error: regError } = await supabaseAdmin
            .from('registrations')
            .update({ status: 'completed' })
            .eq('id', registrationId);

        if (regError) throw regError;

        revalidatePath('/dashboard/admin/registrations');
        return { success: true, password: tempPassword };
    } catch (error: any) {
        console.error('Admin user creation error:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteUser(userId: string) {
    try {
        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
        if (error) throw error;

        revalidatePath('/dashboard/admin/users');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateCourse(id: string, updates: any) {
    try {
        const { error } = await supabaseAdmin
            .from('courses')
            .update(updates)
            .eq('id', id);

        if (error) throw error;
        revalidatePath('/dashboard/admin/courses');
        revalidatePath('/courses');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteCourse(id: string) {
    try {
        const { error } = await supabaseAdmin
            .from('courses')
            .delete()
            .eq('id', id);

        if (error) throw error;
        revalidatePath('/dashboard/admin/courses');
        revalidatePath('/courses');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
