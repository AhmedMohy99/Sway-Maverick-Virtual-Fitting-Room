export const metadata = {
  title: 'Sway Maverick | Virtual Fitting Room',
  description: '3D Virtual Fitting Room for Sway Maverick technical streetwear.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#050505' }}>
        {children}
      </body>
    </html>
  )
}
