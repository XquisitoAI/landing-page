'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ArrowRight, Bell, Wallet, Users, ShoppingBag, DollarSign, UserCheck, Utensils } from 'lucide-react'

const Hero: React.FC = () => {
  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#173e44] overflow-hidden">
      {/* Solid Background */}
      <div className="absolute inset-0 z-0 bg-[#173e44]" />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 backdrop-blur-md">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative h-12 w-40 lg:h-14 lg:w-48">
            <Image
              src="/assets/Images/logo-white.webp"
              alt="XQUISITO Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-x-8">
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSolutionsMenu(!showSolutionsMenu)}
                className="text-white flex items-center gap-x-1 font-medium hover:text-[#EAB3F4] transition-colors font-helvetica"
              >
                Soluciones
                <ChevronDown className={`w-4 h-4 transition-transform ${showSolutionsMenu ? 'rotate-180' : ''}`} />
              </button>
              {showSolutionsMenu && (
                <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-2xl py-2">
                  <a href="#" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors">Gestión de Pedidos</a>
                  <a href="#" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors">Pagos Digitales</a>
                  <a href="#" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors">Marketing Automatizado</a>
                  <a href="#" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors">Análisis de Datos</a>
                </div>
              )}
            </div>

            {/* FAQ Link */}
            <a href="#" className="text-white font-medium hover:text-[#EAB3F4] transition-colors font-helvetica">
              FAQ
            </a>

            {/* Demo Button */}
            <button className="bg-[#EAB3F4] text-black font-bold px-6 py-3 rounded-full flex items-center gap-x-2 hover:bg-[#F5D0F9] transition-colors shadow-lg font-helvetica">
              AGENDA TU DEMO
              <ArrowRight className="w-5 h-5" />
            </button>
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

              <button className="bg-[#EAB3F4] text-black font-bold px-8 py-4 rounded-full flex items-center gap-x-2 hover:bg-[#F5D0F9] transition-colors shadow-xl text-lg font-helvetica">
                AGENDA TU DEMO
                <ArrowRight className="w-6 h-6" />
              </button>
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
              <div className="absolute bottom-[-40px] right-[600px] space-y-3 z-10">
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