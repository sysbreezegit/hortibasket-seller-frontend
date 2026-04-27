"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, Download } from "lucide-react"

interface Product {
    id: number
    name: string
    earnings: string
}

interface StatCard {
    label: string
    value: string
    change: string
    color: string
}

const EarningsDashboard = () => {
    const [isExpanded, setIsExpanded] = useState(false)

    // Dummy data
    const stats: StatCard[] = [
        { label: "Sales This Month", value: "₹5,357", change: "+23% than last month", color: "text-green-500" },
        { label: "Total Clicks", value: "13.6K", change: "+15% than last month", color: "text-blue-500" },
        { label: "Conversions", value: "284", change: "+2% than last month", color: "text-green-500" },
        { label: "Total Orders", value: "135", change: "+42% than last month", color: "text-orange-500" },
    ]

    const products: Product[] = [
        { id: 1, name: "Motorola Edge 50", earnings: "₹40,750" },
        { id: 2, name: "132_Hug +21 Hud", earnings: "₹3,450" },
        { id: 3, name: "Nike Training Track Suit", earnings: "₹420" },
        { id: 4, name: "Sony Headphones Pro", earnings: "₹2,150" },
        { id: 5, name: "Apple Watch Series 8", earnings: "₹5,890" },
    ]

    const visibleProducts = isExpanded ? products : products.slice(0, 3)

    // Export to CSV
    const handleExport = (format: "csv" | "excel") => {
        const headers = ["Metric", "Value", "Change"]
        const statsRows = stats.map((stat) => [stat.label, stat.value, stat.change])
        const productsHeader = ["Product Name", "Earnings"]
        const productsRows = products.map((p) => [p.name, p.earnings])

        let csvContent = "EARNINGS REPORT\n\n"
        csvContent += headers.join(",") + "\n"
        statsRows.forEach((row) => {
            csvContent += row.join(",") + "\n"
        })
        csvContent += "\n\nTOP PERFORMING PRODUCTS\n"
        csvContent += productsHeader.join(",") + "\n"
        productsRows.forEach((row) => {
            csvContent += row.join(",") + "\n"
        })

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `earnings-report.${format === "excel" ? "xlsx" : "csv"}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
    }

    return (
        <Card className="w-full shadow-xl bg-[#F2F0EA] font-sans">
            <CardHeader className="py-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-medium">Your Earnings Dashboard</CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-sm flex items-center gap-2 bg-transparent"
                        onClick={() => handleExport("csv")}
                    >
                        Export Report
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat, index) => (
                        <div key={index} className="border-1 p-3 rounded-lg">
                            <p className="text-sm text-gray-600 mb-[70px] flex gap-1 items-center"><span className="h-[6px] w-[6px] rounded-full bg-green-500 inline-block"></span>
                                {stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900 ">{stat.value}</p>
                            <p className={`text-xs ${stat.color} mt-1`}>{stat.change}</p>
                        </div>
                    ))}
                </div>

                {/* Top Performing Products */}
                <div className="mt-6 pt-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-[#757575] text-base">Top Performing Products</h3>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-red-500 text-xs font-medium hover:text-red-700 transition"
                        >
                            {isExpanded ? "View Less" : "View All"}
                        </button>
                    </div>

                    <div
                        className="overflow-hidden transition-all duration-500 ease-in-out"
                        style={{
                            maxHeight: isExpanded ? `${products.length * 50}px` : `${3 * 50}px`,
                        }}
                    >
                        <div className="space-y-2">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex justify-between items-center p-2 bg-gray-50 rounded opacity-100 transition-opacity duration-500"
                                >
                                    <span className="text-sm font-medium text-gray-700">{product.name}</span>
                                    <span className="text-sm font-semibold text-green-600">{product.earnings}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-3">
                        <ChevronDown
                            size={18}
                            className={`text-gray-400 transition-transform duration-500 ease-in-out ${isExpanded ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                </div>

                {/* Export Buttons */}
                {/* <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button size="sm" className="flex-1 text-xs bg-red-500 hover:bg-red-600" onClick={() => handleExport("csv")}>
                        Export CSV
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs bg-transparent"
                        onClick={() => handleExport("excel")}
                    >
                        Export Excel
                    </Button>
                </div> */}
            </CardContent>
        </Card>
    )
}

export default EarningsDashboard
