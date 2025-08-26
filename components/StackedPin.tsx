'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import StackedPanel from './StackedPanel'

export interface Panel {
  id: string
  title?: string
  subtitle?: string
  content?: React.ReactNode
  imageUrl?: string
  buttonText?: string
  features?: string[]
  benefits?: string[]
}

export interface StackedPinProps {
  panels: Panel[]
  sectionId?: string
  className?: string
  enterOffsetPx?: number
}

const StackedPin: React.FC<StackedPinProps> = ({
  panels,
  sectionId = 'stacked-pin',
  className = '',
  enterOffsetPx = 30
}) => {
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number | null>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const sectionHeight = sectionRef.current.offsetHeight
    const viewportHeight = window.innerHeight
    
    // Calculate progress (0 to 1)
    const scrollProgress = (window.scrollY - sectionTop) / (sectionHeight - viewportHeight)
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
    
    setProgress(clampedProgress)
  }, [])

  useEffect(() => {
    const throttledScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      rafRef.current = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', throttledScroll)
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleScroll])

  // Panel content based on the screenshots
  const panelContents = [
    {
      // Panel A: Tap, Order & Pay
      title: "Tap Order & Pay",
      subtitle: "",
      imageUrl: "/assets/Images/phone-mockup-1.png",
      features: ["Funciones"],
      benefits: ["Beneficios"],
      functionsText: "Menú digital al instante vía tarjeta NFC, pedidos desde el celular y pago sin contacto.",
      benefitsText: "Agiliza el servicio sin intervención del personal, mejora la experiencia y reduce filas."
    },
    {
      // Panel B: Tap & Pay
      title: "Tap & Pay",
      subtitle: "",
      imageUrl: "/assets/Images/phone-mockup-2.png",
      features: ["Funciones"],
      benefits: ["Beneficios"],
      functionsText: "Permite al cliente revisar su cuenta digitalmente y pagar desde su celular.",
      benefitsText: "Mejora el cierre de la experiencia y reduce tiempos operativos."
    },
    {
      // Panel C: Flex Bill
      title: "Flex Bill",
      subtitle: "",
      imageUrl: "/assets/Images/tablet-mockup.png",
      features: ["Funciones"],
      benefits: ["Beneficios"],
      functionsText: "Cuenta compartida por mesa, pedidos individuales y pago dividido automático.",
      benefitsText: "Cada cliente ordena y paga desde su celular, sin errores ni confusión al dividir la cuenta."
    },
    {
      // Panel D: Pick n Go
      title: "Pick n Go",
      subtitle: "",
      imageUrl: "/assets/Images/phone-mockup-3.png",
      features: ["Funciones"],
      benefits: ["Beneficios"],
      functionsText: "Orden anticipada, pago en línea y retiro sin contacto.",
      benefitsText: "Reduce tiempos de espera, ideal para clientes que buscan rapidez y conveniencia."
    },
    {
      // Panel E: Food Hall
      title: "Food Hall",
      subtitle: "",
      imageUrl: "/assets/Images/tablet-mockup-2.png",
      features: ["Funciones"],
      benefits: ["Beneficios"],
      functionsText: "Unifica pedidos de distintos locales en una sola orden y cobro.",
      benefitsText: "Mejora la eficiencia operativa y ofrece comodidad al cliente en espacios con múltiples marcas."
    }
  ]

  // Merge panel data with content
  const enrichedPanels = panels.map((panel, index) => ({
    ...panel,
    ...panelContents[index]
  }))

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`min-h-[800vh] relative ${className}`}
    >
      <div className="sticky top-0 h-screen">
        <div className="relative h-full">
          {/* Progress indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="w-96 h-0.5 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-none"
                style={{
                  width: `${progress * 100}%`
                }}
              />
            </div>
          </div>
          
          {enrichedPanels.map((panel, index) => {
            // First panel is always active, others activate based on progress
            const isActive = index === 0 ? true : progress * (panels.length - 1) > (index - 1)
            
            return (
              <StackedPanel
                key={panel.id}
                id={panel.id}
                isActive={isActive}
                progress={progress}
                index={index}
                totalPanels={panels.length}
                enterOffsetPx={enterOffsetPx}
                reducedMotion={reducedMotion}
                content={
                  <div className="w-full h-full flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 pr-0 md:pr-8 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 md:mb-12 -mt-4 md:-mt-8">
                        {panel.title}
                      </h2>
                      <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 px-4 md:px-0">
                        {panel.subtitle}
                      </p>
                      
                      <div className="space-y-4 mb-8">
                        {panel.features && (
                          <div className="group">
                            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                              <span className="text-white">{panel.features[0]}</span>
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <span className="text-black font-bold text-lg">+</span>
                              </div>
                            </div>
                            {/* Tooltip expandido que empuja el contenido */}
                            <div className="overflow-hidden transition-all duration-300 group-hover:max-h-40 max-h-0">
                              <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg mt-2 border border-white/20">
                                <p className="text-white text-sm">
                                  {enrichedPanels[index].functionsText || "Tecnología NFC integrada, menú digital interactivo, procesamiento de pagos seguro, seguimiento de pedidos en tiempo real."}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        {panel.benefits && (
                          <div className="group">
                            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                              <span className="text-white">{panel.benefits[0]}</span>
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <span className="text-black font-bold text-lg">+</span>
                              </div>
                            </div>
                            {/* Tooltip expandido que empuja el contenido */}
                            <div className="overflow-hidden transition-all duration-300 group-hover:max-h-40 max-h-0">
                              <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg mt-2 border border-white/20">
                                <p className="text-white text-sm">
                                  {enrichedPanels[index].benefitsText || "Reducción del 60% en tiempo de servicio, incremento del 25% en satisfacción del cliente, eliminación de errores manuales en pedidos."}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {panel.buttonText && (
                        <button className="bg-[#EAB3F4] text-black font-bold px-6 py-3 rounded-full hover:bg-[#F5D0F9] transition-colors">
                          {panel.buttonText} →
                        </button>
                      )}
                    </div>

                    {panel.imageUrl && (
                      <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
                        {index === 0 ? (
                          <div 
                            className="w-64 h-96 md:w-80 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out"
                            style={{
                              transform: isActive ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.9)',
                              opacity: isActive ? 1 : 0.7
                            }}
                          >
                            <video 
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                              className="w-full h-full object-cover"
                            >
                              <source src="/assets/Videos/Tap, Order & Pay.webm" type="video/webm" />
                            </video>
                          </div>
                        ) : index === 1 ? (
                          <div 
                            className="w-64 h-96 md:w-80 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out"
                            style={{
                              transform: isActive ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.9)',
                              opacity: isActive ? 1 : 0.7
                            }}
                          >
                            <video 
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                              className="w-full h-full object-cover"
                            >
                              <source src="/assets/Videos/Tap and Pay.webm" type="video/webm" />
                            </video>
                          </div>
                        ) : index === 2 ? (
                          <div 
                            className="w-[450px] h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out"
                            style={{
                              transform: isActive ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.9)',
                              opacity: isActive ? 1 : 0.7
                            }}
                          >
                            <video 
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                              className="w-full h-full object-cover"
                            >
                              <source src="/assets/Videos/Flex Bill.webm" type="video/webm" />
                            </video>
                          </div>
                        ) : index === 3 ? (
                          <div 
                            className="w-64 h-96 md:w-80 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out"
                            style={{
                              transform: isActive ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.9)',
                              opacity: isActive ? 1 : 0.7
                            }}
                          >
                            <video 
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                              className="w-full h-full object-cover"
                            >
                              <source src="/assets/Videos/Pick & Go.webm" type="video/webm" />
                            </video>
                          </div>
                        ) : index === 4 ? (
                          <div 
                            className="w-[450px] h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out"
                            style={{
                              transform: isActive ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.9)',
                              opacity: isActive ? 1 : 0.7
                            }}
                          >
                            <video 
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                              className="w-full h-full object-cover"
                            >
                              <source src="/assets/Videos/Food Hall.webm" type="video/webm" />
                            </video>
                          </div>
                        ) : (
                          <div className="w-80 h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl flex items-center justify-center">
                            <span className="text-white/50 text-2xl">Device Mockup</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                }
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StackedPin