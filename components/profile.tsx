'use client'
import React, { useEffect, useState } from 'react'
import { Header, HeaderDescription, HeaderHilight, HeaderTitle } from './header'
import { User } from '@/provider/auth-provider'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import handleTranslate from '@/lib/convertTextInBangla'
import { cn } from '@/lib/utils'
import { Camera, CloudDownload, Shield, X } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { label } from 'motion/react-client'
import { toast } from 'sonner'

export const Profile = () => {
    const { user } = useAuth();
    console.log(user)



    if (!user) {
        return <div>
            User not found
        </div>
    }
    return (
        <div className='max-w-5xl mx-auto h-[calc(100vh-4rem)]  px-4 py-4 border-l border-r'>
            <div className='w-full border-b pb-3'>
                <Header className='my-0' >
                    <HeaderTitle>আপনার <HeaderHilight type='success'>প্রোফাইল</HeaderHilight></HeaderTitle>
                    <HeaderDescription>আপনার ব্যক্তিগত তথ্য এবং অ্যাকাউন্ট পরিচয় পরিচালনা করুন।</HeaderDescription>
                </Header>
            </div>

            <div>
                <ProfileDetails user={user} />
            </div>
        </div>
    )
}


const ProfileDetails = ({ user }: { user: User }) => {
    const [status, setStatus] = useState('');
    const [openProfileUpdate, setOpenProfileUpdate] = useState(false);
    const [newProfileImageData, setNewProfileImageData] = useState({
        url: '',
        file: null as File | null,
        width: 0,
        height: 0
    });
    const [imageUploadError, setImageUploadError] = useState('');

    useEffect(() => {
        const convertStatus = async () => {
            const text = await handleTranslate(user.status);
            if (!text) return setStatus('');
            setStatus(text);
        }
        convertStatus()
    }, [user.status]);


    const handleNewProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new window.Image();

                const maxSize = 1 * 1024 * 1024;
                if (file.size > maxSize) {
                    setImageUploadError('Image size must be less than 1 MB');
                    toast.error('Image size must be less than 1 MB');
                    e.target.value = "";
                    return;
                }
                img.onload = () => {
                    const weight = img.width;
                    const height = img.height;

                    setNewProfileImageData({
                        url: reader.result as string,
                        file: file,
                        width: weight,
                        height: height
                    });

                    setOpenProfileUpdate(true);
                    e.target.value = '';
                }
                img.src = reader.result as string;

            };
            reader.readAsDataURL(file);

        }
    }
    return (
        <div className='w-full h-56 rounded-2xl mt-4 bg-neutral-50 border dark:bg-neutral-900   border-neutral-200 dark:border-neutral-500  flex items-center  px-5 gap-4 '>
            <div className='w-[200px] relative '>
                <Image
                    src={user.avatar || 'https://umayerhossain.vercel.app/umayer.jpeg'}
                    alt='profile'
                    width={230}
                    height={230}
                    className='w-48 h-48 object-top rounded-full shadow-md shadow-neutral-500' />

                <label htmlFor='avatar' className='absolute right-10 bottom-0 cursor-pointer'>
                    <Camera className='w-10 h-10 bg-green-500 rounded-full p-2 text-white' />
                    <input
                        onChange={handleNewProfileImage}
                        type='file'
                        name='avatar'
                        accept='image/*'
                        id='avatar'
                        className='hidden' />
                </label>
            </div>

            {
                openProfileUpdate && <ProfileUpdate user={user} open={openProfileUpdate} setOpen={setOpenProfileUpdate} newProfileImageData={newProfileImageData} setNewProfileImageData={setNewProfileImageData} imageUploadError={imageUploadError} setImageUploadError={setImageUploadError} />
            }

            <div className='w-full flex flex-col gap-5'>
                <div>
                    <h2 className='text-3xl font-black tracking-tight '>{user.name}</h2>
                </div>

                <div className='flex items-center justify-between  w-full gap-4'>
                    <div>
                        <p className='text-xl  font-semibold text-neutral-500'>ফার্মার আইডি</p>
                        <p className='text-sm font-medium'>#{user._id}</p>
                    </div>
                    <div>
                        <p className='text-xl  font-semibold text-neutral-500'>অ্যাকাউন্ট স্ট্যাটাস</p>
                        <p className='text-sm font-medium flex items-center gap-2'>
                            <span
                                className={cn(
                                    'w-2 h-2 rounded-full block',
                                    user.status === 'active' && 'bg-green-500',
                                    user.status === 'pending' && 'bg-yellow-500',
                                    user.status === 'rejected' && 'bg-red-500'
                                )}
                            ></span>
                            {status}
                        </p>
                    </div>
                    <div>
                        <p className='text-xl  font-semibold text-neutral-500'>অ্যাকাউন্ট স্ট্যাটাস</p>
                        <p className='text-sm font-medium flex justify-center items-center gap-0.5  bg-green-500 px-2 py-1 rounded-full text-white  w-20  '>
                            <Shield size={10} />
                            {user.role}
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
};


const ProfileUpdate = ({ user, open, setOpen, newProfileImageData, setNewProfileImageData }: {
    user: User,
    open: boolean,
    setOpen: (open: boolean) => void,
    newProfileImageData: { url: string, file: File | null, width: number, height: number },
    setNewProfileImageData: (newProfileImageData: { url: string, file: File | null, width: number, height: number }) => void
    imageUploadError: string,
    setImageUploadError: (imageUploadError: string) => void
}) => {
    const imageHeight = newProfileImageData.height;

    console.log(newProfileImageData.file)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>

                        <div className='mt-5 border-t pt-2 relative'>
                            {newProfileImageData.url && <X className='w-10 h-10 cursor-pointer absolute top-0 right-0 z-50 bg-white rounded-full p-2 ' onClick={() => setNewProfileImageData({ url: '', file: null, width: 0, height: 0 })} />}
                            {newProfileImageData.url ? (
                                <Image
                                    src={newProfileImageData.url}
                                    alt='profile'
                                    width={230}
                                    height={230}
                                    className={cn(
                                        'w-full h-80  shadow-md shadow-neutral-500 mask-b-from-8% rounded-lg',
                                        imageHeight < 800 && 'object-cover',
                                        imageHeight > 800 && 'object-cover',
                                        imageHeight > 1000 && 'object-cover object-top',
                                        imageHeight > 1500 && 'object-cover object-center'
                                    )} />
                            ) : (
                                <label htmlFor='avatar'>
                                    <div className='w-full h-48 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex justify-center items-center flex-col gap-2'>
                                        <CloudDownload className='w-10 h-10 text-neutral-500' />
                                        <p className='text-neutral-500'>Upload your profile picture</p>
                                    </div>
                                </label>
                            )}

                            {/* image details */}
                            <div>

                            </div>
                        </div>
                    </DialogHeader>



                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className='cursor-pointer'>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className='cursor-pointer'>Save changes</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </div>
    )
}