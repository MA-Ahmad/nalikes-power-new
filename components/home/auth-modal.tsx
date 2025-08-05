'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'

import { authApi, RegisterData, LoginData } from '@/lib/auth-api'
import { useAuthStore } from '@/store/auth'

// Validation schemas
const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
  acceptAge: z.boolean().refine((val) => val === true, {
    message: 'You must confirm you are above 18 years old',
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type RegisterFormData = z.infer<typeof registerSchema>
type LoginFormData = z.infer<typeof loginSchema>

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState('signup')
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { setUser, setIsAuthenticated } = useAuthStore()

  // Register form
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      acceptAge: false,
      acceptTerms: false,
    },
  })

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Reset forms when modal opens/closes
  useEffect(() => {
    if (!open) {
      registerForm.reset()
      loginForm.reset()
      recaptchaRef.current?.reset()
    }
  }, [open, registerForm, loginForm])

  // Reset forms when switching tabs
  useEffect(() => {
    registerForm.reset()
    loginForm.reset()
    recaptchaRef.current?.reset()
  }, [activeTab, registerForm, loginForm])

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setUser(data.user)
      setIsAuthenticated(true)
      toast.success('Registration successful!')
      onOpenChange(false)
    },
    onError: () => {
      recaptchaRef.current?.reset()
    },
  })

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user)
      setIsAuthenticated(true)
      toast.success('Login successful!')
      onOpenChange(false)
    },
    onError: () => {
      recaptchaRef.current?.reset()
    },
  })

  const onRegisterSubmit = async (data: RegisterFormData) => {
    const recaptchaToken = recaptchaRef.current?.getValue()
    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA')
      return
    }

    const registerData: RegisterData = {
      username: data.username,
      email: data.email,
      password: data.password,
      recaptchaToken,
    }

    registerMutation.mutate(registerData)
  }

  const onLoginSubmit = async (data: LoginFormData) => {
    const recaptchaToken = recaptchaRef.current?.getValue()
    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA')
      return
    }

    const loginData: LoginData = {
      email: data.email,
      password: data.password,
      recaptchaToken,
    }

    loginMutation.mutate(loginData)
  }

  const isLoading = registerMutation.isPending || loginMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full lg:min-w-4xl mx-4 p-0 bg-neutral-900 border-neutral-400 overflow-hidden rounded-2xl"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <div className="flex h-[600px] max-h-[90vh]">
          {/* Left side - Form */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 h-full">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full h-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-neutral-800 mb-6">
                    <TabsTrigger value="login">LOGIN</TabsTrigger>
                    <TabsTrigger value="signup">CREATE ACCOUNT</TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="signup"
                    className="mt-0 space-y-4 data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <form
                      onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                      className="space-y-4 flex-1 mb-8"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-white">
                          Username*
                        </Label>
                        <Input
                          id="username"
                          {...registerForm.register('username')}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          placeholder="Enter username"
                        />
                        {registerForm.formState.errors.username && (
                          <p className="text-red-400 text-sm mt-1">
                            {registerForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email*
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...registerForm.register('email')}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          placeholder="Enter email"
                        />
                        {registerForm.formState.errors.email && (
                          <p className="text-red-400 text-sm mt-1">
                            {registerForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">
                          Password*
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          {...registerForm.register('password')}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          placeholder="Enter password"
                        />
                        {registerForm.formState.errors.password && (
                          <p className="text-red-400 text-sm mt-1">
                            {registerForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="age"
                            className="border-gray-500"
                            checked={registerForm.watch('acceptAge')}
                            onCheckedChange={(checked) =>
                              registerForm.setValue(
                                'acceptAge',
                                checked === true
                              )
                            }
                          />
                          <div className="space-y-1">
                            <Label
                              htmlFor="age"
                              className="text-sm text-gray-300"
                            >
                              I confirm I&apos;m above 18 years old.*
                            </Label>
                            {registerForm.formState.errors.acceptAge && (
                              <p className="text-red-400 text-sm">
                                {
                                  registerForm.formState.errors.acceptAge
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            className="border-gray-500"
                            checked={registerForm.watch('acceptTerms')}
                            onCheckedChange={(checked) =>
                              registerForm.setValue(
                                'acceptTerms',
                                checked === true
                              )
                            }
                          />
                          <div className="space-y-1">
                            <Label
                              htmlFor="terms"
                              className="text-sm text-gray-300"
                            >
                              I agree to the terms & Conditions.*
                            </Label>
                            {registerForm.formState.errors.acceptTerms && (
                              <p className="text-red-400 text-sm">
                                {
                                  registerForm.formState.errors.acceptTerms
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-[#171717] inline-block p-[1px] rounded-md overflow-hidden">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={
                              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
                            }
                            theme="dark"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-semibold py-3"
                      >
                        {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent
                    value="login"
                    className="mt-0 space-y-4 data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <form
                      onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                      className="space-y-4 flex-1"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-white">
                          Email*
                        </Label>
                        <Input
                          id="login-email"
                          type="email"
                          {...loginForm.register('email')}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          placeholder="Enter email"
                        />
                        {loginForm.formState.errors.email && (
                          <p className="text-red-400 text-sm mt-1">
                            {loginForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-white">
                          Password*
                        </Label>
                        <Input
                          id="login-password"
                          type="password"
                          {...loginForm.register('password')}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          placeholder="Enter password"
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-red-400 text-sm mt-1">
                            {loginForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="bg-[#171717] inline-block p-[1px] rounded-md overflow-hidden">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={
                              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
                            }
                            theme="dark"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-semibold py-3"
                      >
                        {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex-1 relative min-w-0 hidden lg:flex border-l border-neutral-800 flex-col items-center justify-center">
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
            <Image
              src="/images/modal-hero2.png"
              alt="Powerblocks Hero"
              width={300}
              height={400}
              className="object-contain rounded-md"
              priority
            />
            <div className="text-white mt-4 text-center">
              <div className="text-lg font-semibold">
                From the Streets to the Jet.
              </div>
              <div className="text-lg font-semibold">Let&apos;s go dawg</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
