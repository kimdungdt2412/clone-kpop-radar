import React from 'react'

export default function TopButton() {
  return (
    <div className='top-btn z-[1] sticky float-right right-[13px] bottom-[13px] w-[40px] h-[40px] mt[-20px] mr-[13px] mb-[13px] ml-[-20px] rounded-[50%] bg-black'>
        <button 
        onClick={() => {
            window.scrollTo(0,0)
        }}
        className='relative inline-block w-full border-none p-0 text-center align-middle text-white bg-transparent rounded-[50%] rotate-0 scale-[1] text-[11px] h-[40px] leading-[40px] before:absolute before:top-[50%] before:left-[50%] before:w-[136px] before:h-[136px] before:ml-[-68px] before:mt-[-68px] before:bg-black before:scale-0 before:transition-all before:duration-300 before:content-[]' >
            <span>
                top
            </span>
        </button>
    </div>
  )
}
