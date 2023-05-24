import React, { useEffect, useState } from 'react'

export default function ScrollProgress() {
    const [position, setPosition] = useState(0)
    const [width, setWidth] = useState(0)

    const handleScroll = () => {
      let footer = document.getElementById('footer')
      let percent = window.scrollY/footer.offsetTop*100;
      setPosition(percent >= 100 ? 100 : percent)
    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [window.pageYOffset]);

    useEffect(() => {
        if(window.innerWidth >= 1024) {
          let screenW = window.innerWidth
          let w = screenW >= 1100 ? (1100 + (screenW - 1100)/2 - 120) : (screenW - 120)
          setWidth(w) 
        }
    }, [])
    
  return (
    <div 
    style={{
      width: width > 0 ? `${width}px`: '100%'
    }}
    className='scroll-progress fixed z-[100] top-[180px] right-0 w-full h-[1px] bg-[#f0f0f0] overflow-hidden lg:top-[177px] lg:mx-auto lg:z-[1]'>
        <span 
        style={{
            transform: `translate3d(${-(100-position)}%, 0px, 0px)`
        }}
        className="bar content-[] absolute top-0 left-0 w-full h-full bg-black">

        </span>

    </div>
  )
}
