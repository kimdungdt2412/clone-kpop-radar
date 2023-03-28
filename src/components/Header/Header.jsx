import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import useIsFirstRender from '../../utils/hooks';

export default function Header() {
    let move = useIsFirstRender()
    const [isFirst, setIsFirst] = useState(false)

    useEffect(() => {
        if (!move) {
            setTimeout(() => {
                setIsFirst(move)
            }, 1000)
        } 
        else {
            setIsFirst(move)
        }
    }, [move])

    return (
        <header id="header" className='block pl-[60px] pr-[25px] pt-[35px] pb-[10px] w-full max-w-[1920px] box-border z-[100] fixed top-0 left-0 right-0'>
            <h1 className={`logo1 float-left w-[160px] h-[108px] mt-[-7px] ml-[-7px] box-border p-[6px] pointer-events-auto ${isFirst ? 'p-0' : ''}`}>
                <a href='/' className={isFirst ? "block h-full w-full bg-logo_gif bg-no-repeat bg-100 text-transparent" : "block h-full w-full bg-logo_1 bg-no-repeat bg-auto text-transparent"}>kpop-radar</a>
            </h1>

            <nav className='float-right'>
                <ul className='block list-none'>
                    <li className='float-left'>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'block relative text-black text-[17px] font-medium box-border pl-[35px] pr-[32px] pt-[24px] pb-[30px]'
                                    : 'block relative text-black/50 text-[17px] font-medium box-border pl-[35px] pr-[32px] pt-[24px] pb-[30px]'
                            }
                            rel="noopener noreferrer"
                            to="/"
                        >
                            DATA BOARD
                        </NavLink>
                    </li>

                    <li className='float-left'>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'block relative text-black text-[17px] font-medium box-border pl-[35px] pr-[32px] pt-[24px] pb-[30px]'
                                    : 'block relative text-black/50 text-[17px] font-medium box-border pl-[35px] pr-[32px] pt-[24px] pb-[30px]'
                            }
                            rel="noopener noreferrer"
                            to="/artist-list"
                        >
                            ARTIST
                        </NavLink>
                    </li>


                    <li className='float-left'>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'block relative text-black text-[17px] font-medium box-border pl-[35px] pr-[32px] pt-[24px] pb-[30px]'
                                    : 'block relative text-black/50 text-[17px] font-medium box-border pl-[35px] pr-[32px] pt-[24px] pb-[30px]'
                            }
                            rel="noopener noreferrer"
                            to="/brief"
                        >
                            BRIEF
                        </NavLink>
                    </li>

                    <li className='float-left'>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'block relative text-black text-[17px] font-medium box-border pl-[35px] pr-[32px] pt-[24px] pb-[30px]'
                                    : 'block relative text-black/50 text-[17px] font-medium box-border pl-[35px] pr-[32px] pt-[24px] pb-[30px]'
                            }
                            rel="noopener noreferrer"
                            to="/about"
                        >
                            ABOUT
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
