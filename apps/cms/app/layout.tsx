import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kawthar CMS',
  description: 'Content Management System for Kawthar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

