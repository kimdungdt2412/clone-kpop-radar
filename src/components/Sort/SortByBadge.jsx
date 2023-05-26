import React, { useState } from 'react'
import "./style.css"
import { badgeTypes } from '../../utils/config'
import { createSearchParams, useNavigate } from 'react-router-dom'

export default function SortByBadge({ type, searchParams }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <li
            onBlur={() => setOpen(false)}
            onClick={() => {
                setOpen(!open)
            }}
            className={`sort-type inline-block relative align-top`}>
            <span className='hidden lg:block'>sort by badge</span>
            <button
                className={`${open ? "open" : ""} sort-button`}>
                <span
                    className='sort-title'
                >
                    {type}
                </span>

                <div
                    style={{
                        visibility: open ? "visible" : "hidden"
                    }}
                    className="dropdown">

                    {badgeTypes.map(item => (
                        <li key={item}
                            style={{
                                background: item === type ? "black" : "white",
                                color: item === type ? "white" : "black"
                            }}
                            onClick={() => {
                                navigate(
                                    {
                                        pathname: window.location.pathname,
                                        search: createSearchParams({
                                            ...Object.fromEntries([...searchParams]),
                                            type: item,
                                            page: 1
                                        }).toString()
                                    })
                            }}
                            className='block w-full first:border-t-0 border-t-[1px] border-t-black h-[30px] leading-[30px] text-[12px] pl-[10px] text-left lg:text-[16px] lg:pl-[20px] lg:leading-[46px] lg:h-[46px]'

                        >
                            <span>
                                {item}
                            </span>
                        </li>
                    ))}

                </div>
            </button>
        </li>
    )
}
