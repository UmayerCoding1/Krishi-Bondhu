'use client'
import { cn } from "@/lib/utils";

export const SkeletonCard = ({ className }: { className?: string }) => {
    return (

        <div className={cn(" bg-gray-300   border rounded-lg shadow animate-pulse space-y-3 w-full", className)} />


    );
};