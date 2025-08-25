'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Star, Gift } from 'lucide-react'

const RewardsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])
  return (
    <section ref={sectionRef} className="bg-white min-h-screen px-8 md:px-16 flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-12 md:grid md:grid-cols-2 md:gap-16 items-center">
          {/* Columna izquierda - Contenido de texto */}
          <div className="space-y-9">
            <p className="text-black font-bold uppercase tracking-wider font-helvetica" style={{ fontSize: '25px', fontWeight: 700 }}>
              SCALA
            </p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
Transforma información{' '}
              <br />
              en <span className="text-[#593EFF] italic">clientes recurrentes</span>
            </h2>
            
            <p className="text-base md:text-lg text-gray-700 mt-6 leading-relaxed">
            Xquisito recopila datos reales de consumo, como la frecuencia de visita, los platillos favoritos, la edad, el género y el ticket promedio. Esto con el objetivo de que el restaurante pueda diseñar promociones y campañas personalizadas que fortalezcan la fidelidad de los clientes y aumenten las ventas. Todo se administra de manera sencilla a través de un panel de control.
            </p>
            
            <button className="bg-[#F0A7E2] text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#e68cd6] transition-colors mt-8 inline-flex items-center gap-2">
              AGENDA TU DEMO
              <span>→</span>
            </button>
          </div>

          {/* Columna derecha - Imagen con elementos flotantes */}
          <div className="relative w-full overflow-visible">
            <div className="rounded-xl overflow-hidden relative">
              <Image
                src="/assets/Images/lady.webp"
                alt="Mujer usando su teléfono para pagar"
                width={600}
                height={450}
                className="w-full h-auto aspect-[4/3] object-cover"
                priority
              />
            </div>
            
            {/* Contenedor para burbujas con overflow visible */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {/* Burbuja 1 - Puntos ganados */}
              <div className={`absolute bg-white/50 backdrop-blur-md rounded-2xl shadow-lg p-4 w-72 ${isVisible ? 'opacity-0 animate-fade-in-bounce' : 'opacity-0'}`} style={{ top: '240px', right: '10px' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                    ¡Haz ganado 20 puntos!
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Burbuja 2 - Descuento */}
              <div className={`absolute bg-white/50 backdrop-blur-md rounded-2xl shadow-lg p-4 w-72 ${isVisible ? 'opacity-0 animate-fade-in-bounce-delay' : 'opacity-0'}`} style={{ bottom: '60px', right: '-45px' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      20% en tu próxima visita
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RewardsSection