"use client";

import { UserPlus, Link2, Share2, Wallet } from 'lucide-react'

function HowItWorks() {
  const scrollToSignup = () => {
    const element = document.getElementById('start-earning');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      number: '01.',
      icon: UserPlus,
      iconColor: 'bg-purple-500/20 text-purple-400',
      title: 'Sign Up For Free',
      description: 'Create your affiliate account in minutes. No fees, no commitments. Get instant access to your dashboard and marketing materials.'
    },
    {
      number: '02.',
      icon: Link2,
      iconColor: 'bg-blue-500/20 text-blue-400',
      title: 'Get Your Unique Links',
      description: 'Access thousands of products and get custom tracking links. Share products that match your audience\'s interests.'
    },
    {
      number: '03.',
      icon: Share2,
      iconColor: 'bg-orange-500/20 text-orange-400',
      title: 'Promote & Share',
      description: 'Share your links on your blog, social media, YouTube, or email. We provide banners, product feeds, and promotional content.'
    },
    {
      number: '04.',
      icon: Wallet,
      iconColor: 'bg-green-500/20 text-green-400',
      title: 'Earn Commissions',
      description: 'Earn up to 30% commission on every sale. Track your earnings in real-time and get paid monthly via bank transfer or PayPal.'
    }
  ]

  return (
    <div className="py-16 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Card Container */}
        <div 
          className="bg-gray-900 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden relative"
          style={{
            backgroundImage: `
              radial-gradient(circle at bottom left, rgba(220, 38, 38, 0.2) 0%, transparent 50%),
              radial-gradient(circle at top right, rgba(220, 38, 38, 0.2) 0%, transparent 50%)
            `
          }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-3">
              How It Works
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Start earning in 4 simple steps. Join thousands of successful affiliates already making money with CareMall.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-x-16 lg:gap-y-10 mb-10">
            {/* Center Cross Divider - Hidden on mobile */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none">
              {/* Horizontal line */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-700/40"></div>
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 w-px h-full bg-gray-700/40"></div>
            </div>
            
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0">
                    <span className="text-3xl md:text-4xl text-white">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg ${step.iconColor} mb-3`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-lg md:text-xl  text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-[280px] md:max-w-[320px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button 
              onClick={scrollToSignup}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 text-sm md:text-base"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
