import React, { useState } from 'react'
import "./style.css"
import { youtubeSortType, youtubeSortTypeValue } from '../../utils/config'
import { createSearchParams, useNavigate } from 'react-router-dom'

export default function SortByType({ type, searchParams }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <li onClick={() => setOpen(!open)} className="sortType text-[17px] leading-[25px] relative float-left align-top">
            <button
                className={`${open ? "open" : ""} relative block pr-[10px] min-w-[75px] after:content-[""] after:block 
        after:absolute after:w-0 after:h-0 after:top-[50%] after:right-0 after:border-[4px] after: after:border-transparent after:border-t-black`}>
                <span
                    className='inline-block relative after:content-[""] after:absolute after:block after:h-[1px] after:w-full after:bg-black after:bottom-[2px] after:ml-[1px]'
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
                                            type: item
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
