'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// お問い合わせフォームのスキーマ
const formSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  company: z.string().min(1, '会社名を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, 'お問い合わせ種別を選択してください'),
  message: z.string().min(10, 'お問い合わせ内容は10文字以上で入力してください'),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: '',
    }
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    setIsError(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'フォームの送信に失敗しました')
      }

      console.log('Contact form submitted successfully:', result)
      setIsSuccess(true)
      form.reset()
    } catch (error) {
      console.error('Form submission failed:', error)
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container-wide py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">お問い合わせ</h1>
        <p className="text-muted-foreground mb-8">
          AI比較.comについてのお問い合わせや、AIサービスに関する資料請求はこちらのフォームからお願いします。
        </p>

        {isSuccess ? (
          <Alert className="mb-8 border-green-500 bg-secondary">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle>送信完了</AlertTitle>
            <AlertDescription>
              お問い合わせありがとうございます。内容を確認の上、担当者より折り返しご連絡いたします。
            </AlertDescription>
          </Alert>
        ) : isError ? (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>エラー</AlertTitle>
            <AlertDescription>
              送信中にエラーが発生しました。時間をおいて再度お試しいただくか、直接お電話でお問い合わせください。
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="bg-white p-8 border rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>お名前 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="山田 太郎" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>会社名 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="株式会社AI比較" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="info@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>電話番号</FormLabel>
                      <FormControl>
                        <Input placeholder="03-1234-5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="inquiryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お問い合わせ種別 <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="お問い合わせ種別を選択してください" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="service-inquiry">サービスに関するお問い合わせ</SelectItem>
                        <SelectItem value="document-request">資料請求</SelectItem>
                        <SelectItem value="service-listing">サービス掲載のご相談</SelectItem>
                        <SelectItem value="media">取材・メディア掲載について</SelectItem>
                        <SelectItem value="other">その他</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お問い合わせ内容 <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="お問い合わせ内容を入力してください"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? 'お問い合わせ送信中...' : 'お問い合わせを送信する'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
