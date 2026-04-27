"use client";

import Navbar from './Navbar'
import Banner from './Banner'
import HowItWorks from './HowItWorks'
import PromoteCategories from './PromoteCategories'

import CallToAction from './CallToAction'
import Footer from './Footer'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import LoadingFallback from '@/components/ui/LoadingFallback'
import { ScrollAnimation } from '@/components/ui/ScrollAnimation'

function Home() {
  const { isLoading } = useAuthRedirect();

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <div>
      <Navbar />
      <ScrollAnimation>
        <Banner />
      </ScrollAnimation>
      <ScrollAnimation>
        <HowItWorks />
      </ScrollAnimation>
      <ScrollAnimation>
        <PromoteCategories />
      </ScrollAnimation>
      <ScrollAnimation>
        <CallToAction />
      </ScrollAnimation>
        <Footer />
    </div>
  )
}

export default Home
