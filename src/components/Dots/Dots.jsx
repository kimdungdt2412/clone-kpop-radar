import React from 'react'

export default function Dots() {
  return (
    <div className='dots z-[-10] fixed top-[140px] left-[50%] w-[1920px] h-full translate-x-[-50%]'>

        <div className='dot_box absolute top-0 left-[50%] w-full h-full ml-[-50%] translate-y-0 ease-out duration-300'>
            <span className='absolute block w-[11px] h-[11px] rounded-full top-[574px] left-[976px] bg-[#903262]'/>
            <span className='absolute block w-[11px] h-[11px] rounded-full top-[726px] left-[1058px] bg-[#f0aa70]'/>
            <span className='absolute block w-[11px] h-[11px] rounded-full top-[431px] left-[53px] bg-[#9ec372]'/>
        </div>

        <div className='dot_box absolute top-0 left-[50%] w-full h-full ml-[-50%] translate-y-0 ease-out duration-300'>
            <span className='absolute block w-[11px] h-[11px] rounded-full top-[591px] left-[1034px] bg-[#903262]'/>
            <span className='absolute block w-[11px] h-[11px] rounded-full top-[632px] left-[1139px] bg-[#eab1b9]'/>
            <span className='absolute block w-[11px] h-[11px] rounded-full top-[1043px] left-[1050px] bg-[#f0aa70]'/>
            <span className='absolute block w-[11px] h-[11px] rounded-full top-[351px] left-[342px] bg-[#9ec372]'/>
        </div>

        <div className='dot_box absolute top-0 left-[50%] w-full h-full ml-[-50%] translate-y-0 ease-out duration-300'>
            <span className='absolute block w-[11px] h-[11px] rounded-full top-[98px] left-[622px] bg-[#eab1b9]'/>
            <span className='absolute block w-[11px] h-[11px] rounded-full top-[628px] left-[1051px] bg-[#f0aa70]'/>
            <span className='absolute block w-[11px] h-[11px] rounded-full top-[517px] left-[1149px] bg-[#9ec372]'/>
        </div>
    </div>
  )
}
