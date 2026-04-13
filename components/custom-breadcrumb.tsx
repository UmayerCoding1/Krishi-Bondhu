'use client'
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import Link from 'next/link'
import { DropdownMenu } from 'radix-ui'
import { usePathname, useSearchParams } from 'next/navigation'

export const CustomBreadcrumb = ({ path }: { path: string[] }) => {

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="#">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {path.map((p, index) => <>
                    <BreadcrumbItem key={index}>
                        <BreadcrumbLink asChild>
                            {index === path.length - 1 ? <BreadcrumbPage>{p}</BreadcrumbPage> : <Link href="#">{p}</Link>}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index !== path.length - 1 && <BreadcrumbSeparator />}
                </>)}

            </BreadcrumbList>
        </Breadcrumb>
    )
}