import './globals.css'

export const metadata = {
  title: 'Sway Maverick Studio',
  description: 'Professional 3D Virtual Fitting Room',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
