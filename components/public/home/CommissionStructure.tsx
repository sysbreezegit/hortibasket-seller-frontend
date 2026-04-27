import { Check, ArrowRight } from 'lucide-react'

function CommissionStructure() {
  const tiers = [
    {
      name: 'Starter',
      commission: '15% Commission',
      sales: 'Monthly Sales: upto ₹5,000',
      features: [
        '15% commission on all sales',
        'Basic marketing materials',
        'Monthly payments',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      commission: '22% Commission',
      sales: 'Monthly Sales: upto ₹25,000',
      features: [
        '22% commission on all sales',
        'Premium marketing materials',
        '90-day cookie duration',
        'Bi-weekly payments',
        'Priority email support'
      ]
    },
    {
      name: 'Elite',
      commission: '30% Commission',
      sales: 'Monthly Sales: ₹25,000+',
      features: [
        '30% commission on all sales',
        'Custom marketing materials',
        '120-day cookie duration',
        '24/7 priority support',
        'Exclusive product previews',
        'Custom promotional deals'
      ]
    }
  ]

  return (
    <div className="py-20 px-5 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Commission Structure
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Earn more as you grow. Our tiered commission structure rewards your success with higher rates.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className="bg-[#F2F0EA] rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-3xl font-medium text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-green-500 font-semibold mb-1">{tier.commission}</p>
                <p className="text-gray-900 font-medium">{tier.sales}</p>
              </div>

              <div className="space-y-4 mb-20 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full border border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 font-semibold text-gray-800 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300 group">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommissionStructure
