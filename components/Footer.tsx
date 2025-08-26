'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Instagram, Facebook, Linkedin } from 'lucide-react'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter submission logic here
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  const scrollToStackedPanel = (panelIndex: number) => {
    const stackedSection = document.getElementById('features')
    if (stackedSection) {
      const sectionTop = stackedSection.offsetTop
      const sectionHeight = stackedSection.offsetHeight
      const viewportHeight = window.innerHeight
      
      // Calculate scroll position for specific panel
      // Each panel takes up 1/5 of the section (5 panels total)
      const panelProgress = panelIndex / 4 // 0 to 1 for panels 0-4
      const targetScroll = sectionTop + (sectionHeight - viewportHeight) * panelProgress
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="bg-[#1D1C1F]">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          
          {/* Columna 1 - Logo y Redes Sociales */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div className="relative h-10 md:h-12 w-32 md:w-40 mx-auto md:mx-0">
              <Image
                src="/assets/Images/logo-white.webp"
                alt="XQUISITO Logo"
                fill
                className="object-contain object-center md:object-left"
                priority
              />
            </div>
            <div className="flex flex-row items-center gap-4 justify-center md:justify-start md:ml-4">
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
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Columna 2 - Links de Servicios */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <ul className="space-y-2 md:space-y-3">
              <li>
                <button 
                  onClick={() => scrollToStackedPanel(0)}
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium text-left"
                >
                  TAP ORDER & PAY
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToStackedPanel(2)}
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium text-left"
                >
                  FLEX BILL
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToStackedPanel(1)}
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium text-left"
                >
                  TAP & PAY
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Links de Producto */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <ul className="space-y-2 md:space-y-3">
              <li>
                <button 
                  onClick={() => scrollToStackedPanel(4)}
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium text-left"
                >
                  FOOD HALL
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToStackedPanel(3)}
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium text-left"
                >
                  PIK N GO
                </button>
              </li>
              <li>
                <a 
                  href="#rewards" 
                  className="text-white hover:opacity-70 cursor-pointer transition text-sm font-medium"
                >
                  SCALA
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Newsletter */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div>
              <h3 className="text-white font-bold text-base">
                Entérate de todo lo importante
              </h3>
              <p className="text-sm text-white/70 mt-2">
                Noticias clave, sin correos innecesarios.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="rounded-full px-4 py-2 text-sm w-full sm:w-auto flex-1 text-black"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-black px-4 py-2 rounded-full font-medium hover:opacity-90 transition text-sm w-full sm:w-auto"
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