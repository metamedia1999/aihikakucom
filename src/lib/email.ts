import nodemailer from 'nodemailer'

interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

const createTransporter = () => {
  // You'll need to configure these environment variables
  // For Gmail SMTP or other email providers
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number.parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email address
      pass: process.env.SMTP_PASS, // Your email password or app-specific password
    },
  })
}

export async function sendContactEmail(data: {
  name: string
  company: string
  email: string
  phone?: string
  inquiryType: string
  message: string
}) {
  try {
    const transporter = createTransporter()
    
    const emailContent = `
新しいお問い合わせがあります。

【お客様情報】
お名前: ${data.name}
会社名: ${data.company}
メールアドレス: ${data.email}
電話番号: ${data.phone || '未記入'}
お問い合わせ種別: ${data.inquiryType}

【お問い合わせ内容】
${data.message}

---
このメールはAI比較.comのお問い合わせフォームから送信されました。
送信日時: ${new Date().toLocaleString('ja-JP')}
    `.trim()

    const result = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'info@metamoment.co.jp',
      subject: `【AI比較.com】お問い合わせ - ${data.company} ${data.name}様`,
      text: emailContent,
    })

    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendDiagnosisEmail(data: {
  name: string
  email: string
  tel?: string
  task: string
  details: string
}) {
  try {
    const transporter = createTransporter()
    
    const emailContent = `
新しいAI診断の申し込みがあります。

【お客様情報】
お名前: ${data.name}
メールアドレス: ${data.email}
電話番号: ${data.tel || '未記入'}

【診断内容】
自動化したい業務: ${data.task}
詳細・ご要望: ${data.details}

---
このメールはAI比較.comのAI診断フォームから送信されました。
送信日時: ${new Date().toLocaleString('ja-JP')}

※お客様に診断結果をメールでお送りする必要があります。
    `.trim()

    const result = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'info@metamoment.co.jp',
      subject: `【AI比較.com】AI診断申し込み - ${data.name}様`,
      text: emailContent,
    })

    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}