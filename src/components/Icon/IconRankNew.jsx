import React from 'react'

export default function IconRankNew({isWhite = false}) {
  return (
    <span 
    style={{
      color: isWhite ? "white" : "#ff354e"
    }} 
    className='static inline-block w-full text-[10px] leading-[11px] mt-[7px] font-bold lg:text-[12px] lg:leading-[13px] lg:mt-0'>NEW</span>
  )
}
