import { TabsContent } from "./ui/tabs"

export const TabsContentWrapper = ({ children, value, type = 'success' }: { children: React.ReactNode, value: string, type?: string }) => {
    return (
        <TabsContent value={value} className={` lg:mx-40  mt-10 border-t-4 ${type === 'success' ? ' border-t-primary' : 'border-t-red-500'}`}>
            {children}
        </TabsContent>
    )
}