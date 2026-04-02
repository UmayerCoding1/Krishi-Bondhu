import React from 'react'
import { Container } from './container'
import { Header, HeaderTitle } from './header'
import Image from 'next/image'

export const ProblemSection = () => {
    const problemList = [
        ' সঠিক ফসল নির্বাচন করা কঠিন',
        'আবহাওয়ার তথ্য পাওয়া যায় না',
        ' রোগ শনাক্ত করতে সমস্যা',
        ' বাজার দর জানা যায় না'
    ]
    return (
        <Container>
            <div className='flex my-20 w-full items-center'>

                <div className='flex-1'>
                    <Header >
                        <HeaderTitle>
                            কৃষকদের সাধারণ সমস্যা
                        </HeaderTitle>
                    </Header>
                    <div className='flex flex-col gap-4'>
                        {problemList.map((problem, index) => (
                            <div key={index} className='flex items-center gap-2'>
                                <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                                <p className='text-lg font-medium'>{problem}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex-1'>
                    <Image
                        src={'/assets/confused-farmer.avif'}
                        alt='confused-farmer'
                        width={400}
                        height={400}
                        className='rounded-2xl '
                    />
                </div>
            </div>
        </Container>
    )
}