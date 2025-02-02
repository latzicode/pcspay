import Hero from '@/components/sections/Hero'
import CountryBanner from '@/components/sections/CountryBanner'
import Story from '@/components/sections/Story'
import Fonctionnement from '@/components/sections/Fonctionnement'
import Features from '@/components/sections/Features'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Initiatives from '@/components/sections/Initiatives'

export default function Home() {
  return (
    <>
      <Hero />
      <CountryBanner />
      <Story />
      <Initiatives />
      <Fonctionnement />
      <Features />
      <Services />
      <Testimonials />
      {/* FAQ à venir */}
    </>
  )
}
