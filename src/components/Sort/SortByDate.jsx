import React, { useState } from 'react'
import "./style.css"
import { createSearchParams, useNavigate } from 'react-router-dom'
import { badgeDates, sortDateV1, sortDateV2, youtubeSortDateValue } from '../../utils/config'

export default function SortByDate({ date, searchParams, isViewCount = false, isChannel = false, isBadge =false }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const handleList = () => {
        if (isViewCount) return youtubeSortDateValue
        else if (isBadge) return badgeDates
        else if (isChannel) return sortDateV1
        return sortDateV2
    }

    const listDate = handleList()
    return (
        <li
            onBlur={() => setOpen(false)}
            onClick={() => setOpen(!open)}
            className='sort-date inline-block relative align-top ml-[10%] lg:ml-[16%]'>
            <span className='hidden lg:block'>sort by date</span>
            <button className={`${open ? "open" : ""} sort-button`}>
                <span className='sort-title'>{date}</span>

                <div
                    style={{
                        visibility: open ? "visible" : "hidden"
                    }}
                    className="dropdown">

                    {listDate.map(item => (
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
