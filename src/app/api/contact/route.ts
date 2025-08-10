import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validation/contact';
import ContactNotification from '../../../../emails/contact-notification';
import ContactAutoReply from '../../../../emails/contact-auto-reply';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = contactSchema.parse(body);

    // 管理者への通知メール
    const adminEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kawaguchi.shin.03@gmail.com',
      subject: `お問い合わせ: ${validatedData.subject || '件名なし'}`,
      react: ContactNotification({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
      }),
    });

    // 自動返信メール（問い合わせした人へ）
    const autoReply = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [validatedData.email],
      subject: 'お問い合わせありがとうございます',
      react: ContactAutoReply({
        name: validatedData.name,
        subject: validatedData.subject,
        message: validatedData.message,
      }),
    });

    if (adminEmail.error || autoReply.error) {
      return NextResponse.json(
        { error: 'メール送信に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        adminEmail: adminEmail.data,
        autoReply: autoReply.data,
      },
    });
  } catch (error) {
    console.error('API エラー:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
