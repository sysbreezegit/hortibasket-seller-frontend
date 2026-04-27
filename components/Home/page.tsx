import React from 'react'
import Hero from './components/Hero'
import Howitwork from './components/Howitwork'
import PromoteCategories from './components/promoted-categories'
import CommissionStructure from './components/commision-structure'
import ReadyToEarn from './components/ready-to-earn'
import Testimonials from './components/Testimonial'

const Home = () => {
  return (
    <>
      <Hero />
      <Howitwork />
      <PromoteCategories />
      <CommissionStructure />
      <Testimonials />
      <ReadyToEarn />
    </>
  )
}

export default Home
