import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

function Testimonials() {
  const testimonials = [
    {
      name: 'Aarav Mehta',
      role: 'Blogger',
      text: '"I started with CareMall 8 months ago with zero experience in affiliate marketing. The team\'s support and the quality products made it easy to recommend to my audience. Now I\'m earning more than my full-time job!"'
    },
    {
      name: 'Meera Nair',
      role: 'Streamer',
      text: '"The electronics category has been incredible for my channel. The conversion rates are amazing, and my audience loves the product recommendations. CareMall\'s tracking is transparent and payments are always on time."'
    },
    {
      name: 'Aditya Singh',
      role: 'Product Streamer',
      text: '"What I love most is the variety of products. I can promote everything from home decor to skincare. The commission structure is fair and the dashboard makes tracking super easy."'
    }
  ]

  return (
    <div className="py-20 px-5 bg-[#F2F0EA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            What Our Users Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
                {testimonial.text}
              </p>

              {/* User Info */}
              <div>
                <h4 className="text-xl text-gray-900 mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 text-sm">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4">
          <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
