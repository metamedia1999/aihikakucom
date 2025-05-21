'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { BUSINESS_ISSUES } from '@/lib/constants'

// フォームのスキーマ
const formSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  tel: z.string().optional(),
  task: z.string().min(1, '業務内容を選択してください'),
  details: z.string().min(10, '詳細は10文字以上で入力してください'),
})

type FormValues = z.infer<typeof formSchema>

export function CTAFreeDiagnosis() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      tel: '',
      task: '',
      details: '',
    }
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    setIsError(false)

    try {
      // 実際の実装では /wp-json/contact-form-7/v1/contact-forms/1/feedback にPOST
      // ここではダミーの実装として1秒後に成功したことにする
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Diagnosis form values:', values)
      setIsSuccess(true)
      form.reset()

      // 成功したら3秒後にサンクスページにリダイレクト
      setTimeout(() => {
        setOpen(false)
        const submissionId = `mock-${Date.now()}`
        router.push(`/thankyou?lead=${submissionId}`)
      }, 3000)
    } catch (error) {
      console.error('Form submission failed:', error)
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* 診断モーダル */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* 浮遊するボタン - DialogTriggerをDialogの内部に移動 */}
        <div className="fixed bottom-6 right-6 z-50">
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full shadow-lg flex items-center gap-2"
            >
              <Lightbulb className="h-5 w-5" />
              1分診断で最適AIを探す
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>1分AI診断</DialogTitle>
            <DialogDescription>
              簡単な質問に答えるだけで、あなたのビジネスに最適なAIサービスをご提案します。
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <Alert className="bg-secondary border-green-500">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertTitle>送信完了</AlertTitle>
              <AlertDescription>
                診断情報を受け付けました。専門スタッフが最適なAIサービスを厳選してご提案します。
              </AlertDescription>
            </Alert>
          ) : isError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>エラー</AlertTitle>
              <AlertDescription>
                送信中にエラーが発生しました。時間をおいて再度お試しください。
              </AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
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
                    name="tel"
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
                  name="task"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>自動化したい業務 <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="業務を選択してください" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BUSINESS_ISSUES.map((issue) => (
                            <SelectItem key={issue.id} value={issue.id}>
                              {issue.icon} {issue.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">その他</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>詳細・ご要望 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="現在の課題や希望する効果などをお書きください"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '送信中...' : '無料診断を受ける'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
