'use server'

import { sendRegistrationEmails } from '@/lib/email'

export async function sendNotificationAction(formData: any) {
    try {
        await sendRegistrationEmails(formData);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
