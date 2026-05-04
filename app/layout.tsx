import './globals.css';
export const metadata = {
  title: 'SWAY | 3D Engine',
  description: 'AI Virtual Fitting Room',
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
