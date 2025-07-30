'use client'

import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import banner from '@/public/images/banner.svg'
import { Gamepad2, Search, Wallet } from 'lucide-react'
import LoginBox from '@/components/login-box'
import CarouselSection from '@/components/carousel-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <nav className="px-6 py-4 fixed top-0 left-0 right-0 z-50">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search anything"
                  className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-white hover:text-gray-300 hover:bg-gray-800 font-medium"
              >
                Login
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </nav> */}

        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-hidden">
          <Image src={banner} alt="Banner" className="w-full h-auto" />
          <div className="grid grid-cols-2 gap-4 h-[22rem]">
            <LoginBox />
            <CarouselSection />
          </div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6" />
            <h5 className="text-2xl font-bold">PWR Originals</h5>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div
              className="p-[1px] rounded-[11px]"
              style={{
                background: 'linear-gradient(180deg, #8E8E8E 0%, #282828 100%)',
                boxShadow: '0 0 20px rgba(128, 128, 128, 0.35)',
              }}
            >
              <div
                className="aspect-[4/3] rounded-[11px] bg-cover bg-center relative"
                style={{
                  backgroundImage: "url('/images/pwr/1.svg')",
                }}
              >
                <div className="flex flex-col gap-2 h-full flex-end justify-end absolute bottom-0 left-0 right-0 p-4 z-50">
                  <h2>Midnight in Arizona</h2>
                  <div className="flex justify-between">
                    <p>Solana Blockchain</p>
                    <p>Book a Table</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-[1px] rounded-[11px]"
              style={{
                background: 'linear-gradient(180deg, #8E8E8E 0%, #282828 100%)',
                boxShadow: '0 0 20px rgba(128, 128, 128, 0.35)',
              }}
            >
              <div
                className="aspect-[4/3] rounded-[11px] bg-cover bg-center relative"
                style={{ backgroundImage: "url('/images/pwr/2.svg')" }}
              >
                <div className="flex flex-col gap-2 h-full flex-end justify-end absolute bottom-0 left-0 right-0 p-4 z-50">
                  <h2>Midnight in Arizona</h2>
                  <div className="flex justify-between">
                    <p>Solana Blockchain</p>
                    <p>Book a Table</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-[1px] rounded-[11px]"
              style={{
                background: 'linear-gradient(180deg, #8E8E8E 0%, #282828 100%)',
                boxShadow: '0 0 20px rgba(128, 128, 128, 0.35)',
              }}
            >
              <div
                className="aspect-[4/3] rounded-[11px] bg-cover bg-center relative"
                style={{ backgroundImage: "url('/images/pwr/3.svg')" }}
              >
                <div className="flex flex-col gap-2 h-full flex-end justify-end absolute bottom-0 left-0 right-0 p-4 z-50">
                  <h2>Midnight in Arizona</h2>
                  <div className="flex justify-between">
                    <p>Solana Blockchain</p>
                    <p>Book a Table</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
