'use client'

import { X } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full lg:min-w-4xl mx-4 p-0 bg-neutral-900 border-neutral-400 overflow-hidden rounded-2xl"
        showCloseButton={false}
      >
        <div className="flex h-[600px] max-h-[90vh]">
          {/* Left side - Form */}
          <div className="flex-1 p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="w-full">
                <Tabs defaultValue="signup" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-neutral-800">
                    <TabsTrigger value="login">LOGIN</TabsTrigger>
                    <TabsTrigger value="signup">CREATE ACCOUNT</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signup" className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white">
                        Username
                      </Label>
                      <Input
                        id="username"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        placeholder="Enter email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        placeholder="Enter password"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="age" className="border-gray-500" />
                        <Label htmlFor="age" className="text-sm text-gray-300">
                          I confirm Im above 18 years old.
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" className="border-gray-500" />
                        <Label
                          htmlFor="terms"
                          className="text-sm text-gray-300"
                        >
                          I agree to the terms & Conditions.
                        </Label>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="bg-gray-200 p-3 rounded mb-4">
                        <div className="text-sm text-gray-700">
                          <strong>Bot Captcha</strong>
                          <div className="text-xs mt-1">
                            Apple, Google sign up
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-semibold py-3">
                        SIGN UP
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="login" className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        placeholder="Enter email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-white">
                        Password
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        placeholder="Enter password"
                      />
                    </div>

                    <div className="pt-6">
                      <Button className="w-full bg-[linear-gradient(to_right,_#6A2A97_0%,_#C753FD_53%,_#FA96FF_100%)] text-white font-semibold py-3">
                        SIGN IN
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          {/* <div className="flex-1 relative min-w-0 hidden lg:flex border-l border-neutral-800">
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="absolute top-8 left-8 z-10">
              <h2 className="text-white text-2xl font-bold tracking-wider">
                POWERBLOCKS
              </h2>
            </div>

            <div className="absolute inset-0">
              <Image
                src="/images/modal-hero2.png"
                alt="Powerblocks Hero"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            <div className="absolute bottom-8 left-8 z-10 max-w-[80%]">
              <div className="text-white">
                <div className="text-lg font-semibold">
                  From the Streets to the Jet.
                </div>
                <div className="text-lg font-semibold">Lets go dawg</div>
              </div>
            </div>
          </div> */}

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
              <div className="text-lg font-semibold">Lets go dawg</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
