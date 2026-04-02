'use client'

export default function PricingSection() {
    return (
        <div className="min-h-screen dark:bg-neutral-800 flex flex-col items-center justify-center px-4 py-20">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-2xl md:text-4xl font-bold">মূল্য তালিকা</h1>
                <p className="text-neutral-500 mt-3 max-w-sm mx-auto text-sm md:text-base">
                    আপনার প্রয়োজন অনুযায়ী সঠিক প্যাকেজটি বেছে নিন
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                {/* Free Card */}
                <div className="bg-neutral-950 text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-white/5 flex flex-col">
                    <h2 className="text-lg font-semibold mb-2 text-neutral-400">ফ্রি (Free)</h2>
                    <h3 className="text-4xl font-bold mb-4">৳০ <span className="text-lg font-normal text-neutral-500">/মাস</span></h3>
                    <p className="text-neutral-400 mb-8 text-sm">নতুন কৃষকদের জন্য উপযুক্ত</p>

                    <ul className="space-y-4 mb-10 flex-1">
                        <li className="flex items-center gap-3 text-green-400 text-sm">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-green-400/10 flex items-center justify-center text-xs">✔</span>
                            সীমিত পরামর্শ (দৈনিক ১টি)
                        </li>
                        <li className="flex items-center gap-3 text-green-400 text-sm">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-green-400/10 flex items-center justify-center text-xs">✔</span>
                            বেসিক আবহাওয়ার আপডেট
                        </li>
                        <li className="flex items-center gap-3 text-neutral-600 text-sm line-through">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-xs">✖</span>
                            AI রোগ শনাক্তকরণ
                        </li>
                    </ul>

                    <button className="w-full border border-green-500/50 text-green-500 py-4 rounded-2xl hover:bg-green-500 hover:text-black transition-all font-semibold tracking-wide">
                        শুরু করুন
                    </button>
                </div>

                {/* Premium Card */}
                <div className="bg-green-50 dark:bg-green-950/10 border-2 border-green-400 rounded-3xl p-6 md:p-10 shadow-2xl relative flex flex-col">
                    <span className="absolute -top-3 right-8 bg-green-500 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow-lg">
                         সেরা পছন্দ
                    </span>

                    <h2 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-400">প্রিমিয়াম (Premium)</h2>
                    <h3 className="text-4xl font-bold mb-4">৳৯৯ <span className="text-lg font-normal opacity-60">/মাস</span></h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-sm">পেশাদার কৃষকদের জন্য সেরা সমাধান</p>

                    <ul className="space-y-4 mb-10 flex-1">
                        <li className="flex items-center gap-3 text-green-700 dark:text-green-300 text-sm">
                             <span className="shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-xs">✔</span>
                            আনলিমিটেড AI বিশ্লেষণ
                        </li>
                        <li className="flex items-center gap-3 text-green-700 dark:text-green-300 text-sm">
                             <span className="shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-xs">✔</span>
                            স্মার্ট নোটিফিকেশন
                        </li>
                        <li className="flex items-center gap-3 text-green-700 dark:text-green-300 text-sm">
                             <span className="shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-xs">✔</span>
                            ২৪/৭ বিশেষজ্ঞ সাপোর্ট
                        </li>
                        <li className="flex items-center gap-3 text-green-700 dark:text-green-300 text-sm">
                             <span className="shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-xs">✔</span>
                            বাজার দর পূর্বাভাস
                        </li>
                    </ul>

                    <button className="w-full bg-green-500 text-white py-4 rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 font-semibold tracking-wide">
                        Premium নিন
                    </button>
                </div>
            </div>
        </div>
    )
}
