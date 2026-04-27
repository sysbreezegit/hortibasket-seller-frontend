"use client";

import { ArrowRight } from 'lucide-react'

function PromoteCategories() {
  const scrollToSignup = () => {
    const element = document.getElementById('start-earning');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2671&auto=format&fit=crop',
      products: '5,000+',
      commission: '10-20%'
    },
    {
      name: 'Cosmetics',
      image: 'https://images.unsplash.com/photo-1583784561105-a674080f391e?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      products: '5,000+',
      commission: '10-20%'
    },  
    {
      name: 'Home Appliances',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2670&auto=format&fit=crop',
      products: '5,000+',
      commission: '10-20%'
    },
    {
      name: 'Gadgets',
      image: 'https://caremall-web.s3.ap-south-1.amazonaws.com/products/a11080d2-e2ea-43db-a515-88f86c035232.jpeg',
      products: '5,000+',
      commission: '10-20%'
    },
    {
      name: 'Footwear',
      image: 'https://caremall-web.s3.ap-south-1.amazonaws.com/images/936adc99-02cc-4169-a482-adfdb9062af5.webp',
      products: '5,000+',
      commission: '10-20%'
    }
  ]

  return (
    <div className="py-20 px-5 bg-[#F2F0EA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  text-gray-900 mb-3">
            Promote Top Selling Categories
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Access over 10,000 products across multiple categories. Choose what matches your audience best
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col">
              {/* Image Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-gray-100 group">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-[#F2F0EA] py-2.5 rounded-lg shadow-sm text-center">
                  <span className="text-gray-800 font-medium text-sm">
                    {category.name}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center mb-4 px-1">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Products</p>
                  <p className="text-red-500 font-bold text-lg">{category.products}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-0.5">Commission</p>
                  <p className="text-green-500 font-bold text-lg">{category.commission}</p>
                </div>
              </div>

              {/* Button */}
              <button 
                onClick={scrollToSignup}
                className="w-full border border-gray-200 rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Get Link <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button 
            onClick={scrollToSignup}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors"
          >
            Explore all Categories
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromoteCategories
