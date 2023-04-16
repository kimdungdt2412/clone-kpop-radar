import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from "react-router-dom";
import useIsFirstRender from '../../utils/hooks';

export default function Header() {
    let move = useIsFirstRender()
    const location = useLocation()

    const [isFirst, setIsFirst] = useState(false)
    const [isAboutPage, setIsAboutPage] = useState(false)



    const menus = [
        {
            title: "DATA BOARD",
            url: "/"
        },
        {
            title: "ARTIST",
            url: "/artist-list"
        },
        {
            title: "BRIEF",
            url: "/brief"
        },
        {
            title: "ABOUT",
            url: "/about"
        },
    ]

    useEffect(() => {
        setTimeout(() => {

        }, 1000)
        location.pathname === "/about" ? setIsAboutPage(true) : setIsAboutPage(false)
        if (!move) {
            setTimeout(() => {
                setIsFirst(true)
            }, 500)
        }
    }, [location.pathname])

    useEffect(() => {
        if (move) {
            setIsFirst(move)
        }
        if (isFirst) {
            setTimeout(() => {
                setIsFirst(move)
            }, 1000) 
        }
    }, [move, isFirst])

    return (
        <header id="header" className={`block ${isAboutPage ? "bg-black" : "bg-white"} z-[120] p-[13px] lg:py-[30px] lg:px-[32px] lg:pr-[15px] xl:pl-[60px] xl:pr-[25px] xl:pt-[35px] xl:pb-[10px] w-full max-w-[1920px] box-border z-120 lg:z-[100] fixed top-0 left-0 right-0 transition duration-300 after:block after:clear-both after:content-[''] `}>
            <h1 className={`logo1 float-left w-[60px] h-[40px] lg:w-[134px] xl:w-[160px] lg:h-[92px] xl:h-[108px] m-0 mb-[-40px] lg:mt-[-8px] xl:mt-[-7px] lg:ml-[-8px] xl:ml-[-7px] box-border lg:p-[6px] pointer-events-auto ${isFirst ? 'p-0' : 'p-[3px]'}`}>
                <a href='/' className={isFirst ? `block h-full w-full ${isAboutPage ? "bg-logo_white_gif" : "bg-logo_gif"} bg-no-repeat bg-100 bg-[center_left_50%] transition duration-500 text-transparent` : `block h-full w-full ${isAboutPage ? "bg-logo_white" : "bg-logo_1"} bg-no-repeat bg-auto bg-[center_left_50%] transition duration-500 text-transparent`}>kpop-radar</a>
            </h1>

            <nav className='float-right relative top-[1px] lg:top-0'>
                <ul className='block list-none'>
                    {menus.map(item => (
                        <li className='float-left max-w-[90px] mr-[12px] lg:max-w-none lg:mr-0' key={item.title}>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? `block relative ${isAboutPage ? "text-white" : "text-black"} text-[11px] font-medium box-border px-0 py-[15px] lg:text-[17px] text-center lg:py-[25px] lg:px-[10px] xl:pl-[35px] xl:pr-[32px] xl:pt-[24px] xl:pb-[30px]`
                                        : `block relative ${isAboutPage ? "text-white/50" : "text-black/50"} text-[11px] font-medium box-border px-0 py-[15px] lg:text-[17px] text-center lg:py-[25px] lg:px-[10px] xl:pl-[35px] xl:pr-[32px] xl:pt-[24px] xl:pb-[30px]`
                                }
                                rel="noopener noreferrer"
                                to={item.url}
                            >
                                {item.title}
                            </NavLink>
                        </li>
                    ))}

                </ul>
            </nav>
        </header>
    )
}
