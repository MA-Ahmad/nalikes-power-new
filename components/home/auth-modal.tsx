'use client'

import { X } from 'lucide-react'
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

import { authApi, SendCodeData } from '@/lib/auth-api'
import { VerificationModal } from './verification-modal'

function CarouselWithAutoplay() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, playOnInit: true })
  )

  // Fetch images from backend
  const {
    data: images = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['auth-modal-images'],
    queryFn: authApi.getAuthModalImages,
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

  const displayImages = images.length > 0 ? images : fallbackImages

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
      className="w-full max-w-sm"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
        align: 'start',
      }}
    >
      <CarouselContent>
        {sortedImages.map((image, index) => (
          <CarouselItem key={image.id || index}>
            <div className="flex items-center justify-center">
              <Image
                src={image.image}
                alt={image.title || image.description || 'Powerblocks Hero'}
                width={300}
                height={400}
                className="object-cover rounded-md"
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

// Validation schemas
const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: z.string().email('Please enter a valid email address'),
  acceptAge: z.boolean().refine((val) => val === true, {
    message: 'You must confirm you are above 18 years old',
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type SignupFormData = z.infer<typeof signupSchema>
type SigninFormData = z.infer<typeof signinSchema>

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState('signup')
  const [verificationModalOpen, setVerificationModalOpen] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState('')
  const [verificationType, setVerificationType] = useState<'signup' | 'signin'>(
    'signup'
  )

  // const recaptchaRef = useRef<ReCAPTCHA>(null)

  // Signup form
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      acceptAge: false,
      acceptTerms: false,
    },
  })

  // Signin form
  const signinForm = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
    },
  })

  // Reset forms when modal opens/closes
  useEffect(() => {
    if (!open) {
      signupForm.reset()
      signinForm.reset()
      // recaptchaRef.current?.reset()
    }
  }, [open, signupForm, signinForm])

  // Reset forms when switching tabs
  useEffect(() => {
    signupForm.reset()
    signinForm.reset()
    // recaptchaRef.current?.reset()
  }, [activeTab, signupForm, signinForm])

  const sendCodeMutation = useMutation({
    mutationFn: authApi.sendCode,
    onSuccess: (data, variables) => {
      toast.success(data.message)
      setVerificationEmail(variables.email)
      setVerificationType(variables.type)
      setVerificationModalOpen(true)
      onOpenChange(false)
    },
    onError: () => {
      // recaptchaRef.current?.reset()
    },
  })

  const onSignupSubmit = async (data: SignupFormData) => {
    // const recaptchaToken = recaptchaRef.current?.getValue()
    // if (!recaptchaToken) {
    //   toast.error('Please complete the reCAPTCHA')
    //   return
    // }

    const sendCodeData: SendCodeData = {
      username: data.username,
      email: data.email,
      // recaptchaToken,
      type: 'signup',
    }

    sendCodeMutation.mutate(sendCodeData)
  }

  const onSigninSubmit = async (data: SigninFormData) => {
    // const recaptchaToken = recaptchaRef.current?.getValue()
    // if (!recaptchaToken) {
    //   toast.error('Please complete the reCAPTCHA')
    //   return
    // }

    const sendCodeData: SendCodeData = {
      email: data.email,
      // recaptchaToken,
      type: 'signin',
    }

    sendCodeMutation.mutate(sendCodeData)
  }

  const handleResendCode = () => {
    // const recaptchaToken = recaptchaRef.current?.getValue()
    // if (!recaptchaToken) {
    //   toast.error('Please complete the reCAPTCHA')
    //   return
    // }

    const sendCodeData: SendCodeData = {
      ...(verificationType === 'signup' && {
        username: signupForm.getValues('username'),
      }),
      email: verificationEmail,
      // recaptchaToken,
      type: verificationType,
    }

    sendCodeMutation.mutate(sendCodeData)
  }

  const isLoading = sendCodeMutation.isPending

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="w-full lg:min-w-4xl sm:mx-4 p-0 bg-neutral-900 border-neutral-400 overflow-hidden rounded-2xl"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Authentication</DialogTitle>
          <div className="flex sm:h-[600px] max-h-[90vh]">
            {/* Left side - Form */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto">
                <div className="p-8 h-full">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full h-full"
                  >
                    <TabsList className="grid w-full grid-cols-1 bg-neutral-800 mb-6">
                      <TabsTrigger value="signin">SIGN IN</TabsTrigger>
                      {/* <TabsTrigger value="signup">CREATE ACCOUNT</TabsTrigger> */}
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
                          <Label htmlFor="username" className="text-white">
                            Username*
                          </Label>
                          <Input
                            id="username"
                            {...signupForm.register('username')}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                            placeholder="Enter username"
                          />
                          {signupForm.formState.errors.username && (
                            <p className="text-red-400 text-sm mt-1">
                              {signupForm.formState.errors.username.message}
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
                            {...signupForm.register('email')}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                            placeholder="Enter email"
                          />
                          {signupForm.formState.errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                              {signupForm.formState.errors.email.message}
                            </p>
                          )}
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

                        <div className="space-y-4">
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
                            {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
                          </Button>
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
                          <Label htmlFor="signin-email" className="text-white">
                            Email*
                          </Label>
                          <Input
                            id="signin-email"
                            type="email"
                            {...signinForm.register('email')}
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                            placeholder="Enter email"
                          />
                          {signinForm.formState.errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                              {signinForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-4">
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
                            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Right side - Image Carousel */}
            <div className="flex-1 relative min-w-0 hidden lg:flex border-l border-neutral-800 flex-col items-center justify-center p-8">
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

      <VerificationModal
        open={verificationModalOpen}
        onOpenChange={setVerificationModalOpen}
        email={verificationEmail}
        type={verificationType}
        onResendCode={handleResendCode}
      />
    </>
  )
}
