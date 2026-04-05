import React from 'react'

export const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='px-3 py-2'>
            {children}
        </div>
    )
}