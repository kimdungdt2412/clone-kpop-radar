import React, { useRef, useState } from 'react'
import "./style.css"
import { listTabMenu } from '../../utils/config'
import { Link } from 'react-router-dom'
import { boardTypeMap } from '../../utils/config'

export default function TabMenu({ boardType, open, onClose, param = "" }) {
    const scrollRef = useRef(null)
    const [color, setColor] = useState(boardType.color)

    return (
        <article className={`tabMenu ${open ? "open" : ""} fixed z-[200] top-0 left-0 right-0 min-w-auto w-full h-full overflow-hidden lg:overflow-y-auto`}>
            <div className="inner relative top-0 left-0 right-0 bottom-0 h-full w-full max-w-[1110px] lg:h-fit lg:pt-[170px] lg:pb-[80px] lg:pl-[120px] lg:left-[50%] lg:translate-x-[-50%]">
                <div ref={scrollRef} className="menu absolute z-[2] top-0 bottom-0 right-0 left-0 w-full h-full max-h-full overflow-y-auto overflow-x-hidden lg:right-[unset] lg:left-[unset] lg:h-fit lg:[position:inherit] lg:overflow-visible ">

                    <button
                        onClick={onClose}
                        className='absolute left-[43px] top-[40px] font-bold text-[26px] block w-auto text-white transition-opacity duration-300 hover:[-webkit-text-stroke:1px_white] hover:[-webkit-text-fill-color:transparent] lg:left-0 lg:top-[-120px] lg:text-[46px] lg:font-normal'>
                        close
                    </button>

                    <ul className="list-none min-h-full pt-[130px] pr-[20px] pb-[40px] pl-[43px] lg:p-0">
                        {listTabMenu.map((item, index) => (
                            <li key={index} className={`text-[44px] leading-[48px] font-bold first:mt-0 mt-[36px] tracking-[-0.01em] lg:text-[86px] lg:leading-[100px] lg:mt-[10px]`} style={{
                                transitionDelay: `${(index * 0.1)}s`
                            }}>
                                <Link
                                    className={`inline-block transition-colors ${(param === item.path || (param === "" && item.path === "viewcount")) ? "text-black" : "text-white hover:[-webkit-text-stroke:1px_white] hover:[-webkit-text-fill-color:transparent]"}`}
                                    to={`/board/${item.path}`}
                                    onClick={() => {
                                        setTimeout(() => {
                                            onClose()
                                            scrollRef.current.scroll({
                                                top: 0,
                                                behavior: "smooth"
                                            });
                                        }, 400)
                                    }}
                                    onMouseEnter={() => {
                                        setColor(boardTypeMap[item.path]?.color || boardType.color)
                                    }}
                                >
                                    {item.name}&nbsp;
                                    {window.innerWidth < 1024 && (
                                        <span className='inline-block text-[11px] leading-[1] align-top font-bold mt-[5px] ml-[7px]'>{index + 1}</span>
                                    )}

                                    <span className='block lg:inline-block'> {item.detail}</span>
                                    {window.innerWidth >= 1024 && (
                                        <span className='inline-block text-[22px] leading-[1] font-bold align-top'>{index + 1}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>

                <div style={{
                    backgroundColor: color
                }} className='bg z-[1] h-[100vh] max-h-none block absolute top-0 left-[50%] ml-[-580px] w-[1540px] lg:h-full'></div>

            </div>
        </article>
    )
}
