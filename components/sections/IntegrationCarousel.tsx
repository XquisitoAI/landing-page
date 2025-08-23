'use client'

import React from 'react'

const IntegrationCarousel: React.FC = () => {
  // Array de placeholders para los logos
  const logoPlaceholders = Array.from({ length: 6 }, (_, index) => ({
    id: `logo-${index + 1}`,
    alt: `POS Integration Logo ${index + 1}`
  }))

  // Duplicamos los elementos para el efecto de loop infinito
  const duplicatedLogos = [...logoPlaceholders, ...logoPlaceholders]

  return (
    <>
      <style jsx global>{`
        @keyframes scroll-down {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-down {
          animation: scroll-down 15s linear infinite;
        }

        .animate-scroll-up {
          animation: scroll-up 15s linear infinite;
        }

        .animate-scroll-down:hover,
        .animate-scroll-up:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <section className="bg-gradient-to-r from-white to-[#D9F0FF] min-h-screen px-8 md:px-16 flex items-center justify-center">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[2fr,1.5fr] gap-16 lg:gap-20 items-center">
            
            {/* Columna izquierda - Contenido de texto */}
            <div className="lg:pr-6 max-w-3xl -ml-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-[#009DFF] italic font-playfair font-light">Integra Xquisito</span>
                <span className="text-black"> con tu POS y</span>
                <br />
                <span className="text-black">tus herramientas favoritas</span>
              </h2>
              <p className="text-base md:text-lg text-gray-800 mt-4 leading-relaxed">
                ¿Eres un proveedor?
              </p>
              
              <a 
                href="https://calendly.com/contacto-xquisito/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#009DFF] font-bold hover:underline transition-all mt-24 flex items-center gap-2"
              >
                Solicita tu integración
                <span>→</span>
              </a>
            </div>

            {/* Columna derecha - Carrusel vertical de dos columnas */}
            <div className="relative h-[500px] overflow-hidden">
              <div className="grid grid-cols-3 gap-0 h-full">
                
                {/* Columna A - Movimiento de arriba para abajo */}
                <div className="relative overflow-hidden ml--8 mr-7">
                  <div className="flex flex-col animate-scroll-down">
                    {[...logoPlaceholders.slice(0, 3), ...logoPlaceholders.slice(0, 3)].map((logo, index) => {
                      const logoNumber = ((index % 3) + 1);
                      const isLogo3 = logoNumber === 3;
                      
                      return (
                        <div
                          key={`col-a-${logo.id}-${Math.floor(index / 3)}`}
                          className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 bg-white rounded-xl shadow-md p-4 mb-10"
                        >
                          <img
                            src={`/assets/Images/logo${logoNumber}.webp`}
                            alt={`Integration Logo ${logoNumber}`}
                            className={`${isLogo3 ? 'w-full h-full object-contain scale-90' : 'w-full h-full object-contain'}`}
                            loading="lazy"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Columna B - Movimiento de abajo para arriba */}
                <div className="relative overflow-hidden ml--5 mr-10">
                  <div className="flex flex-col animate-scroll-up">
                    {[...logoPlaceholders.slice(3, 6), ...logoPlaceholders.slice(3, 6)].map((logo, index) => {
                      const logoNumber = ((index % 3) + 4);
                      const isLogo4 = logoNumber === 4;
                      const isLogo5 = logoNumber === 5;
                      const isLogo6 = logoNumber === 6;
                      
                      return (
                        <div
                          key={`col-b-${logo.id}-${Math.floor(index / 3)}`}
                          className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 bg-white rounded-xl shadow-md p-4 mb-10"
                        >
                          <img
                            src={`/assets/Images/logo${logoNumber}.webp`}
                            alt={`Integration Logo ${logoNumber}`}
                            className={`${isLogo5 ? 'w-full h-full object-contain scale-[1.75]' : isLogo6 ? 'w-full h-full object-contain scale-75' : isLogo4 ? 'w-full h-full object-contain scale-150' : 'w-full h-full object-contain'}`}
                            loading="lazy"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Columna C - Movimiento de arriba para abajo */}
                <div className="relative overflow-hidden -ml--3 mr-4">
                  <div className="flex flex-col animate-scroll-down">
                    {[...logoPlaceholders.slice(0, 3), ...logoPlaceholders.slice(0, 3)].map((logo, index) => {
                      const logoNumber = ((index % 3) + 7);
                      const isLogo7 = logoNumber === 7;
                      const isLogo8 = logoNumber === 8;
                      
                      return (
                        <div
                          key={`col-c-${logo.id}-${Math.floor(index / 3)}`}
                          className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 bg-white rounded-xl shadow-md p-4 mb-10"
                        >
                          <img
                            src={`/assets/Images/logo${logoNumber}.webp`}
                            alt={`Integration Logo ${logoNumber}`}
                            className={`${isLogo8 ? 'w-full h-full object-contain scale-110' : isLogo7 ? 'w-full h-full object-contain scale-125' : 'w-full h-full object-contain'}`}
                            loading="lazy"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
                
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default IntegrationCarousel