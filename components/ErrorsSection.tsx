'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FileSignature, AlertTriangle, CreditCard } from 'lucide-react'

const CountUpNumber: React.FC<{ end: number; duration?: number; delay?: number }> = ({ end, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const startAnimation = () => {
      let startTime: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * end))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }

    setTimeout(startAnimation, delay)
  }, [isVisible, end, duration, delay])

  return (
    <div ref={ref} className="text-[#A1C8F2] text-4xl md:text-5xl font-bold" style={{ marginBottom: '34px' }}>
      {count}%
    </div>
  )
}

const CountUpRange: React.FC<{ start: number; end: number; duration?: number }> = ({ start, end, duration = 2000 }) => {
  const [countStart, setCountStart] = useState(0)
  const [countEnd, setCountEnd] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCountStart(Math.floor(easeOutQuart * start))
      setCountEnd(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, start, end, duration])

  return (
    <div ref={ref} className="text-[#A1C8F2] text-4xl md:text-5xl font-bold" style={{ marginBottom: '34px' }}>
      {countStart}% - {countEnd}%
    </div>
  )
}

const ErrorsSection: React.FC = () => {
  return (
    <section className="bg-[#28272C] min-h-screen flex items-center">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 md:mb-20 font-helvetica" style={{ marginLeft: '2px', marginTop: '60px' }}>
          3 errores comunes que<br />
          <span className="italic text-[#A1C8F2] font-playfair font-light">frenan tu operación</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-64" style={{ marginTop: '80px' }}>
          <div className="flex flex-col" aria-label="Error de pedidos lentos" style={{ marginTop: '-35px' }}>
            <div style={{ marginBottom: '60px' }}>
              <div className="relative w-24 h-24">
                <Image
                  src="/assets/Images/Bad-Orders.webp"
                  alt="Bad Orders Icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="text-white text-xl md:text-2xl" style={{ marginBottom: '30px' }}>Pedidos lentos y errores</h3>
            <CountUpNumber end={42} delay={400} />
            <p className="text-white opacity-90 leading-snug max-w-[220px]">
              de los comensales considera las largas esperas la principal razón para no volver.
            </p>
          </div>

          <div className="flex flex-col" aria-label="Error de falta de datos" style={{ marginTop: '-65px' }}>
            <div style={{ marginBottom: '57px' }}>
              <div className="relative w-32 h-32" style={{ marginLeft: '-17px' }}>
                <Image
                  src="/assets/Images/Bad-Data.webp"
                  alt="Bad Data Icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="text-white text-xl md:text-2xl" style={{ marginBottom: '30px' }}>Falta de datos reales</h3>
            <CountUpNumber end={30} delay={1400} />
            <p className="text-white opacity-90 leading-snug max-w-[220px]">
              de incremento en ventas con personalización basada en datos.
            </p>
          </div>

          <div className="flex flex-col" aria-label="Error de pagos complicados" style={{ marginTop: '-37px' }}>
            <div style={{ marginBottom: '60px' }}>
              <div className="relative w-24 h-24">
                <Image
                  src="/assets/Images/Bad-Payments.webp"
                  alt="Bad Payments Icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="text-white text-xl md:text-2xl" style={{ marginBottom: '30px' }}>Pagos complicados</h3>
            <CountUpNumber end={68} delay={2400} />
            <p className="text-white opacity-90 leading-snug max-w-[220px]">
              de los clientes prefiere opciones de pago sin contacto y rápidos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorsSection