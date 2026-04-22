'use client'


import { Header, HeaderDescription, HeaderHilight, HeaderTitle } from './header'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { TabsContentWrapper } from './tabs-content-wrapper';
import { AccountSetting } from './account-setting';
import { NotificationSetting } from './notification-setting';
import { DangerAlertSetting } from './danger-alert';

export const Setting = () => {
    return (
        <div>
            <div className='w-full flex items-center justify-center px-4'>
                <Header className='my-0'>
                    <HeaderTitle>অ্যাকাউন্ট <HeaderHilight type='success'>সেটিংস</HeaderHilight></HeaderTitle>
                    <HeaderDescription>আপনার ব্যক্তিগত তথ্য এবং নিরাপত্তা পছন্দগুলো পরিচালনা করুন</HeaderDescription>
                </Header>
            </div>

            <div className='border-t mt-10 border-neutral-300'>
                <div className=' max-w-7xl mx-auto border-l border-r border-neutral-300 lg:h-screen  '>
                    {/* tab */}
                    <div className='p-2 '>
                        <Tabs defaultValue="account" className="w-full">
                            <TabsList className='gap-10'>
                                <TabsTrigger value="account">অ্যাকাউন্ট</TabsTrigger>
                                <TabsTrigger value="notification">নোটিফিকেশন</TabsTrigger>
                                <TabsTrigger value="danger-alert">বিপদ</TabsTrigger>

                            </TabsList>
                            <TabsContentWrapper value="account">
                                <AccountSetting />
                            </TabsContentWrapper>

                            <TabsContentWrapper value="notification">
                                <NotificationSetting />
                            </TabsContentWrapper>

                            <TabsContentWrapper value="danger-alert" type='danger'>
                                <DangerAlertSetting />
                            </TabsContentWrapper>

                        </Tabs>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}






