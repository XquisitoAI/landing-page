'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
}

const FAQSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id)
  }

  const clientFAQs: FAQItem[] = [
    {
      id: 1,
      question: "¿Necesito descargar la app o conectarme a una red Wi-Fi para usarla?",
      answer: "No necesitas descargar ninguna app. Solo acerca tu teléfono a la tarjeta NFC y automáticamente se abrirá el menú digital en tu navegador. Tampoco necesitas conectarte a una red Wi-Fi específica, funciona con tu conexión a internet móvil."
    },
    {
      id: 2,
      question: "¿Es seguro pagar por aquí?",
      answer: "Sí, es completamente seguro. Utilizamos encriptación de grado bancario y cumplimos con todos los estándares de seguridad PCI DSS. Tus datos de pago están protegidos con la misma tecnología que usan los bancos más grandes del mundo."
    },
    {
      id: 3,
      question: "¿Puedo dividir la cuenta fácilmente?",
      answer: "¡Por supuesto! Con nuestra función Flex Bill, cada persona puede unirse a la cuenta tocando la tarjeta NFC y pagar solo por lo que consumió, o dividir todo en partes iguales. Es automático y sin complicaciones."
    }
  ]

  const establishmentFAQs: FAQItem[] = [
    {
      id: 4,
      question: "¿Qué beneficio tengo si el pago se hace por la app?",
      answer: "Obtienes múltiples beneficios: reduces tiempos de espera hasta en 60%, eliminas errores en pedidos, recopilas datos valiosos de tus clientes para marketing personalizado, y reduces la necesidad de personal para tomar pedidos y cobros."
    },
    {
      id: 5,
      question: "¿Es compatible con mi POS actual?",
      answer: "Sí, Xquisito se integra con los sistemas POS más populares del mercado. Nuestro equipo técnico se encarga de la integración sin interrumpir tus operaciones actuales. La implementación es rápida y sencilla."
    },
    {
      id: 6,
      question: "¿Me ayudará a vender más?",
      answer: "Definitivamente. Los restaurantes que usan Xquisito reportan un aumento promedio del 25% en ventas gracias a las recomendaciones personalizadas, promociones dirigidas, y la mejora en la experiencia del cliente que fomenta las visitas recurrentes."
    }
  ]

  return (
    <section className="bg-gray-50 min-h-screen px-8 md:px-16 flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Columna izquierda - Imagen */}
          <div className="relative max-w-lg mx-auto mt-20">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/Images/coffee-machine.webp"
                alt="Máquina de café profesional en cocina de restaurante"
                width={450}
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Columna derecha - FAQ Content */}
          <div className="lg:pl-8 mt-20">
            {/* Header */}
            <div className="mb-12">
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-4">
                FAQs
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4">
                ¿Tienes <span className="text-[#593EFF] italic font-playfair font-light">dudas?</span>
              </h2>
              <p className="text-base text-gray-600 mt-4">
                Encuentra respuestas rápidas a las dudas más comunes sobre Xquisito.
              </p>
            </div>

            {/* Cliente Section */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#593EFF] uppercase tracking-wider mb-4">
                CLIENTE
              </h3>
              <div className="space-y-0">
                {clientFAQs.map((faq) => (
                  <div key={faq.id} className="border-b border-gray-200">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full py-4 text-left flex items-center justify-between cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
                    >
                      <span className="text-base font-medium text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      {activeItem === faq.id ? (
                        <Minus className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        activeItem === faq.id ? 'max-h-48 pb-4' : 'max-h-0'
                      }`}
                    >
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Establecimiento Section */}
            <div>
              <h3 className="text-sm font-bold text-[#593EFF] uppercase tracking-wider mb-4">
                ESTABLECIMIENTO
              </h3>
              <div className="space-y-0">
                {establishmentFAQs.map((faq) => (
                  <div key={faq.id} className="border-b border-gray-200">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full py-4 text-left flex items-center justify-between cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
                    >
                      <span className="text-base font-medium text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      {activeItem === faq.id ? (
                        <Minus className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        activeItem === faq.id ? 'max-h-48 pb-4' : 'max-h-0'
                      }`}
                    >
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection