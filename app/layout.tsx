import './styles/globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import StoreProvider from '@/app/StoreProvider';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Titanfall 2 ranking system',
    description: 'Created with NextJS',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html data-theme="dark" lang="en">
        <StoreProvider>
            <body className={inter.className}>{children}</body>
        </StoreProvider>
        </html>
    )
}
