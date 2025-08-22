'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const PlatformSection: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [isAnimationActive, setIsAnimationActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight
      
      // Start pinning when the X box would be centered (accounting for 120% position)
      const pinTriggerPoint = -windowHeight * 0.7
      const endPinPoint = pinTriggerPoint - windowHeight * 6
      const shouldPin = rect.top <= pinTriggerPoint && rect.top > endPinPoint
      
      if (shouldPin) {
        setIsAnimationActive(true)
        // Calculate progress based on how much we've scrolled past the pin point
        const scrolledPastPin = Math.abs(rect.top - pinTriggerPoint)
        const extraScrollDistance = windowHeight * 6
        const progress = Math.min(Math.max(scrolledPastPin / extraScrollDistance, 0), 1)
        setScrollProgress(progress)
      } else if (rect.top > pinTriggerPoint) {
        setIsAnimationActive(false)
        setScrollProgress(0)
      } else if (rect.top <= endPinPoint) {
        setIsAnimationActive(true)
        setScrollProgress(1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getTransform = (startX: number, startY: number, index: number, finalX: number = 0, finalY: number = 0) => {
    const individualDelay = index * 0.04 // Cada elemento individual con delay de 0.04
    const rawProgress = Math.max(0, (scrollProgress - individualDelay) * 3) // Multiplicador 3x más sensible
    
    const convergencePhase = Math.min(1.2, rawProgress) // Permitir que vayan más allá del centro
    const fadePhase = Math.max(0, (rawProgress - 1.1) * 20) // Fade out comienza en 1.1 para que llegue al centro
    
    // Convergencia hacia la posición final especificada
    const x = startX * Math.pow(1 - Math.min(1, convergencePhase), 3) + finalX * Math.min(1, convergencePhase)
    const y = startY * Math.pow(1 - Math.min(1, convergencePhase), 3) + finalY * Math.min(1, convergencePhase)
    const opacity = scrollProgress > 0 ? Math.min(convergencePhase, 1 - fadePhase) : 0
    const scale = 0.3 + Math.min(1, convergencePhase) * 0.7 * (1 - fadePhase * 0.3)
    
    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      opacity: Math.max(0, opacity)
    }
  }

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-[#D4EDFF] to-[#C6E2FA] h-[450vh] relative">
      <div className={`w-full min-h-screen flex items-start justify-center pt-48 relative`} style={{
        position: scrollProgress > 0 && scrollProgress < 1 ? 'sticky' : 'relative',
        top: scrollProgress > 0 && scrollProgress < 1 ? '0' : 'auto'
      }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center z-10" style={{ 
          visibility: scrollProgress > 0 ? 'hidden' : 'visible',
          position: scrollProgress > 0 ? 'absolute' : 'relative',
          top: scrollProgress > 0 ? '-200vh' : '0'
        }}>
          <h2 className="mb-6">
            <span className="italic text-[#009DFF] font-playfair font-light text-5xl lg:text-6xl">Una sola plataforma</span><span style={{marginLeft: '15px'}}></span><span className="text-[#000000] font-medium" style={{fontFamily: 'Helvetica Neue', fontWeight: 500, fontSize: '65px', lineHeight: '65px'}}>para centralizar<br />
            pedidos, pagos y marketing.</span>
          </h2>
          
          <p className="text-[#000000] text-lg opacity-80 mb-8 max-w-[600px] mx-auto leading-relaxed">
            Nuestra solución tecnológica NFC para optimizar el servicio, integrar la operación de
            mesa y ofrecer datos estratégicos que impulsen la fidelidad y las ventas.
          </p>
          
          <button className="bg-[#EAB3F4] text-[#000000] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#E1A8EE] transition-colors duration-300 shadow-lg">
            Solicitar tu demo →
          </button>
        </div>

      <div className="absolute inset-0 pointer-events-none" style={{ opacity: scrollProgress >= 0 ? 1 : 0 }}>
        <div className={`absolute left-[25%] transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(-300, -450, 0, -50, -80),
            top: scrollProgress > 0 ? '25%' : '85%'
          }}>
          <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">📝</span>
          </div>
        </div>
        <div className={`absolute left-[5%] bg-[#FFE4B5] px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(-600, 0, 0, 450, 0),
            top: scrollProgress > 0 ? '50%' : '50%'
          }}>
          <span className="text-[#D2691E] text-sm font-semibold">📝 Pedidos en mesa</span>
        </div>

        <div className={`absolute right-[20%] transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(500, -300, 2),
            top: scrollProgress > 0 ? '40%' : '100%'
          }}>
          <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">💳</span>
          </div>
        </div>
        <div className={`absolute right-[8%] bg-[#FFB6C1] px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(-350, -400, 1, -415, -20),
            top: scrollProgress > 0 ? '45%' : '105%'
          }}>
          <span className="text-[#DC143C] text-sm font-semibold">💳 Pagos flexibles</span>
        </div>

        <div className={`absolute left-[18%] transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(-550, 400, 4),
            top: scrollProgress > 0 ? '70%' : '130%'
          }}>
          <div className="relative w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">📱</span>
          </div>
        </div>
        <div className={`absolute left-[45%] bg-[#E6E6FA] px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(0, 400, 1, 0, -65),
            top: scrollProgress > 0 ? '65%' : '170%'
          }}>
          <span className="text-[#9370DB] text-sm font-semibold">📱 Campañas personalizadas</span>
        </div>

        <div className={`absolute right-[15%] transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(550, 420, 6),
            top: scrollProgress > 0 ? '75%' : '135%'
          }}>
          <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">🔗</span>
          </div>
        </div>
        <div className={`absolute right-[5%] bg-[#F0FFF0] px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(600, 390, 1, -425, 0),
            top: scrollProgress > 0 ? '50%' : '50%'
          }}>
          <span className="text-[#228B22] text-sm font-semibold">🔗 Integración con POS</span>
        </div>


        <div className={`absolute right-[10%] transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(600, -50, 10),
            top: scrollProgress > 0 ? '50%' : '110%'
          }}>
          <div className="relative w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">💬</span>
          </div>
        </div>
        <div className={`absolute right-[25%] bg-[#F5F5DC] px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(400, 200, 11),
            top: scrollProgress > 0 ? '55%' : '115%'
          }}>
          <span className="text-[#8B4513] text-lg font-bold">🛒 Pedidos múltiples</span>
        </div>

        <div className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`} 
          style={{ 
            top: scrollProgress > 0 ? '50%' : '120%',
            transition: 'none',
            opacity: 1
          }}>
          <div className="relative w-32 h-32 bg-[#073C47] rounded-2xl flex items-center justify-center shadow-2xl">
            <Image 
              src="/assets/Images/logo-short-white.webp" 
              alt="Xquisito Logo" 
              width={64} 
              height={64}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default PlatformSection