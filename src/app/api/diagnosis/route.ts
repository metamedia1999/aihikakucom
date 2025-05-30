import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendDiagnosisEmail } from '@/lib/email'
import { addDiagnosisToSheet } from '@/lib/sheets'

const diagnosisSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  tel: z.string().optional(),
  task: z.string().min(1, '業務内容を選択してください'),
  details: z.string().min(10, '詳細は10文字以上で入力してください'),
})

type DiagnosisFormData = z.infer<typeof diagnosisSchema>

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validatedData = diagnosisSchema.parse(body)
    
    // Parallel execution of email and sheets operations for better performance
    const [emailResult, sheetsResult] = await Promise.allSettled([
      sendDiagnosisEmail(validatedData),
      addDiagnosisToSheet(validatedData)
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
    
    // Generate a unique lead ID for tracking
    const leadId = `lead-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    return NextResponse.json({
      success: true,
      message: '診断情報を受け付けました。結果は後日メールでお送りします。',
      leadId,
      emailId: emailResult.status === 'fulfilled' && emailResult.value.success ? emailResult.value.messageId : null,
      sheetsId: sheetsResult.status === 'fulfilled' && sheetsResult.value.success ? sheetsResult.value.rowId : null,
    })
    
  } catch (error) {
    console.error('Diagnosis form submission error:', error)
    
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