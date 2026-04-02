'use client'

export default function PricingSection() {
    return (
        <div className="min-h-screen  flex flex-col items-center justify-center px-4">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold">মূল্য তালিকা</h1>
                <p className="text-gray-500 mt-2">
                    আপনার প্রয়োজন অনুযায়ী সঠিক প্যাকেজটি বেছে নিন
                </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
                {/* Free Card */}
                <div className="bg-black text-white rounded-2xl p-8 shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">ফ্রি (Free)</h2>
                    <h3 className="text-3xl font-bold mb-2">৳০ <span className="text-base font-normal">/মাস</span></h3>
                    <p className="text-gray-400 mb-6">নতুন কৃষকদের জন্য উপযুক্ত</p>

                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-green-400">
                            ✔ সীমিত পরামর্শ (দৈনিক ১টি)
                        </li>
                        <li className="flex items-center gap-2 text-green-400">
                            ✔ বেসিক আবহাওয়ার আপডেট
                        </li>
                        <li className="flex items-center gap-2 text-gray-500 line-through">
                            ✖ AI রোগ শনাক্তকরণ
                        </li>
                    </ul>

                    <button className="w-full border border-green-500 text-green-500 py-2 rounded-full hover:bg-green-500 hover:text-black transition">
                        শুরু করুন
                    </button>
                </div>

                {/* Premium Card */}
                <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-8 shadow-lg relative">
                    <span className="absolute top-4 right-4 bg-green-400 text-white text-xs px-3 py-1 rounded-full">
                        জনপ্রিয়
                    </span>

                    <h2 className="text-lg font-semibold mb-4">প্রিমিয়াম (Premium)</h2>
                    <h3 className="text-3xl font-bold mb-2">৳৯৯ <span className="text-base font-normal">/মাস</span></h3>
                    <p className="text-gray-600 mb-6">পেশাদার কৃষকদের জন্য সেরা সমাধান</p>

                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-green-600">
                            ✔ আনলিমিটেড AI বিশ্লেষণ
                        </li>
                        <li className="flex items-center gap-2 text-green-600">
                            ✔ স্মার্ট নোটিফিকেশন
                        </li>
                        <li className="flex items-center gap-2 text-green-600">
                            ✔ ২৪/৭ বিশেষজ্ঞ সাপোর্ট
                        </li>
                        <li className="flex items-center gap-2 text-green-600">
                            ✔ বাজার দর পূর্বাভাস
                        </li>
                    </ul>

                    <button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition">
                        Premium নিন
                    </button>
                </div>
            </div>
        </div>
    )
}
