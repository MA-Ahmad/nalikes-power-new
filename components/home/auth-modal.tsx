'use client'

import { X, Check, X as XIcon, Eye, EyeOff, Link } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
// import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Autoplay from 'embla-carousel-autoplay'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from '@/components/ui/carousel'

import { authApi, SignupData, SigninData } from '@/lib/auth-api'
import { useAuthStore } from '@/store/auth'
import { useOAuth } from '@/hooks/use-oauth'
import { RequestPasswordResetDialog } from '@/components/home/request-password-reset-dialog'

// Simple OAuth Icons
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

function CarouselWithAutoplay() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, playOnInit: true })
  )

  // Fetch images from backend with type 'auth' - only shows auth type images
  const {
    data: images = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['auth-modal-images', 'auth'],
    queryFn: () => authApi.getAuthModalImages('auth'),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })

  // Fallback images if API fails or returns empty
  const fallbackImages: Array<{
    id: string
    image: string
    title: string
    description: string
    orderIndex: number
    isActive: boolean
  }> = [
    {
      id: '1',
      image: '/images/modal-hero.png',
      title: 'Powerblocks Hero 1',
      description: '',
      orderIndex: 0,
      isActive: true,
    },
    {
      id: '2',
      image: '/images/hero2.png',
      title: 'Powerblocks Hero 2',
      description: '',
      orderIndex: 1,
      isActive: true,
    },
  ]

  // Filter images by type 'AUTH' (client-side filtering as backup)
  const filteredImages = images.filter(
    (img) => img.type?.toUpperCase() === 'AUTH' || !img.type // Include if type is AUTH or undefined (for backward compatibility)
  )

  const displayImages =
    filteredImages.length > 0 ? filteredImages : fallbackImages

  // Sort by orderIndex
  const sortedImages = [...displayImages].sort((a, b) => {
    return a.orderIndex - b.orderIndex
  })

  if (isLoading) {
    return (
      <div className="w-full max-w-sm flex items-center justify-center h-[400px]">
        <div className="text-white">Loading images...</div>
      </div>
    )
  }

  if (sortedImages.length === 0) {
    return null
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
        align: 'start',
      }}
    >
      <CarouselContent className="h-full -ml-0">
        {sortedImages.map((image, index) => (
          <CarouselItem key={image.id || index} className="h-full pl-0">
            <div className="relative w-full h-full">
              <Image
                src={image.image}
                alt={image.title || image.description || 'Powerblocks Hero'}
                width={1920}
                height={600}
                className="w-full h-full object-cover rounded-md"
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
}

// Password validation helper - validates all conditions at once
const passwordSchema = z.string().refine(
  (val) => {
    const conditions = {
      minLength: val.length >= 8,
      hasLowercase: /[a-z]/.test(val),
      hasUppercase: /[A-Z]/.test(val),
      hasNumber: /[0-9]/.test(val),
    }
    return Object.values(conditions).every(Boolean)
  },
  {
    message: 'Password does not meet all requirements',
  }
)

// Validation schemas
const signupSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, 'Username or email is required')
    .refine(
      (val) => {
        // Check if it's a valid email or username
        const isEmail = z.string().email().safeParse(val).success
        const isUsername =
          /^[a-zA-Z0-9_]+$/.test(val) && val.length >= 3 && val.length <= 20
        return isEmail || isUsername
      },
      {
        message:
          'Please enter a valid username (3-20 chars, letters/numbers/underscores) or email address',
      }
    ),
  password: passwordSchema,
  acceptAge: z.boolean().refine((val) => val === true, {
    message: 'You must confirm you are above 18 years old',
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

const signinSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, 'Username or email is required')
    .refine(
      (val) => {
        // Check if it's a valid email or username
        const isEmail = z.string().email().safeParse(val).success
        const isUsername = /^[a-zA-Z0-9_]+$/.test(val) && val.length >= 3
        return isEmail || isUsername
      },
      {
        message: 'Please enter a valid username or email address',
      }
    ),
  password: z.string().min(1, 'Password is required'),
})

