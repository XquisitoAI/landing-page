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

  const getTransform = (startX: number, startY: number, index: number) => {
    const individualDelay = index * 0.04 // Cada elemento individual con delay de 0.04
    const rawProgress = Math.max(0, (scrollProgress - individualDelay) * 3) // Multiplicador 3x más sensible
    
    const convergencePhase = Math.min(1.2, rawProgress) // Permitir que vayan más allá del centro
    const fadePhase = Math.max(0, (rawProgress - 0.95) * 20) // Fade out comienza en 0.95 y es muy rápido
    
    // Convergencia hacia el centro exacto
    const x = startX * Math.pow(1 - Math.min(1, convergencePhase), 3)
    const y = startY * Math.pow(1 - Math.min(1, convergencePhase), 3)
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
          <h2 className="text-5xl lg:text-6xl font-bold text-[#073C47] mb-6 font-helvetica">
            <span className="italic text-[#3B82F6] font-playfair font-light">Una sola plataforma</span> para centralizar<br />
            pedidos, pagos y marketing.
          </h2>
          
          <p className="text-[#073C47] text-lg opacity-80 mb-8 max-w-[600px] mx-auto leading-relaxed">
            Nuestra solución tecnológica NFC para optimizar el servicio, integrar la operación de
            mesa y ofrecer datos estratégicos que impulsen la fidelidad y las ventas.
          </p>
          
          <button className="bg-[#EAB3F4] text-[#073C47] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#E1A8EE] transition-colors duration-300 shadow-lg">
            Solicitar tu demo →
          </button>
        </div>

      <div className="absolute inset-0 pointer-events-none" style={{ opacity: scrollProgress >= 0 ? 1 : 0 }}>
        <div className={`absolute left-[15%] transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(-500, -300, 0),
            top: scrollProgress > 0 ? '45%' : '105%'
          }}>
          <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">📝</span>
          </div>
        </div>
        <div className={`absolute left-[8%] bg-[#FFE4B5] px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(-600, -250, 1),
            top: scrollProgress > 0 ? '38%' : '98%'
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
            ...getTransform(600, -200, 3),
            top: scrollProgress > 0 ? '45%' : '105%'
          }}>
          <span className="text-[#DC143C] text-sm font-semibold">💳 Pagos digitales</span>
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
        <div className={`absolute left-[5%] bg-[#E6E6FA] px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(-650, 450, 5),
            top: scrollProgress > 0 ? '77%' : '137%'
          }}>
          <span className="text-[#9370DB] text-sm font-semibold">📱 Campañas automatizadas</span>
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
            ...getTransform(650, 500, 7),
            top: scrollProgress > 0 ? '82%' : '142%'
          }}>
          <span className="text-[#228B22] text-sm font-semibold">🔗 Integración con POS</span>
        </div>

        <div className={`absolute left-[8%] transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(-600, -50, 8),
            top: scrollProgress > 0 ? '55%' : '115%'
          }}>
          <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">📊</span>
          </div>
        </div>
        <div className={`absolute left-[25%] bg-[#FFF8DC] px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(-400, 250, 9),
            top: scrollProgress > 0 ? '62%' : '122%'
          }}>
          <span className="text-[#DAA520] text-sm font-semibold">📊 Análisis para reenvío</span>
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
        <div className={`absolute right-[25%] bg-[#F5F5DC] px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-out z-20`} 
          style={{
            ...getTransform(400, 200, 11),
            top: scrollProgress > 0 ? '55%' : '115%'
          }}>
          <span className="text-[#8B4513] text-sm font-semibold">💬 Feedback inmediato</span>
        </div>

        <div className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`} 
          style={{ 
            top: scrollProgress > 0 ? '50%' : '120%',
            transition: 'none',
            opacity: 1
          }}>
          <div className="relative w-32 h-32 bg-[#073C47] rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-white text-2xl font-bold">X</span>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default PlatformSection