'use client'
import React from 'react'

import { ThemeProvider } from '@/components/theme-providers'

function Providers({ children }: { children: React.ReactNode }) {
    return <>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange >
            {children}
        </ThemeProvider>
    </>
}

export default Providers