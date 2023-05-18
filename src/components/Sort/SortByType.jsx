import React, { useState } from 'react'
import "./style.css"
import { youtubeSortType, youtubeSortTypeValue } from '../../utils/config'
import { createSearchParams, useNavigate } from 'react-router-dom'

export default function SortByType({ type, searchParams }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <li 
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(!open)} 
        className="sortType text-[17px] leading-[25px] relative float-left align-top">
            <button
                className={`${open ? "open" : ""} sortButton`}>
                <span
                    className='sortTitle'
                >
                    {type}
                </span>

                <div
                    style={{
                        visibility: open ? "visible" : "hidden"
                    }}
                    className="dropdown z-[2] absolute bg-white border-black border-[1px] w-[100px] top-[34px]">

                    {youtubeSortType.map(item => (
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
                            className='block w-full first:border-t-0 border-t-[1px] border-t-black h-[30px] leading-[30px] text-[12px] pl-[10px] text-left'

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
