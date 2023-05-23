import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { menus } from '../../utils/config';

export default function DashboardHeader({ boardType = {} }) {
    const location = useLocation()

    const [scrollPosition, setScrollPosition] = useState(0);

    const [isFirst, setIsFirst] = useState(true)

    const LogoComponent = () => {
        if (scrollPosition > 200) {
            return <h1 className={`logo1 float-left w-[60px] h-[40px] m-0 mb-[-40px] lg:w-[77px] lg:h-[52px] lg:mt-[-4px] lg:ml-[-4px] lg:p-0 lg:mb-0 xl:w-[140px] xl:h-[40px] xl:m-0 xl:p-[6px] box-border pointer-events-auto p-[3px] 2xl:w-[100px] 2xl:h-[70px] 2xl:mt-[-5px] 2xl:ml-[-5px]`}>
                <a href='/' className={`block h-full w-full transition duration-500 text-transparent`}>
                    <img src={boardType.logo} />
                </a>
            </h1>
        } else if (scrollPosition <= 200) {
            return <h1 className={`logo1 float-left w-[60px] h-[40px] m-0 mb-[-40px] xl:w-[160px] xl:h-[108px] xl:mt-[-7px] xl:ml-[-7px] lg:w-[134px] lg:h-[92px] lg:mt-[-8px] lg:ml-[-8px] lg:p-[6px] lg:mb-0 box-border pointer-events-auto ${isFirst ? 'p-0 lg:p-0' : 'p-[3px]'}`}>
                <a href='/' className="block h-full w-full  transition duration-500 text-transparent">
                    <img src={isFirst ? boardType.logo_gif : boardType.logo} />
                </a>
            </h1>
        }
    }

    const handleScroll = () => {
        const position = window.pageYOffset;
        if ((scrollPosition <= 200 && position > 200) || (scrollPosition > 200 && position <= 200)) {
            setScrollPosition(position);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [window.pageYOffset]);

    useEffect(() => {
        if (isFirst) {
            setTimeout(() => {
                setIsFirst(false)
            }, 1500)
        }
    }, [isFirst])

    return (
        <header id="header" className={`pointer-events-none block z-[120] p-[13px] lg:py-[30px] lg:px-[32px] lg:pr-[15px] xl:pl-[60px] xl:pr-[25px] xl:pb-[10px] w-full max-w-[1920px] box-border z-120 lg:z-[100] fixed top-0 left-0 right-0 transition duration-300 after:block after:clear-both after:content-[''] ${scrollPosition > 200 ? "xl:h-[80px] xl:pt-[20px] 2xl:pt-[35px]" : "xl:pt-[35px]"}`}>
            <LogoComponent />

            <nav className='float-right relative top-[1px] lg:top-0'>
                <ul className='block list-none'>
                    {menus.map(item => (
                        <li onClick={() => setIsFirst(true)} className='float-left max-w-[90px] mr-[12px] lg:max-w-none lg:mr-0' key={item.title}>
                            <NavLink
                                className={({ isActive }) =>
                                    (isActive || (item.url === "/board" && ["/"].includes(location.pathname)))
                                        ? `block relative text-black text-[11px] leading-[11px] font-medium box-border px-0 py-[15px] lg:text-[17px] lg:leading-[17px] text-center lg:py-[25px] lg:px-[10px] xl:pl-[35px] xl:pr-[32px] ${scrollPosition > 200 ? "xl:py-[15px] 2xl:text-[15px]" : "xl:pt-[24px] xl:pb-[30px]"}`
                                        : `block relative text-black/50 text-[11px] leading-[11px] font-medium box-border px-0 py-[15px] lg:text-[17px] lg:leading-[17px] text-center lg:py-[25px] lg:px-[10px] xl:pl-[35px] xl:pr-[32px] ${scrollPosition > 200 ? "xl:py-[15px] 2xl:text-[15px]" : "xl:pt-[24px] xl:pb-[30px]"}`
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
