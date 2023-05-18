import React, { useState } from 'react'
import "./style.css"
import { createSearchParams, useNavigate } from 'react-router-dom'
import { youtubeSortDateValue } from '../../utils/config'

export default function SortByDate({ date, searchParams }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    return (
        <li
            onBlur={() => setOpen(false)}
            onClick={() => setOpen(!open)}
            className='sortDate relative float-left align-top ml-[10%] text-[17px] leading-[25px]'>
            <button className={`${open ? "open" : ""} sortButton`}>
                <span className='sortTitle'>{date}</span>

                <div
                    style={{
                        visibility: open ? "visible" : "hidden"
                    }}
                    className="dropdown z-[2] absolute bg-white border-black border-[1px] w-[100px] top-[34px]">

                    {youtubeSortDateValue.map(item => (
                        <li key={item}
                            style={{
                                background: item === date ? "black" : "white",
                                color: item === date ? "white" : "black"
                            }}
                            onClick={() => {
                                let params = createSearchParams({
                                    ...Object.fromEntries([...searchParams]),
                                    date: item
                                })

                                params.delete("page")
                                params.delete("day")
                                params.delete("weekId")
                                params.delete("month")
                                params.delete("year")

                                navigate(
                                    {
                                        pathname: window.location.pathname,
                                        search: params.toString()
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
