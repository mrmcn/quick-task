import theme from '@/theme'
import { roboto } from '@/ui/font'
import BasicAppBar from '@/ui/root/bar'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <BasicAppBar>{children}</BasicAppBar>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
