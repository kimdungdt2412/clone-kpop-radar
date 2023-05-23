import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
import { isValidNumber } from '../../features/Youtube/ViewCount'

export default function TopButton() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  let { page = "1" } = Object.fromEntries([...searchParams])

  const tapRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  const handleChangePage = (_page) => {
    navigate(
      {
        pathname: window.location.pathname,
        search: createSearchParams({
          ...Object.fromEntries([...searchParams]),
          page: _page
        }).toString()
      })
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (tapRef.current && !tapRef.current.contains(event.target)) {
        setIsActive(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tapRef]);

  return (
    <div
      ref={tapRef}
      className='top-btn z-[1] sticky float-right right-[13px] bottom-[13px] w-[40px] h-[40px] mt[-20px] mr-[13px] mb-[13px] ml-[-20px] rounded-[50%] bg-black lg:w-[80px] lg:h-[80px] lg:right-[60px] lg:bottom-[60px] lg:mt-[-40px] lg:mr-[60px] lg:mb-[60px] lg:ml-[-40px]'>
      <button
        onClick={() => {
          if (window.innerWidth < 1024) window.scrollTo(0, 0)
          else if (!isActive) {
            setIsActive(true)
          }
        }}
        className='relative inline-block w-full border-none p-0 text-center align-middle text-white bg-transparent rounded-[50%] rotate-0 scale-[1] text-[11px] h-[40px] leading-[40px]  lg:text-[24px] lg:h-[80px] lg:leading-[80px]' >
        <div
          style={{
            transform: isActive ? 'scale(1)' : 'scale(0)'
          }}
          className='absolute top-[50%] left-[50%] w-[136px] h-[136px] ml-[-68px] mt-[-68px] bg-black scale-0 transition-all duration-300 rounded-[50%] z-[2]'
        />
        <span className='inline lg:hidden'>
          top
        </span>
        <span className='hidden lg:inline'>
          tap
        </span>
      </button>

      <div
        style={{
          transform: isActive ? 'scale(1)' : 'scale(0)'
        }}
        className='over absolute top-[50%] left-[50%] w-[136px] h-[136px] ml-[-68px] mt-[-68px] bg-black transition-all duration-300 rounded-[50%] z-[2] after:content-[""] after:block after:w-[14px] after:h-[14px] after:rounded-[50%] after:bg-white after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%]'>
        <button
          style={{
            opacity: isActive ? "1" : "0"
          }}
          onClick={() => {
            window.scrollTo(0, 0)
          }}
          className='top absolute top-[16px] left-[50%] ml-[-10px] transition-opacity duration-700'
        >
          <span className='block w-[20px] h-[17px] bg-icon_tap_arrow_up'></span>
        </button>

        <button
          style={{
            opacity: isActive ? "1" : "0"
          }}
          onClick={() => {
            const footer = document.getElementById("footer")
            window.scrollTo({
              top: footer.offsetTop - 1000,
              left: 0
            })
          }}
          className='bottom absolute bottom-[16px] left-[50%] ml-[-10px] transition-opacity duration-700'
        >
          <span className='block w-[20px] h-[17px] bg-icon_tap_arrow_down'></span>
        </button>

        <button
          style={{
            opacity: isActive ? "1" : "0"
          }}
          onClick={() => {
            if (isValidNumber(page) && Number(page) !== 1) {
              handleChangePage(Number(page) - 1)
            }
          }}
          className='prev absolute top-[50%] left-[50%] w-[30px] h-[20px] leading-[20px] mt-[-10px] text-[14px] ml-[-55px] text-white text-center transition-opacity duration-700'
        >
          prev
        </button>

        <button
          style={{
            opacity: isActive ? "1" : "0"
          }}
          onClick={() => {
            if (isValidNumber(page)) {
              handleChangePage(Number(page) + 1)
            }
          }}
          className='next absolute top-[50%] left-[50%] w-[30px] h-[20px] leading-[20px] mt-[-10px] text-[14px] ml-[25px] text-white text-center transition-opacity duration-700'
        >
          next
        </button>

      </div>
    </div>
  )
}
