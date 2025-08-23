'use client'

import React from 'react'

export interface StackedPanelProps {
  id: string
  title?: string
  content?: React.ReactNode
  isActive: boolean
  progress: number
  index: number
  totalPanels: number
  enterOffsetPx?: number
  reducedMotion?: boolean
}

const StackedPanel: React.FC<StackedPanelProps> = ({
  id,
  title,
  content,
  isActive,
  progress,
  index,
  totalPanels,
  enterOffsetPx = 30,
  reducedMotion = false
}) => {
  // Calculate when this panel should start animating
  // First panel (index 0) is always visible, others animate in
  // Each panel has a static phase (60% of its time) + transition phase (40% of its time)
  const panelProgress = index === 0 
    ? 1 // First panel always fully visible
    : totalPanels > 1 
      ? (() => {
          const baseProgress = (progress * (totalPanels - 1)) - (index - 1)
          const staticPhase = 0.6 // 60% static, 40% transition
          
          if (baseProgress <= 0) return 0
          if (baseProgress <= staticPhase) return 0 // Stay hidden during static phase of previous panel
          
          // Scale the remaining 40% to 0-1 for transition
          const transitionProgress = (baseProgress - staticPhase) / (1 - staticPhase)
          return Math.min(1, transitionProgress)
        })()
      : progress

  // Animation values
  const opacity = reducedMotion ? (isActive ? 1 : 0) : panelProgress
  const translateY = reducedMotion ? 0 : (index === 0 ? 0 : enterOffsetPx * (1 - panelProgress))
  
  // Z-index increases with index to stack properly
  const zIndex = 10 + index

  return (
    <div
      id={id}
      className="absolute inset-0 flex items-center justify-center p-8 md:p-12 bg-black"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        zIndex,
        willChange: isActive ? 'transform, opacity' : 'auto',
        pointerEvents: panelProgress > 0.5 ? 'auto' : 'none'
      }}
    >
      {content}
    </div>
  )
}

export default StackedPanel