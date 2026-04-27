"use client";

export default function Banner() {
  const scrollToSignup = () => {
    const element = document.getElementById('start-earning');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="min-h-[600px] md:min-h-[700px] flex items-center px-4 py-8 md:px-16 lg:px-24 md:py-0"
      style={{
        background: 'linear-gradient(0deg, rgba(255, 214, 214, 1) 0%, rgba(255, 255, 255, 1) 74%, rgba(255, 255, 255, 1) 100%)'
      }}
    >
      <div className="max-w-8xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-google-sans font-medium text-gray-900 leading-tight">
            <span className="inline-block  ">Earn Up To 20%</span>
            <br />
            <span className="inline-block  ">Commission Promoting</span>
            <br /> 
            <span className="inline-block  ">Top Products</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700">
            Join CareMall's affiliate program and start earning passive income by promoting
            thousands of quality products to your audience.
          </p>
          <button 
            onClick={scrollToSignup}
            className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-md font-semibold transition-colors w-full md:w-auto"
          >
            Start Earning Today
          </button>
        </div>

        {/* Right Content - Dashboard Card */}
        <div className="bg-[#F2F0EA] rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Your Earnings Dashboard</h2>
            <button className="text-xs md:text-sm border border-gray-300 px-3 md:px-4 py-1.5 md:py-2 rounded-md hover:bg-gray-50 whitespace-nowrap">
              Export Report
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6 ">
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <div className="text-xs md:text-sm text-gray-600 mb-1">● Sales This Month</div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">₹1,81,286</div>
              <div className="text-[10px] md:text-xs text-green-600">+23% Than last month</div>
            </div>
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <div className="text-xs md:text-sm text-gray-600 mb-1">● Total Clicks</div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">13.6K</div>
              <div className="text-[10px] md:text-xs text-green-600">+18% Than last month</div>
            </div>
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <div className="text-xs md:text-sm text-gray-600 mb-1">● Conversions</div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">741</div>
              <div className="text-[10px] md:text-xs text-green-600">+2% Than last month</div>
            </div>
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <div className="text-xs md:text-sm text-gray-600 mb-1">● Total Orders</div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">418</div>
              <div className="text-[10px] md:text-xs text-green-600">+42% Than last month</div>
            </div>
          </div>

          {/* Top Performing Products */}
          <div>
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900">Top Performing Products</h3>
              <button className="text-xs md:text-sm text-red-600 hover:text-red-700">View All</button>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center py-1.5 md:py-2 border-b border-gray-100">
                <span className="text-xs md:text-sm text-gray-700 truncate pr-2">Motorola Edge 50</span>
                <span className="text-xs md:text-sm font-semibold text-teal-600 whitespace-nowrap">₹40,750</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 border-b border-gray-100">
                <span className="text-xs md:text-sm text-gray-700 truncate pr-2">Boat Headset</span>
                <span className="text-xs md:text-sm font-semibold text-teal-600 whitespace-nowrap">₹3,450</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2">
                <span className="text-xs md:text-sm text-gray-700 truncate pr-2">Nike Training Track Suit</span>
                <span className="text-xs md:text-sm font-semibold text-teal-600 whitespace-nowrap">₹420</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
