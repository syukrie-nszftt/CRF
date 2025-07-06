
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // In a real application, you would process this data:
    // - Save it to a database
    // - Send it in an email using a service like Nodemailer, SendGrid, etc.
    console.log('Form data received:', formData);

    // For this example, we'll just return a success message.
    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Error submitting form' }, { status: 500 });
  }
}
