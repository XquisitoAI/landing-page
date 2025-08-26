'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Instagram, Facebook } from 'lucide-react'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter submission logic here
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <footer className="bg-[#1D1C1F]">
      <div className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Columna 1 - Logo y Redes Sociales */}
          <div className="flex flex-col gap-4">
            <div className="relative h-12 w-40">
              <Image
                src="/assets/Images/logo-white.webp"
                alt="XQUISITO Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <a 
                href="#" 
                className="text-white text-xl hover:opacity-70 transition cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-white text-xl hover:opacity-70 transition cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-white text-xl hover:opacity-70 transition cursor-pointer"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.294-1.98-1.294-3.244V.906h-3.068v13.512c0 1.077-.348 2.077-.983 2.883a4.55 4.55 0 0 1-2.567 1.565c-.927.23-1.879.138-2.739-.264a4.547 4.547 0 0 1-2.265-2.617 4.528 4.528 0 0 1 .264-3.552 4.55 4.55 0 0 1 2.567-2.265c.495-.123.997-.138 1.488-.046v-3.13a7.64 7.64 0 0 0-2.567.046 7.675 7.675 0 0 0-4.324 2.617 7.633 7.633 0 0 0-1.564 4.694c0 1.663.533 3.244 1.518 4.509a7.675 7.675 0 0 0 4.04 2.617c.858.214 1.747.214 2.605 0a7.675 7.675 0 0 0 4.04-2.617c.985-1.265 1.518-2.846 1.518-4.509V7.633a9.29 9.29 0 0 0 5.447 1.747V6.312a6.228 6.228 0 0 1-2.337-.75z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2 - Links de Servicios */}
          <div className="flex flex-col gap-4">
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium"
                >
                  ORDER, TAP & PAY
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium"
                >
                  TAP & PAY
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium"
                >
                  FLEX BILL
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium"
                >
                  PICK N GO
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Links de Producto */}
          <div className="flex flex-col gap-4">
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium"
                >
                  FOOD HALL
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium"
                >
                  RECOMPENSAS
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium"
                >
                  LEALTAD
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Newsletter */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-white font-bold text-base">
                Entérate de todo lo importante
              </h3>
              <p className="text-sm text-white/70 mt-2">
                Noticias clave, sin correos innecesarios.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="rounded-full px-4 py-2 text-sm w-full md:w-auto flex-1 text-black"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-black px-4 py-2 rounded-full font-medium hover:opacity-90 transition text-sm"
                >
                  OK
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer