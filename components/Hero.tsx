'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown, ArrowRight, Bell, Wallet, Users, ShoppingBag, DollarSign, UserCheck, Utensils } from 'lucide-react'

const Hero: React.FC = () => {
  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false)
  const [usePinkLogo, setUsePinkLogo] = useState(false)
  const [usePinkButtons, setUsePinkButtons] = useState(false)

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
    setShowSolutionsMenu(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      // Look for the IntegrationCarousel section
      const integrationSection = document.querySelector('section[class*="bg-gradient-to-r from-white to-[#D9F0FF]"]')
      if (integrationSection) {
        const rect = integrationSection.getBoundingClientRect()
        // Change logo when section is 100px from top of viewport
        setUsePinkLogo(rect.top <= 100)
      }

      // Look for the RewardsSection (Scala)
      const rewardsSection = document.querySelector('section[class*="bg-white min-h-screen"]')
      if (rewardsSection) {
        const rect = rewardsSection.getBoundingClientRect()
        // Change buttons to pink when RewardsSection is visible
        setUsePinkButtons(rect.top <= 100)
      }
    }

    // Use passive listener to avoid blocking other scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#173e44] overflow-hidden">
      {/* Solid Background */}
      <div className="absolute inset-0 z-0 bg-[#173e44]" />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 backdrop-blur-md">
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-0">
          {/* Logo */}
          <div className={`relative ${usePinkLogo ? '-ml-8 h-14 w-48 lg:h-16 lg:w-56' : '-ml-8 h-14 w-48 lg:h-16 lg:w-56'}`}>
            <Image
              src={usePinkLogo ? "/assets/Images/logo-pink.webp" : "/assets/Images/logo-white.webp"}
              alt="XQUISITO Logo"
              fill
              className="object-contain transition-opacity duration-500 ease-in-out"
              style={{ objectPosition: 'left center' }}
              priority
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-x-10">
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSolutionsMenu(!showSolutionsMenu)}
                className={`${usePinkButtons ? 'text-[#EAB3F4]' : 'text-white'} flex items-center gap-x-1 font-medium hover:text-[#EAB3F4] transition-colors font-helvetica`}
              >
                Soluciones
                <ChevronDown className={`w-4 h-4 transition-transform ${showSolutionsMenu ? 'rotate-180' : ''}`} />
              </button>
              {showSolutionsMenu && (
                <div className="absolute top-full mt-3 -left-40 w-[480px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 py-6 px-6 animate-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-2 gap-x-8">
                    {/* Column 1 */}
                    <div className="space-y-2">
                      <button onClick={() => scrollToStackedPanel(0)} className="group block w-full text-left px-4 py-3 text-gray-800 hover:text-[#EAB3F4] hover:bg-[#EAB3F4]/10 transition-all duration-200 rounded-xl font-medium text-sm border border-transparent hover:border-[#EAB3F4]/20">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#EAB3F4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          TAP ORDER & PAY
                        </div>
                      </button>
                      <button onClick={() => scrollToStackedPanel(2)} className="group block w-full text-left px-4 py-3 text-gray-800 hover:text-[#EAB3F4] hover:bg-[#EAB3F4]/10 transition-all duration-200 rounded-xl font-medium text-sm border border-transparent hover:border-[#EAB3F4]/20">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#EAB3F4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          FLEX BILL
                        </div>
                      </button>
                      <button onClick={() => scrollToStackedPanel(1)} className="group block w-full text-left px-4 py-3 text-gray-800 hover:text-[#EAB3F4] hover:bg-[#EAB3F4]/10 transition-all duration-200 rounded-xl font-medium text-sm border border-transparent hover:border-[#EAB3F4]/20">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#EAB3F4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          TAP & PAY
                        </div>
                      </button>
                    </div>
                    
                    {/* Column 2 */}
                    <div className="space-y-2">
                      <button onClick={() => scrollToStackedPanel(4)} className="group block w-full text-left px-4 py-3 text-gray-800 hover:text-[#EAB3F4] hover:bg-[#EAB3F4]/10 transition-all duration-200 rounded-xl font-medium text-sm border border-transparent hover:border-[#EAB3F4]/20">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#EAB3F4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          FOOD HALL
                        </div>
                      </button>
                      <button onClick={() => scrollToStackedPanel(3)} className="group block w-full text-left px-4 py-3 text-gray-800 hover:text-[#EAB3F4] hover:bg-[#EAB3F4]/10 transition-all duration-200 rounded-xl font-medium text-sm border border-transparent hover:border-[#EAB3F4]/20">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#EAB3F4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          PIK N GO
                        </div>
                      </button>
                      <a href="#rewards" onClick={() => setShowSolutionsMenu(false)} className="group block px-4 py-3 text-gray-800 hover:text-[#EAB3F4] hover:bg-[#EAB3F4]/10 transition-all duration-200 rounded-xl font-medium text-sm border border-transparent hover:border-[#EAB3F4]/20">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#EAB3F4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          SCALA
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Link */}
            <a href="#faq" className={`${usePinkButtons ? 'text-[#EAB3F4]' : 'text-white'} font-medium hover:text-[#EAB3F4] transition-colors font-helvetica`}>
              FAQ
            </a>

            {/* Demo Button */}
            <a 
              href="https://calendly.com/contacto-xquisito/new-meeting" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#EAB3F4] text-black font-bold px-6 py-3 rounded-full flex items-center gap-x-2 hover:bg-[#F5D0F9] transition-colors shadow-lg font-helvetica"
            >
              AGENDA TU DEMO
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-7xl mx-auto w-full -mt-20">
          <div className="grid lg:grid-cols-[1.7fr,1fr] gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight font-helvetica">
                Líder en <span className="text-[#EAB3F4] italic font-playfair font-light">soluciones digitales</span> para la hospitalidad
              </h1>
              
              <p className="text-lg lg:text-xl text-white/90 max-w-lg font-helvetica">
                Una plataforma digital que integra pedidos, pagos, marketing y datos de cada transacción y cliente para optimizar cada aspecto del negocio.
              </p>

              <a 
                href="https://calendly.com/contacto-xquisito/new-meeting" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#EAB3F4] text-black font-bold px-6 py-3 rounded-full inline-flex items-center gap-x-2 hover:bg-[#F5D0F9] transition-colors shadow-xl text-sm font-helvetica"
              >
                AGENDA TU DEMO
                <ArrowRight className="w-6 h-6" />
              </a>
            </div>

            {/* Right Content - Video */}
            <div className="relative pt-[250px]">
              {/* Main Video Container */}
              <div className="relative w-[700px] h-[424px] rounded-3xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/assets/Videos/hero-restaurant.webm" type="video/webm" />
                </video>
              </div>
              
              {/* Floating Card - Top Right */}
              <div className="absolute top-[100px] right-[-20px] bg-white/50 backdrop-blur-md rounded-2xl shadow-lg p-4 w-64 z-10 opacity-0 animate-slide-in-right">
                <div className="flex items-center gap-2 mb-3">
                  <ChevronDown className="w-4 h-4 rotate-90 text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-900">
                    Elige cómo dividir tu cuenta
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {/* Ingresar monto */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">Ingresar monto</span>
                  </div>
                  
                  {/* Dividir en partes iguales */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">Dividir en partes iguales</span>
                  </div>
                  
                  {/* Elegir productos */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Utensils className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm text-gray-700">Elegir productos</span>
                  </div>
                </div>
              </div>
              
              {/* Notification Cards - Bottom Right */}
              <div className="absolute bottom-[-40px] right-[600px] space-y-3 z-10 hidden lg:block">
                {/* Order Ready Notification */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl shadow-lg p-4 w-72 opacity-0 animate-fade-in-bounce">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        ¡Tu pedido está listo!
                      </p>
                      <p className="text-xs text-gray-600">
                        Pasa a recogerlo al mostrador
                      </p>
                    </div>
                  </div>
                </div>

                {/* Discount Notification */}
                <div className="bg-white/50 backdrop-blur-md rounded-2xl shadow-lg p-4 w-72 opacity-0 animate-fade-in-bounce-delay">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        20% de descuento disponible
                      </p>
                      <p className="text-xs text-gray-600">
                        En tu próximo postre favorito
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero