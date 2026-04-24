'use client'
import { Eye, EyeClosed, KeyRound, OctagonAlert, ShieldAlert } from "lucide-react";
import { Switch } from "./ui/switch"
import { useState } from "react";
import { motion } from "motion/react"
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const AccountSetting = () => {
    const { logout, user } = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordMatcStatus, setPasswordMatcStatus] = useState({
        message: "",
        status: ""
    });
    const [loading, setLoading] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.isTwoFactorEnabled || false);
    const handleTwoFactorChange = async () => {
        try {
            setLoading(true);
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/toggle-two-factor`, {}, { withCredentials: true });
            if (response.status === 200) {
                setTwoFactorEnabled(!twoFactorEnabled);
                toast.success(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setLoading(true);

            // password match
            if (formData.newPassword !== formData.confirmPassword) {
                setPasswordMatcStatus({
                    message: "নতুন পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মেলে না",
                    status: "error"
                });
                setLoading(false);
                return;
            }

            // password validation
            const passwordRegex = /.{6,}$/;
            if (!passwordRegex.test(formData.newPassword)) {
                setPasswordMatcStatus({
                    message: "পাসওয়ার্ড কমপক্ষে 6 অক্ষর হতে হবে",
                    status: "error"
                });
                setLoading(false);
                return;
            }

            // empty field check
            if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
                setPasswordMatcStatus({
                    message: "সকল ফিল্ড পূরণ করুন",
                    status: "error"
                });
                setLoading(false);
                return;
            }

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/change-password`, formData, { withCredentials: true });

            if (response.status === 200) {
                setPasswordMatcStatus({
                    message: "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে",
                    status: "success"
                });
                setLoading(false);
                logout();
                router.push("/auth");
                setFormData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            }


        } catch (error) {
            console.log(error);
            setLoading(false);
            setPasswordMatcStatus({
                message: "একটি ত্রুটি হয়েছে",
                status: "error"
            });
        }

    }

    console.log(user)
    if (!user) {
        return <div>loading.....</div>
    }
    return (
        <>
            <div className='bg-neutral-100 dark:bg-neutral-800 px-4 py-2 mt-2 rounded-2xl relative overflow-hidden'>

                {/* error message */}
                {passwordMatcStatus.message && <motion.div initial={{ opacity: 0, x: 200 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className={`absolute top-2 right-2 p-4 rounded-lg border border-neutral-200 dark:border-neutral-500 ${passwordMatcStatus.status === "error" ? "bg-red-500" : "bg-green-500"}`}>
                    <p className='text-neutral-100 text-sm font-semibold flex items-center gap-2'>{passwordMatcStatus.status === "error" ? <OctagonAlert className='w-5 h-5 text-neutral-100' /> : <ShieldAlert className='w-5 h-5 text-neutral-100' />} {passwordMatcStatus.message}</p>
                </motion.div>}
                <div className='mt-3'>
                    <h2 className='flex items-center gap-2'>
                        <KeyRound className='text-primary' />
                        <h2 className='text-xl font-semibold'>পাসওয়ার্ড পরিবর্তন</h2>
                    </h2>
                    <p className='text-sm text-neutral-500'>একটি শক্তিশালী পাসওয়ার্ড ব্যবহার করুন যা অন্য কোথাও পুনরায় ব্যবহার করেন না।</p>
                </div>

                <form onSubmit={handleChangePassword} className='mt-5 flex flex-col gap-4'>
                    <div>
                        <label htmlFor="" className='text-sm text-neutral-500'>বর্তমান পাসওয়ার্ড</label>
                        <input type="password" value={formData.oldPassword} onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })} required className='w-full py-2 px-3 outline-none border border-neutral-200 dark:border-neutral-500 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-800 focus:border-primary' />
                    </div>

                    <div className='flex items-center gap-2 w-full'>
                        <div className='w-full relative'>
                            <label htmlFor="" className='text-sm text-neutral-500'>নতুন পাসওয়ার্ড</label>
                            <input type={showPassword ? "text" : "password"} value={formData.newPassword} onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} required className='w-full py-2 px-3 outline-none border border-neutral-200 dark:border-neutral-500 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-800 focus:border-primary' />
                            {showPassword ? (
                                <EyeClosed onClick={() => setShowPassword(false)} className='w-5 h-5 absolute right-2 top-[65%] cursor-pointer -translate-y-1/2' />
                            ) : (
                                <Eye onClick={() => setShowPassword(true)} className='w-5 h-5 absolute right-2 top-[65%] cursor-pointer -translate-y-1/2' />
                            )}
                        </div>

                        <div className='w-full relative'>
                            <label htmlFor="" className='text-sm text-neutral-500'>নিশ্চিত পাসওয়ার্ড</label>
                            <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required className='w-full py-2 px-3 outline-none border border-neutral-200 dark:border-neutral-500 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-800 focus:border-primary' />

                        </div>
                    </div>

                    <div className='flex items-center justify-end'> <button type='submit' className='bg-primary text-white px-4 py-2 rounded-lg mt-5'>পাসওয়ার্ড পরিবর্তন করুন</button></div>
                </form>
            </div>

            <div className='bg-neutral-100 dark:bg-neutral-800 px-4 py-2 mt-5 rounded-2xl'>
                <div className='mt-3'>
                    <h2 className='flex items-center gap-2'>
                        <ShieldAlert className='text-primary' />
                        <h2 className='text-xl font-semibold'>দ্বি-স্তর প্রমাণীকরণ</h2>
                    </h2>
                    <p className='text-sm text-neutral-500'>আপনার অ্যাকাউন্টের নিরাপত্তা বাড়াতে দ্বি-স্তর প্রমাণীকরণ সক্ষম করুন।</p>
                </div>

                <div className='flex items-center justify-between mt-10'>
                    <div>
                        <h2 className='text-lg font-semibold'>অথেনটিকেটর অ্যাপ</h2>
                        <p className='text-sm text-neutral-500'>সাইন ইন করার সময় একটি ওয়ান-টাইম কোড পান।</p>
                    </div>

                    <div>
                        <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorChange} id="airplane-mode" />
                    </div>
                </div>
            </div>
        </>
    )
}