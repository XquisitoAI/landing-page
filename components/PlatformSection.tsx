'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ClipboardList } from 'lucide-react'

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
      const endPinPoint = pinTriggerPoint - windowHeight * 15 // Reducido para terminar cuando fade out completo
      const shouldPin = rect.top <= pinTriggerPoint && rect.top > endPinPoint
      
      if (shouldPin) {
        setIsAnimationActive(true)
        // Calculate progress based on how much we've scrolled past the pin point
        const scrolledPastPin = Math.abs(rect.top - pinTriggerPoint)
        const extraScrollDistance = windowHeight * 15 // Reducido para terminar cuando fade out completo
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
    // Delays especiales para elementos específicos
    let individualDelay;
    if (index === 1) {
      individualDelay = 0.06; // Amarillo - reducido para que salga cuando friends esté por desaparecer
    } else if (index === 7) {
      individualDelay = 0.06; // POS - mismo delay que pedidos en mesa para sincronizar
    } else if (index === 2 || index === 4) {
      individualDelay = 0.15; // pagando.webp y beer.webp sincronizados
    } else if (index === 3 || index === 5) {
      individualDelay = 0.25; // pagos flexibles y campañas personalizadas sincronizados
    } else {
      individualDelay = index * 0.06;
    }
    // Para la imagen friends (índice 0) y cel (índice 6), usar un progreso más suave y que empiece antes
    const adjustedProgress = (index === 0 || index === 6) ? Math.max(0, scrollProgress * 1.5) : Math.max(0, scrollProgress - individualDelay)
    
    // Si el progreso ajustado es 0, el elemento no debe aparecer aún
    if (adjustedProgress <= 0) {
      return {
        transform: `translate(${startX}px, ${startY}px) scale(1)`,
        opacity: 0
      }
    }
    
    // Mismo multiplicador de velocidad para todos los elementos
    const rawProgress = adjustedProgress * 5
    
    // Progreso lineal uniforme para todos
    const linearProgress = Math.min(1, rawProgress)
    
    // Interpolación lineal directa para TODOS los elementos
    const x = startX + (finalX - startX) * linearProgress
    const y = startY + (finalY - startY) * linearProgress
    
    // Caso especial para friends.webp (índice 0) y cel.webp (índice 6) - fade out al llegar al destino
    let opacity, scale;
    if (index === 0 || index === 6) {
      // Fade out más corto, empieza al 85% del recorrido
      const fadeOutPhase = Math.max(0, (linearProgress - 0.85) * 6.7);
      opacity = Math.max(0, 1 - fadeOutPhase); // Asegurar que llegue a 0
      // Si está al final del recorrido, forzar opacidad a 0
      if (linearProgress >= 1) {
        opacity = 0;
      }
      scale = 1; // Mantener tamaño original
    } else if (index === 1 || index === 7) {
      // Para el amarillo (pedidos en mesa) y POS, fade out más corto y tardío
      const fadePhase = Math.max(0, (linearProgress - 0.8) * 10);
      opacity = 1 - fadePhase;
      scale = 1; // Mantener tamaño original
    } else if (index === 2 || index === 4) {
      // Para pagando.webp y beer.webp, fade out antes de llegar al final
      const fadePhase = Math.max(0, (linearProgress - 0.85) * 6.7);
      opacity = 1 - fadePhase;
      scale = 1; // Mantener tamaño original
    } else if (index === 3 || index === 5) {
      // Para "Pagos flexibles" y "Campañas personalizadas", fade out antes de llegar al final
      const fadePhase = Math.max(0, (linearProgress - 0.85) * 6.7);
      opacity = 1 - fadePhase;
      scale = 1; // Mantener tamaño original
    } else {
      // Para los demás elementos, mantener comportamiento actual
      const fadePhase = Math.max(0, (rawProgress - 1.1) * 20);
      opacity = 1 - fadePhase;
      scale = 1 - fadePhase * 0.2;
    }
    
    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      opacity: Math.max(0, opacity)
    }
  }

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-[#D4EDFF] to-[#C6E2FA] h-[900vh] relative">
      <div className={`w-full min-h-screen flex items-start justify-center pt-24 md:pt-48 relative`} style={{
        position: scrollProgress > 0 && scrollProgress < 1 ? 'sticky' : 'relative',
        top: scrollProgress > 0 && scrollProgress < 1 ? '0' : 'auto'
      }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12 text-center z-10" style={{ 
          visibility: scrollProgress > 0 ? 'hidden' : 'visible',
          position: scrollProgress > 0 ? 'absolute' : 'relative',
          top: scrollProgress > 0 ? '-200vh' : '0'
        }}>
          <h2 className="mb-4 md:mb-6">
            <span className="italic text-[#009DFF] font-playfair font-light text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Una sola plataforma</span><span className="hidden md:inline" style={{marginLeft: '15px'}}></span><span className="text-[#000000] font-medium text-3xl md:text-4xl lg:text-5xl xl:text-6xl block md:inline" style={{fontFamily: 'Helvetica Neue', fontWeight: 500, lineHeight: '1.1'}}>para centralizar<br />
            pedidos, pagos y marketing.</span>
          </h2>
          
          <p className="text-[#000000] text-base md:text-lg opacity-80 mb-6 md:mb-8 max-w-[600px] mx-auto leading-relaxed px-4 md:px-0">
            Nuestra solución tecnológica NFC para optimizar el servicio, integrar la operación de
            mesa y ofrecer datos estratégicos que impulsen la fidelidad y las ventas.
          </p>
          
          <button className="bg-[#EAB3F4] text-[#000000] px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-[#E1A8EE] transition-colors duration-300 shadow-lg">
            Solicitar tu demo →
          </button>
        </div>

<div className="absolute inset-0 pointer-events-none" style={{ opacity: scrollProgress >= 0 ? 1 : 0 }}>
        <div className={`absolute left-[25%] z-20`} 
          style={{
            ...getTransform(-800, -900, 0, 150, -250),
            top: `${85 - (60 * Math.min(1, scrollProgress * 2.1))}%`
          }}>
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg overflow-hidden">
            <Image 
              src="/assets/Images/friends.webp" 
              alt="Friends" 
              width={128} 
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className={`absolute left-[5%] bg-[#FFE4B5] px-4 py-2 rounded-full shadow-md z-20`} 
          style={{
            ...getTransform(-600, 0, 1, 450, 0),
            top: scrollProgress > 0 ? '50%' : '50%'
          }}>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-[#D2691E]" />
            <span className="text-[#D2691E] text-sm font-semibold">Pedidos en mesa</span>
          </div>
        </div>

        <div className={`absolute right-[20%] md:right-[20%] z-20 hidden md:block`} 
          style={{
            ...getTransform( 568, -800, 2, -240, -130),
            top: scrollProgress > 0 ? '50%' : '50%'
          }}>
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg overflow-hidden">
            <Image 
              src="/assets/Images/pagando.webp" 
              alt="Pagando" 
              width={128} 
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className={`absolute right-[8%] bg-[#FFB6C1] px-3 md:px-4 py-2 rounded-full shadow-md z-20 hidden md:block`} 
          style={{
            ...getTransform(-517, -1120, 3, -517, -70),
            top: scrollProgress > 0 ? '45%' : '105%'
          }}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#DC143C]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
            </svg>
            <span className="text-[#DC143C] text-sm font-semibold">Pagos flexibles</span>
          </div>
        </div>

        <div className={`absolute left-[18%] z-20`} 
          style={{
            ...getTransform(-550, 400, 4, 260, -130),
            top: scrollProgress > 0 ? '70%' : '130%'
          }}>
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg overflow-hidden">
            <Image 
              src="/assets/Images/beer.webp" 
              alt="Beer" 
              width={128} 
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className={`absolute left-[45%] bg-[#E6E6FA] px-4 py-2 rounded-full shadow-md z-20`} 
          style={{
            ...getTransform(-40, 1000, 5, -40, -50),
            top: scrollProgress > 0 ? '65%' : '170%'
          }}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#9370DB]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.707 2.293a1 1 0 010 1.414l-13 13a1 1 0 01-1.414-1.414l13-13a1 1 0 011.414 0zM7 5a2 2 0 11-4 0 2 2 0 014 0zM17 15a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-[#9370DB] text-sm font-semibold">Campañas personalizadas</span>
          </div>
        </div>

        <div className={`absolute right-[10%] z-20`} 
          style={{
            ...getTransform(590, 800, 6, -360, 150),
            top: `${15 + (60 * Math.min(1, scrollProgress * 2.1))}%`
          }}>
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg overflow-hidden">
            <Image 
              src="/assets/Images/cel.webp" 
              alt="Cel" 
              width={128} 
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className={`absolute right-[5%] bg-[#F0FFF0] px-4 py-2 rounded-full shadow-md z-20`} 
          style={{
            ...getTransform(600, 0, 7, -450, 0),
            top: scrollProgress > 0 ? '50%' : '50%'
          }}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#228B22]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
            <span className="text-[#228B22] text-sm font-semibold">Integración con POS</span>
          </div>
        </div>




        <div className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`} 
          style={{ 
            top: scrollProgress > 0 ? '50%' : '120%',
            transition: 'none',
            opacity: 1
          }}>
          <div className="relative w-32 h-32 bg-[#073C47] rounded-2xl flex items-center justify-center shadow-2xl" style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 15px 40px rgba(0, 0, 0, 0.2)' }}>
            {/* SVG para el borde dinámico */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 128 128"
              style={{ overflow: 'visible' }}
            >
              <rect
                x="0"
                y="0"
                width="128"
                height="128"
                rx="16"
                ry="16"
                fill="none"
                stroke="#EAB3F4"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="400"
                strokeDashoffset={scrollProgress > 0 ? (400 - (scrollProgress * 820)) : 400}
                opacity={scrollProgress > 0 ? 1 : 0}
                pathLength="400"
                style={{
                  transition: 'none'
                }}
              />
            </svg>
            <Image 
              src="/assets/Images/logo-short-white.webp" 
              alt="Xquisito Logo" 
              width={64} 
              height={64}
              className="object-contain relative z-10"
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default PlatformSection