function Stats() {
  const stats = [
    {
      value: '₹1.5 M',
      accent: '+',
      label: 'Paid to Affiliates in 2024'
    },
    {
      value: '10,000',
      accent: '+',
      label: 'Active Affiliates Partners'
    },
    {
      value: '10K',
      accent: '+',
      label: 'Products Available'
    },
    {
      value: '4.4',
      accent: '/5',
      label: 'Affiliate Rating'
    }
  ]

  return (
    <div className="bg-linear-to-b from-red-50/30 to-transparent py-16 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="p-5">
            <h3 className="text-5xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 mb-2">
              {stat.value}
              <span className="text-red-500">{stat.accent}</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stats
