import Hero from '@/components/Hero'
import ErrorsSection from '@/components/ErrorsSection'
import PlatformSection from '@/components/PlatformSection'
import StackedPin from '@/components/StackedPin'
import IntegrationCarousel from '@/components/sections/IntegrationCarousel'
import RewardsSection from '@/components/sections/RewardsSection'
import FAQSection from '@/components/sections/FAQSection'
import Footer from '@/components/Footer'

export default function Home() {
  const stackedPanels = [
    { id: 'panel-1' },
    { id: 'panel-2' },
    { id: 'panel-3' },
    { id: 'panel-4' },
    { id: 'panel-5' }
  ]

  return (
    <main>
      <Hero />
      <ErrorsSection /> 
      <PlatformSection /> 
      <StackedPin 
        panels={stackedPanels}
        sectionId="features"
        enterOffsetPx={30}
      />
      <IntegrationCarousel />
      <RewardsSection />
      <FAQSection />
      <Footer />
    </main>
  )
}