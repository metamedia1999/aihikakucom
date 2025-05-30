import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactEmail } from '@/lib/email'
import { addContactToSheet } from '@/lib/sheets'

const contactSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  company: z.string().min(1, '会社名を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, 'お問い合わせ種別を選択してください'),
  message: z.string().min(10, 'お問い合わせ内容は10文字以上で入力してください'),
})

type ContactFormData = z.infer<typeof contactSchema>

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validatedData = contactSchema.parse(body)
    
    // Parallel execution of email and sheets operations for better performance
    const [emailResult, sheetsResult] = await Promise.allSettled([
      sendContactEmail(validatedData),
      addContactToSheet(validatedData)
    ])
    
    // Check email result
    if (emailResult.status === 'rejected' || !emailResult.value.success) {
      console.error('Email sending failed:', emailResult.status === 'rejected' ? emailResult.reason : emailResult.value.error)
      // Don't fail the entire request if email fails - log and continue
    }
    
    // Check Google Sheets result
    if (sheetsResult.status === 'rejected' || !sheetsResult.value.success) {
      console.error('Google Sheets saving failed:', sheetsResult.status === 'rejected' ? sheetsResult.reason : sheetsResult.value.error)
      // Don't fail the entire request if sheets fails - log and continue
    }
    
    return NextResponse.json({
      success: true,
      message: 'お問い合わせを受け付けました。担当者より折り返しご連絡いたします。',
      emailId: emailResult.status === 'fulfilled' && emailResult.value.success ? emailResult.value.messageId : null,
      sheetsId: sheetsResult.status === 'fulfilled' && sheetsResult.value.success ? sheetsResult.value.rowId : null,
    })
    
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'フォームの入力に不備があります。',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: '送信中にエラーが発生しました。時間をおいて再度お試しください。' 
      },
      { status: 500 }
    )
  }
}