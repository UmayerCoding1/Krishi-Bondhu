import { Trash } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

export const DangerAlertSetting = () => {
    return (
        <div className='bg-red-50 border p-4 rounded-br-lg rounded-bl-lg'>
            <div className='mb-6'>
                <h2 className='flex items-center gap-2 border-b border-red-200 pb-4'>
                    <Trash className='text-red-500' />
                    <h2 className='text-xl font-semibold'>অ্যাকাউন্ট মুছুন</h2>
                </h2>
                <p className='text-sm text-neutral-500'>আপনার অ্যাকাউন্ট এবং সমস্ত সংশ্লিষ্ট ডেটা স্থায়ীভাবে সরিয়ে দিন। এই পদক্ষেপ পূর্বাবস্থায় ফেরানো যাবে না।</p>
            </div>

            <div className='flex items-center justify-end'>
                <Button className='px-6 py-6 bg-red-500 text-white hover:bg-red-600 cursor-pointer' >অ্যাকাউন্ট মুছে ফেলুন</Button>
            </div>
        </div>
    )
}