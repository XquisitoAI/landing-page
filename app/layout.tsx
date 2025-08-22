import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'XQUISITO - Líder en soluciones digitales para el sector gastronómico',
  description: 'Una plataforma digital que integra pedidos, pagos, marketing y datos de cada transacción y cliente para optimizar cada aspecto del negocio.',
  keywords: 'restaurante, digital, pedidos, pagos, marketing, gastronomía',
  authors: [{ name: 'XQUISITO' }],
  metadataBase: new URL('https://xquisito.com'),
  openGraph: {
    title: 'XQUISITO - Soluciones digitales gastronómicas',
    description: 'Plataforma digital integral para restaurantes',
    type: 'website',
    url: 'https://xquisito.com',
    siteName: 'XQUISITO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XQUISITO - Soluciones digitales gastronómicas',
    description: 'Plataforma digital integral para restaurantes',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={playfair.variable}>
      <body className="font-helvetica antialiased">
        {children}
      </body>
    </html>
  )
}