"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Category {
    id: number
    name: string
    products: string
    commission: string
    image: string
}

const PromoteCategories = () => {
    const categories: Category[] = [
        {
            id: 1,
            name: "Electronics",
            products: "5,000+",
            commission: "20-30%",
            image: "/laptop.png",
        },
        {
            id: 2,
            name: "Cosmetics",
            products: "8,000+",
            commission: "20-30%",
            image: "/cosmetics.png",
        },
        {
            id: 3,
            name: "Home Appliances",
            products: "5,000+",
            commission: "20-30%",
            image: "/appliances.png",
        },
        {
            id: 4,
            name: "Women's Apparel",
            products: "5,000+",
            commission: "20-30%",
            image: "/apparels.png",
        },
        {
            id: 5,
            name: "Shoes",
            products: "8,000+",
            commission: "20-30%",
            image: "/shoes.jpg",
        },
    ]

    return (
        <section className="py-20 px-4 md:px-24 bg-[#F2F0EA]">
            <div className=" mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">Promote Top Selling Categories</h2>
                    <p className="text-gray-600">
                        Access over 10,000 products across multiple categories. Choose what suits your audience best.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-[#F2F0EA] rounded-xl  border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 text-center w-[252px]"
                        >
                            {/* Image */}
                            <div className="relative w-full h-[250px] bg-gray-50">
                                <img
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Category Name Overlay */}
                                
                                <div className="w-full mx-3 absolute bottom-[15px] left-1/2 -translate-x-1/2 bg-[#F2F0EA] text-gray-800 text-sm font-medium px-5 py-1.5 rounded-sm shadow-sm border border-gray-200">
                                    {category.name}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex justify-between text-sm mt-6 px-4">
                                <div className="flex flex-col items-start">
                                    <span className="text-gray-500">Products</span>
                                    <span className="text-red-500 font-semibold">{category.products}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-gray-500">Commission</span>
                                    <span className="text-green-600 font-semibold">{category.commission}</span>
                                </div>
                            </div>

                            {/* Get Link Button */}
                            <button className="mt-4 mb-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-1 w-[85%] mx-auto transition-colors">
                                Get Link <ArrowRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Featured Categories Button */}
                <div className="text-center">
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-semibold">
                        Featured All Categories
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default PromoteCategories
