import './globals.scss'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '400', '500'] })

export const metadata = {
  title: 'Image Gallery',
  description: 'A gallery of 10 Greek Gods',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  )
}
