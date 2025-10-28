import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-black">
      <Image
        src="/cover-new.svg"
        alt="Cover image"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