type SignupFormData = z.infer<typeof signupSchema>
type SigninFormData = z.infer<typeof signinSchema>

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState('signup')
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showSigninPassword, setShowSigninPassword] = useState(false)
  const [showPasswordResetDialog, setShowPasswordResetDialog] = useState(false)
  const { setUser, setIsAuthenticated } = useAuthStore()

  // Password validation helper function
  const checkPasswordConditions = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    }
  }

  // const recaptchaRef = useRef<ReCAPTCHA>(null)

  // Signup form
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
      acceptAge: false,
      acceptTerms: false,
    },
  })

  // Signin form
  const signinForm = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  })

  // Reset forms when modal opens/closes
  useEffect(() => {
    if (!open) {
      signupForm.reset()
      signinForm.reset()
      setShowSignupPassword(false)
      setShowSigninPassword(false)
      // recaptchaRef.current?.reset()
    }
  }, [open, signupForm, signinForm])

  // Reset forms when switching tabs
  useEffect(() => {
    signupForm.reset()
    signinForm.reset()
    setShowSignupPassword(false)
    setShowSigninPassword(false)
    // recaptchaRef.current?.reset()
  }, [activeTab, signupForm, signinForm])

  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      setUser({
        ...data.user,
        depositWalletAddresses: data.user.depositWalletAddresses,
      })
      setIsAuthenticated(true)
      toast.success('Account created successfully!')
      onOpenChange(false)
      signupForm.reset()
    },
    onError: () => {
      // Error handling is done by axios interceptor
      // recaptchaRef.current?.reset()
    },
  })

  const signinMutation = useMutation({
    mutationFn: authApi.signin,
    onSuccess: (data) => {
      setUser({
        ...data.user,
        depositWalletAddresses: data.user.depositWalletAddresses,
      })
      setIsAuthenticated(true)
      toast.success('Welcome back!')
      onOpenChange(false)
      signinForm.reset()
    },
    onError: () => {
      // Error handling is done by axios interceptor
      // recaptchaRef.current?.reset()
    },
  })

  const onSignupSubmit = async (data: SignupFormData) => {
    // const recaptchaToken = recaptchaRef.current?.getValue()
    // if (!recaptchaToken) {
    //   toast.error('Please complete the reCAPTCHA')
    //   return
    // }

    const signupData: SignupData = {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password,
    }

    signupMutation.mutate(signupData)
  }

  const onSigninSubmit = async (data: SigninFormData) => {
    // const recaptchaToken = recaptchaRef.current?.getValue()
    // if (!recaptchaToken) {
    //   toast.error('Please complete the reCAPTCHA')
    //   return
    // }

    const signinData: SigninData = {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password,
    }

    signinMutation.mutate(signinData)
  }

  const isLoading = signupMutation.isPending || signinMutation.isPending

  const { loginWithOAuth, loading: oauthLoading } = useOAuth()

  const handleOAuthLogin = async (provider: 'google' | 'twitter' | 'x') => {
    try {
      const result = await loginWithOAuth(provider)

      // Update user state directly from OAuth response
      // The cookie is already set by the backend, so we have all the data we need
      setUser({
        id: result.user.id,
        username: result.user.username,
        email: result.user.email,
        emailVerified: result.user.emailVerified,
        createdAt:
          result.user.createdAt instanceof Date
            ? result.user.createdAt
            : new Date(result.user.createdAt),
        lastLogin: result.user.lastLogin
          ? result.user.lastLogin instanceof Date
            ? result.user.lastLogin
            : new Date(result.user.lastLogin)
          : undefined,
        depositWalletAddresses: result.user.depositWalletAddresses,
      })
      setIsAuthenticated(true)

      // REMOVED: Don't call checkAuth immediately
      // The cookie is set, so it will work for subsequent API calls
      // You can call checkAuth later if needed (e.g., on next page navigation)

      toast.success(
        result.isNewConnection
          ? `Successfully signed up with ${provider}!`
          : `Successfully signed in with ${provider}!`
      )

      // Close modal on success
      onOpenChange(false)
    } catch (error) {
      console.error(`${provider} login failed:`, error)
      // Error toast is handled by the hook or axios interceptor
    }
  }

  return (
    <>
      <RequestPasswordResetDialog
        open={showPasswordResetDialog}
        onOpenChange={setShowPasswordResetDialog}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="w-full m-0 lg:min-w-4xl sm:mx-4 p-0 bg-neutral-900 border-neutral-400 overflow-hidden rounded-2xl"
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogTitle className="sr-only">Authentication</DialogTitle>
          <div className="flex h-[600px] max-h-[90vh]">
            {/* Left side - Form */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 h-full">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full h-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 bg-neutral-800 mb-6">
                      <TabsTrigger value="signin">SIGN IN</TabsTrigger>
                      <TabsTrigger value="signup">REGISTER</TabsTrigger>
                    </TabsList>

                    <TabsContent
                      value="signup"
                      className="mt-0 space-y-4 data-[state=active]:flex data-[state=active]:flex-col"
                    >
                      <form
                        onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                        className="space-y-4 flex-1 mb-8"
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor="signup-username-email"
                            className="text-white"
                          >
                            Username or Email*
                          </Label>
                          <Input
                            id="signup-username-email"
                            type="text"
                            {...signupForm.register('usernameOrEmail')}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                            placeholder="Enter username or email"
                          />
                          {signupForm.formState.errors.usernameOrEmail && (
                            <p className="text-red-400 text-sm mt-1">
                              {
                                signupForm.formState.errors.usernameOrEmail
                                  .message
                              }
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-white">
                            Password*
                          </Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showSignupPassword ? 'text' : 'password'}
                              {...signupForm.register('password')}
                              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                              placeholder="Enter password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowSignupPassword(!showSignupPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              aria-label={
                                showSignupPassword
                                  ? 'Hide password'
                                  : 'Show password'
                              }
                            >
                              {showSignupPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          {(() => {
                            const password = signupForm.watch('password')
                            const conditions = checkPasswordConditions(
                              password || ''
                            )
                            const hasErrors =
                              signupForm.formState.errors.password
                            const showConditions =
                              password && password.length > 0

                            if (!showConditions && !hasErrors) return null

                            return (
                              <div className="mt-2 flex items-center gap-2">
                                {[
                                  {
                                    key: 'minLength',
                                    label: 'Min 8 Characters',
                                    met: conditions.minLength,
                                  },
                                  {
                                    key: 'hasLowercase',
                                    label: '1 Lowercase',
                                    met: conditions.hasLowercase,
                                  },
                                  {
                                    key: 'hasUppercase',
                                    label: '1 Uppercase',
                                    met: conditions.hasUppercase,
                                  },
                                  {
                                    key: 'hasNumber',
                                    label: '1 Number',
                                    met: conditions.hasNumber,
                                  },
                                ].map((condition) => (
                                  <div
                                    key={condition.key}
                                    className="flex items-center gap-1"
                                  >
                                    <div
                                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                        condition.met
                                          ? 'bg-green-500'
                                          : 'bg-red-500'
                                      }`}
                                    >
                                      {condition.met ? (
                                        <Check className="w-2.5 h-2.5 text-white" />
                                      ) : (
                                        <XIcon className="w-2 h-2 text-white" />
                                      )}
                                    </div>
                                    <span
                                      className={`text-[11px] font-bold ${
                                        condition.met
                                          ? 'text-green-400'
                                          : 'text-red-400'
                                      }`}
                                    >
                                      {condition.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )
                          })()}
                        </div>

                        <div className="space-y-3 pt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="age"
                              className="border-gray-500"
                              checked={signupForm.watch('acceptAge')}
                              onCheckedChange={(checked) =>
                                signupForm.setValue(
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
                              {signupForm.formState.errors.acceptAge && (
                                <p className="text-red-400 text-sm">
                                  {
                                    signupForm.formState.errors.acceptAge
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
                              checked={signupForm.watch('acceptTerms')}
                              onCheckedChange={(checked) =>
                                signupForm.setValue(
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
                              {signupForm.formState.errors.acceptTerms && (
                                <p className="text-red-400 text-sm">
                                  {
                                    signupForm.formState.errors.acceptTerms
                                      .message
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-[#171717] inline-block p-[1px] rounded-md overflow-hidden">
                            {/* <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={
                                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
                              }
                              theme="dark"
                            /> */}
                          </div>

                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-semibold py-3"
                          >
                            {isLoading
                              ? 'CREATING ACCOUNT...'
                              : 'CREATE ACCOUNT'}
                          </Button>

                          <div className="flex items-center gap-4 my-4 mb-6">
                            <div className="flex-1 h-px bg-gray-600"></div>
                            <span className="text-gray-400 text-sm">OR</span>
                            <div className="flex-1 h-px bg-gray-600"></div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleOAuthLogin('google')}
                              disabled={oauthLoading || isLoading}
                              className="w-full border-gray-600 hover:bg-gray-700 flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <GoogleIcon className="w-5 h-5" />
                              <span>Google</span>
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleOAuthLogin('twitter')}
                              disabled={oauthLoading || isLoading}
                              className="w-full border-gray-600 hover:bg-gray-700 flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <TwitterIcon className="w-5 h-5" />
                              <span>X</span>
                            </Button>
                          </div>
                        </div>
                      </form>
                    </TabsContent>

                    <TabsContent
                      value="signin"
                      className="mt-0 space-y-4 data-[state=active]:flex data-[state=active]:flex-col"
                    >
                      <form
                        onSubmit={signinForm.handleSubmit(onSigninSubmit)}
                        className="space-y-4 flex-1 mb-8"
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor="signin-username-email"
                            className="text-white"
                          >
                            Username or Email*
                          </Label>
                          <Input
                            id="signin-username-email"
                            type="text"
                            {...signinForm.register('usernameOrEmail')}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                            placeholder="Enter username or email"
                          />
                          {signinForm.formState.errors.usernameOrEmail && (
                            <p className="text-red-400 text-sm mt-1">
                              {
                                signinForm.formState.errors.usernameOrEmail
                                  .message
                              }
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="signin-password"
                            className="text-white"
                          >
                            Password*
                          </Label>
                          <div className="relative">
                            <Input
                              id="signin-password"
                              type={showSigninPassword ? 'text' : 'password'}
                              {...signinForm.register('password')}
                              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                              placeholder="Enter password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowSigninPassword(!showSigninPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              aria-label={
                                showSigninPassword
                                  ? 'Hide password'
                                  : 'Show password'
                              }
                            >
                              {showSigninPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          {signinForm.formState.errors.password && (
                            <p className="text-red-400 text-sm mt-1">
                              {signinForm.formState.errors.password.message}
                            </p>
                          )}
                          <div className="w-full flex justify-end">
                            <div
                              className="w-max text-sm text-gray-400 hover:text-white cursor-pointer transition-colors"
                              onClick={() => setShowPasswordResetDialog(true)}
                            >
                              Forgot Password?
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-[#171717] inline-block p-[1px] rounded-md overflow-hidden">
                            {/* <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={
                                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
                              }
                              theme="dark"
                            /> */}
                          </div>

                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-semibold py-3 cursor-pointer"
                          >
                            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                          </Button>

                          <div className="flex items-center gap-4 my-4 mb-6">
                            <div className="flex-1 h-px bg-gray-600"></div>
                            <span className="text-gray-400 text-sm">OR</span>
                            <div className="flex-1 h-px bg-gray-600"></div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleOAuthLogin('google')}
                              disabled={oauthLoading || isLoading}
                              className="w-full border-gray-600 hover:bg-gray-700 flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <GoogleIcon className="w-5 h-5" />
                              <span>Google</span>
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleOAuthLogin('twitter')}
                              disabled={oauthLoading || isLoading}
                              className="w-full border-gray-600 hover:bg-gray-700 flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <TwitterIcon className="w-5 h-5" />
                              <span>X</span>
                            </Button>
                          </div>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Right side - Image Carousel */}
            <div className="flex-1 relative min-w-0 hidden lg:flex border-l border-neutral-800 flex-col items-center justify-center">
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
              <CarouselWithAutoplay />
              {/* <div className="text-white mt-4 text-center">
                <div className="text-lg font-semibold">
                  From the Streets to the Jet.
                </div>
                <div className="text-lg font-semibold">Let&apos;s go dawg</div>
              </div> */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
