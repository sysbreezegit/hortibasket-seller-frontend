import { Button } from "@/components/ui/button"
import { Users, Link2, Share2, Wallet } from "lucide-react"

const HowItWorks = () => {
    const stats = [
        {
            value: "₹1.5 M+",
            label: "Paid to Affiliates in 2024",
        },
        {
            value: "10,000+",
            label: "Active Affiliates Partners",
        },
        {
            value: "10K+",
            label: "Products Available",
        },
        {
            value: "4.4/5",
            label: "Affiliate Rating",
        },
    ]

    const steps = [
        {
            number: "01",
            title: "Sign Up For Free",
            description:
                "Create your affiliate account in minutes. No fees, no commitments. Get instant access to your dashboard and marketing materials.",
            icon: Users,
            iconColor: "text-[#A190FF]",
            bgColor: "bg-[#A190FF33]",
        },
        {
            number: "02",
            title: "Get Your Unique Links",
            description:
                "Access thousands of products and get custom tracking links. Share products that match your audience interests.",
            icon: Link2,
            iconColor: "text-[#418DFF]",
            bgColor: "bg-[#418DFF33]",
        },
        {
            number: "03",
            title: "Promote & Share",
            description:
                "Share your links on your blog, social media, YouTube, or email. We provide banners, product feeds, and promotional content.",
            icon: Share2,
            iconColor: "text-[#FF4D00]",
            bgColor: "bg-[#FF4D0033]",
        },
        {
            number: "04",
            title: "Earn Commissions",
            description:
                "Earn up to 30% commission on every sale. Track your earnings in real-time and get paid monthly via bank transfer or PayPal.",
            icon: Wallet,
            iconColor: "text-[#14AE5C]",
            bgColor: "bg-[#14AE5C33]",
        },
    ]

    return (
        <div className="w-full py-16 md:py-24 flex flex-col gap-24">
            {/* Stats Section */}
            <div className="px-8 md:px-24 flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-6xl">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                            <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works Section */}
            <div className="relative px-8 md:px-24 py-20 bg-[#0e0e0e] rounded-3xl mx-8 md:mx-24">
                <div className="absolute bottom-0 left-0 w-[304px] h-[304px] bg-[#FF4141] opacity-30 blur-[120px] rounded-full"></div>
                <div className="absolute top-0 right-0 w-[304px] h-[304px] bg-[#FF4141] opacity-30 blur-[120px] rounded-full"></div>

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-4xl font-medium text-white mb-4">How It Works</h2>
                    <p className="text-[#757575] text-base md:text-lg max-w-2xl mx-auto">
                        Start earning in 4 simple steps. Join thousands of successful affiliates already making money with CareWall.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {steps.map((step, index) => {
                        const IconComponent = step.icon
                        return (
                            <div key={index} className="flex gap-2">
                                <div className="">
                                    <span className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">{step.number}.</span>
                                </div>
                                <div className="flex-1">
                                    <div className={`w-12 h-12 rounded-md ${step.bgColor} flex items-center justify-center`}>
                                        <IconComponent className={`w-6 h-6 ${step.iconColor}`} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                                    <p className="text-[#757575] text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base font-medium rounded-md">
                        Get Started Now
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks