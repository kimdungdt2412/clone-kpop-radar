import React from 'react'

export default function IconRankEqual({ isWhite = false }) {
  return (
    <i 
    style={{
      background: isWhite ? "white" : "black"
    }}
    className='inline-block align-middle ml-[6px] bg-[length:5px_auto] mr-[5px] w-[6px] h-[1px] lg:bg-[length:auto_auto] lg:w-[9px] lg:h-[2px] lg:ml-[6px] lg:mr-[7px]'></i>
  )
}
