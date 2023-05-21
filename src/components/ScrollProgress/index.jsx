import React, { useEffect, useState } from 'react'

export default function ScrollProgress() {
    const [position, setPosition] = useState(100)

    const handleScroll = () => {
      let mainBoard = document.getElementById('main-board')
      let percent = window.scrollY/(mainBoard.offsetHeight - window.outerHeight)*100;
      setPosition(percent >= 100 ? 100 : percent)
    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [window.pageYOffset]);
    
  return (
    <div className='scroll-progress fixed z-[1] top-[180px] right-0 w-full h-[1px] bg-[#f0f0f0] overflow-hidden'>
        <span 
        style={{
            transform: `translate3d(${-(100-position)}%, 0px, 0px)`
        }}
        className="bar content-[] absolute top-0 left-0 w-full h-full bg-black">

        </span>

    </div>
  )
}
