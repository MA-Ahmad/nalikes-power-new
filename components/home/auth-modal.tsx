'use client'

import { X, Check, X as XIcon, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
// import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-hot-toast'
// @ts-ignore
import { useForm } from 'react-hook-form'
// @ts-ignore
import { zodResolver } from '@hookform/resolvers/zod' // @ts-ignore
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
import { AnimatedCheckbox } from './animated-checkbox'
import { ArrowIcon } from '../icons'
import { cn } from '@/lib/utils'

// Cache duration: 48 hours in milliseconds
const CACHE_DURATION = 48 * 60 * 60 * 1000 // 172800000 ms

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
      fill="currentColor"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="currentColor"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="currentColor"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="currentColor"
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
  // Optimized with 48-hour cache duration
  const {
    data: images = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['media-images', 'AUTH'],
    queryFn: () => authApi.getMediaImages('AUTH'),
    staleTime: CACHE_DURATION, // Data stays fresh for 48 hours
    gcTime: CACHE_DURATION, // Keep in cache for 48 hours (React Query v5)
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on mount if data is fresh
    refetchOnReconnect: false, // Don't refetch on reconnect if data is fresh
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

  // Memoize filtered and sorted images to avoid unnecessary recalculations
  const sortedImages = useMemo(() => {
    // Filter images by type 'AUTH' (client-side filtering as backup)
    const filteredImages = images.filter(
      (img: any) => img.type?.toUpperCase() === 'AUTH' || !img.type // Include if type is AUTH or undefined (for backward compatibility)
    )

    const displayImages =
      filteredImages.length > 0 ? filteredImages : fallbackImages

    // Sort by orderIndex - API already sorts, but we do it here as well for consistency
    return [...displayImages].sort((a, b) => {
      return a.orderIndex - b.orderIndex
    })
  }, [images])

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
                height={1080}
                quality={95}
                sizes="(max-width: 768px) 100vw, 50vw"
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
  username: z
    .string()
    .min(1, 'Username is required')
    .refine(
      (val) => {
        return (
          /^[a-zA-Z0-9_]+$/.test(val) && val.length >= 3 && val.length <= 20
        )
      },
      {
        message:
          'Username must be 3-20 characters and can only contain letters, numbers, and underscores',
      }
    ),
  email: z.string().email('Invalid email address'),
  // usernameOrEmail: z
  //   .string()
  //   .min(1, 'Username or email is required')
  //   .refine(
  //     (val) => {
  //       // Check if it's a valid email or username
  //       const isEmail = z.string().email().safeParse(val).success
  //       const isUsername =
  //         /^[a-zA-Z0-9_]+$/.test(val) && val.length >= 3 && val.length <= 20
  //       return isEmail || isUsername
  //     },
  //     {
  //       message:
  //         'Please enter a valid username (3-20 chars, letters/numbers/underscores) or email address',
  //     }
  //   ),
  password: passwordSchema,
  referralCode: z.string().optional(),
  acceptConditions: z.boolean().refine((val) => val === true, {
    message:
      'You must acknowledge that you are over the age of 18 and agree to the Terms and Condition',
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
  const [showReferralCode, setShowReferralCode] = useState(false)
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
      username: '',
      email: '',
      password: '',
      referralCode: '',
      acceptConditions: false,
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
      setShowReferralCode(false)
      // recaptchaRef.current?.reset()
    }
  }, [open, signupForm, signinForm])

  // Reset forms when switching tabs
  useEffect(() => {
    signupForm.reset()
    signinForm.reset()
    setShowSignupPassword(false)
    setShowSigninPassword(false)
    setShowReferralCode(false)
    // recaptchaRef.current?.reset()
  }, [activeTab, signupForm, signinForm])

  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data: any) => {
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
    onSuccess: (data: any) => {
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
      username: data.username,
      email: data.email,
      password: data.password,
      ...(data.referralCode &&
        data.referralCode.trim() !== '' && {
          referralCode: data.referralCode.trim(),
        }),
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
        profileCompleted: result.user.profileCompleted,
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
          className="w-full m-0 lg:min-w-4xl sm:mx-4 p-0 bg-[linear-gradient(to_bottom,#11042F_0%,#04010E_100%)] !border-[0] !ring-[0] overflow-hidden rounded-2xl z-[5555]"
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogTitle className="sr-only">Authentication</DialogTitle>
          <div className="flex h-[90%] sm:h-[700px] max-h-[90vh]">
            {/* Left side - Image Carousel */}
            <div className="flex-1 relative min-w-0 hidden lg:flex flex-col items-center justify-center">
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 z-10 text-gray-300 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <Image
                src="/logo.svg"
                alt="Powerblocks"
                width={33}
                height={42}
                className="w-32 absolute top-4 left-4"
              />
              {/* <CarouselWithAutoplay /> */}
              <div className="w-full h-full overflow-hidden">
                <Image
                  src="/images/auth-banner.webp"
                  alt="Powerblocks Auth Banner"
                  width={1920}
                  height={1080}
                  quality={95}
                  // className="w-full h-full max-w-full max-h-full object-cover"
                  priority={true}
                />
              </div>
              <div className="mt-4 text-center absolute bottom-4 left-0 right-0 max-w-[80%] mx-auto">
                <div className="text-xs text-[#ffffff]/80 mx-auto">
                  By accessing the site, I attest that I am at least 18 years
                  old and have read the Terms and Conditions
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 flex flex-col min-h-0">
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-2 right-2 z-10 text-gray-300 hover:text-white block sm:hidden"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex-1 overflow-y-auto">
                <div className="flex items-center justify-between flex-col space-y-4 sm:space-y-10 w-full p-6">
                  <h3 className="text-white text-2xl font-bold">
                    {activeTab === 'signup' ? 'REGISTER' : 'LOGIN'}
                  </h3>

                  {activeTab === 'signup' ? (
                    <form
                      onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                      className="space-y-4 flex-1 mb-8 w-full"
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="username"
                          className="text-[#ffffff]/60 gap-[1px]"
                        >
                          Username<span className="text-[#DB0A0A]">*</span>
                        </Label>
                        <Input
                          id="username"
                          type="text"
                          {...signupForm.register('username')}
                          className="!bg-transparent border-[#2E263F] h-10 text-white placeholder:text-gray-400 !outline-none focus-visible:ring-[0] focus-visible:border-[2px] focus-visible:border-[#342c44]"
                          placeholder="Enter username"
                        />
                        {signupForm.formState.errors.username && (
                          <p className="text-red-400 text-sm mt-1">
                            {signupForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-[#ffffff]/60 gap-[1px]"
                        >
                          Email<span className="text-[#DB0A0A]">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="text"
                          {...signupForm.register('email')}
                          className="!bg-transparent border-[#2E263F] h-10 text-white placeholder:text-gray-400 !outline-none focus-visible:ring-[0] focus-visible:border-[2px] focus-visible:border-[#342c44]"
                          placeholder="Enter email"
                        />
                        {signupForm.formState.errors.email && (
                          <p className="text-red-400 text-sm mt-1">
                            {signupForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-[#ffffff]/60 gap-[1px]"
                        >
                          Password<span className="text-[#DB0A0A]">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showSignupPassword ? 'text' : 'password'}
                            {...signupForm.register('password')}
                            className="!bg-transparent h-10 border-[#2E263F] text-white placeholder:text-gray-400 pr-10 !outline-none focus-visible:ring-[0] focus-visible:border-[2px] focus-visible:border-[#342c44]"
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
                          const hasErrors = signupForm.formState.errors.password
                          const showConditions = password && password.length > 0

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
                                    className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                      condition.met
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                    }`}
                                  >
                                    {condition.met ? (
                                      <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                                    ) : (
                                      <XIcon className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 text-white" />
                                    )}
                                  </div>
                                  <span
                                    className={`text-[9px] sm:text-[11px] font-bold ${
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
                        <div
                          className="flex items-center justify-between gap-4 cursor-pointer"
                          onClick={() => setShowReferralCode(!showReferralCode)}
                        >
                          <p className="text-[#ffffff]/60 text-sm">
                            Referral code (optional)
                          </p>
                          <div className="flex-1 h-px bg-[#515151]"></div>
                          <ArrowIcon
                            className={cn(
                              'w-4 h-4 text-[#8E8E8E] rotate-360 transition-transform duration-300',
                              showReferralCode ? 'rotate-180' : ''
                            )}
                            stroke="#8E8E8E"
                          />
                        </div>
                        {showReferralCode && (
                          <div className="space-y-2">
                            <Input
                              id="referral-code"
                              type="text"
                              {...signupForm.register('referralCode')}
                              className="!bg-transparent h-10 border-[#2E263F] text-white placeholder:text-gray-400 pr-10 !outline-none focus-visible:ring-[0] focus-visible:border-[2px] focus-visible:border-[#342c44]"
                              placeholder="Enter referral code"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-start space-x-3">
                        <AnimatedCheckbox
                          checked={signupForm.watch('acceptConditions')}
                          onChange={async (checked) => {
                            signupForm.setValue('acceptConditions', checked, {
                              shouldValidate: true,
                              shouldDirty: true,
                            })
                            // Trigger validation to clear error immediately
                            await signupForm.trigger('acceptConditions')
                          }}
                          className="flex-shrink-0 cursor-pointer"
                        />
                        <div className="space-y-1 flex-1">
                          <Label
                            htmlFor="age"
                            className="text-sm text-[#ffffff]/60 cursor-pointer"
                            onClick={async () => {
                              const currentValue =
                                signupForm.watch('acceptConditions')
                              signupForm.setValue(
                                'acceptConditions',
                                !currentValue,
                                {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                }
                              )
                              // Trigger validation to clear error immediately
                              await signupForm.trigger('acceptConditions')
                            }}
                          >
                            I acknowledge that I am over the age of 18 and agree
                            to the Terms and Condition
                          </Label>
                          {signupForm.formState.errors.acceptConditions && (
                            <p className="text-red-400 text-sm">
                              {
                                signupForm.formState.errors.acceptConditions
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full border border-[#6F6BFF] text-white font-semibold py-3 h-10 purple-glow-btn text-brand-purple hover:text-white hover:scale-101 active:scale-98 transition-all duration-300 cursor-pointer"
                        >
                          {isLoading ? 'Signing up...' : 'Sign up'}
                        </Button>

                        <div className="flex items-center gap-4 my-4 mb-6">
                          <div className="flex-1 h-px bg-[#515151]"></div>
                          <span className="text-[#8E8E8E] text-sm">OR</span>
                          <div className="flex-1 h-px bg-[#515151]"></div>
                        </div>

                        <div className="flex gap-2 items-center justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOAuthLogin('google')}
                            disabled={oauthLoading || isLoading}
                            className="w-full border !border-[#6F6BFF]/60 text-brand-purple hover:border-[#6F6BFF] bg-gradient-to-b from-[#6F6BFF]/20 to-[#6F6BFF]/10 flex items-center justify-center gap-2 cursor-pointer w-[5.5rem] transition-all duration-300 hover:translate-y-[-1px]"
                          >
                            <GoogleIcon className="w-5 h-5" />
                            {/* <span>Google</span> */}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOAuthLogin('twitter')}
                            disabled={oauthLoading || isLoading}
                            className="w-full border !border-[#6F6BFF]/60 text-brand-purple hover:border-[#6F6BFF] bg-gradient-to-b from-[#6F6BFF]/20 to-[#6F6BFF]/10 flex items-center justify-center gap-2 cursor-pointer w-[5.5rem] transition-all duration-300 hover:translate-y-[-1px]"
                          >
                            <TwitterIcon className="w-5 h-5" />
                            {/* <span>X</span> */}
                          </Button>
                        </div>

                        <div className="text-sm text-center flex items-center justify-center gap-1 mt-4">
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setActiveTab('signin')}
                            className="text-brand-pink hover:text-white cursor-pointer"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <form
                      onSubmit={signinForm.handleSubmit(onSigninSubmit)}
                      className="space-y-4 flex-1 mb-8 w-full"
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="signin-username-email"
                          className="text-[#ffffff]/60 gap-[1px]"
                        >
                          Username or Email
                        </Label>
                        <Input
                          id="signin-username-email"
                          type="text"
                          {...signinForm.register('usernameOrEmail')}
                          className="!bg-transparent border-[#2E263F] h-10 text-white placeholder:text-gray-400 !outline-none focus-visible:ring-[0] focus-visible:border-[2px] focus-visible:border-[#342c44]"
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
                          className="text-[#ffffff]/60 gap-[1px]"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="signin-password"
                            type={showSigninPassword ? 'text' : 'password'}
                            {...signinForm.register('password')}
                            className="!bg-transparent h-10 border-[#2E263F] text-white placeholder:text-gray-400 pr-10 !outline-none focus-visible:ring-[0] focus-visible:border-[2px] focus-visible:border-[#342c44]"
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
                          <button
                            type="button"
                            onClick={() => setShowPasswordResetDialog(true)}
                            className="w-max text-sm text-[#8E8E8E] hover:text-white cursor-pointer transition-colors"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full border border-[#6F6BFF] text-white font-semibold py-3 h-10 purple-glow-btn text-brand-purple hover:text-white hover:scale-101 active:scale-98 transition-all duration-300 cursor-pointer"
                        >
                          {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>

                        <div className="flex items-center gap-4 my-4 mb-6">
                          <div className="flex-1 h-px bg-[#515151]"></div>
                          <span className="text-[#8E8E8E] text-sm">OR</span>
                          <div className="flex-1 h-px bg-[#515151]"></div>
                        </div>

                        <div className="flex gap-2 items-center justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOAuthLogin('google')}
                            disabled={oauthLoading || isLoading}
                            className="w-full border !border-[#6F6BFF]/60 text-brand-purple hover:border-[#6F6BFF] bg-gradient-to-b from-[#6F6BFF]/20 to-[#6F6BFF]/10 flex items-center justify-center gap-2 cursor-pointer w-[5.5rem] transition-all duration-300 hover:translate-y-[-1px]"
                          >
                            <GoogleIcon className="w-5 h-5" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOAuthLogin('twitter')}
                            disabled={oauthLoading || isLoading}
                            className="w-full border !border-[#6F6BFF]/60 text-brand-purple hover:border-[#6F6BFF] bg-gradient-to-b from-[#6F6BFF]/20 to-[#6F6BFF]/10 flex items-center justify-center gap-2 cursor-pointer w-[5.5rem] transition-all duration-300 hover:translate-y-[-1px]"
                          >
                            <TwitterIcon className="w-5 h-5" />
                          </Button>
                        </div>

                        <div className="text-sm text-center flex items-center justify-center gap-1 mt-4">
                          Don&apos;t have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setActiveTab('signup')}
                            className="text-brand-pink hover:text-white cursor-pointer"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
