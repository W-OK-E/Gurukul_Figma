import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

export async function sendRegistrationEmails(data: any) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not found. Skipping emails.');
        return;
    }

    const { studentName, parentName, email, courses, parentPhone } = data;

    try {
        // 1. Email to Admin
        await resend.emails.send({
            from: 'Gurukul <onboarding@resend.dev>',
            to: adminEmail,
            subject: `New Trial Registration: ${studentName}`,
            html: `
        <h2>New Student Registration Details</h2>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Parent Name:</strong> ${parentName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${parentPhone}</p>
        <p><strong>Interested Courses:</strong> ${courses.join(', ')}</p>
        <p>Please log in to the dashboard to schedule a demo.</p>
      `,
        });

        // 2. Confirmation to User
        await resend.emails.send({
            from: 'Gurukul <onboarding@resend.dev>',
            to: email,
            subject: 'Registration Successful - Gurukul',
            html: `
        <h2>Welcome to Gurukul!</h2>
        <p>Dear ${parentName},</p>
        <p>We have received your registration for <strong>${studentName}</strong>. Our academic team will contact you shortly to schedule your free trial session.</p>
        <p>Thank you for choosing Gurukul for your child's learning journey.</p>
        <br/>
        <p>Best regards,</p>
        <p>Team Gurukul</p>
      `,
        });
    } catch (error) {
        console.error('Failed to send emails:', error);
    }
}
