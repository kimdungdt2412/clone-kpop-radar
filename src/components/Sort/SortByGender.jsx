import React, { useState } from 'react'
import "./style.css"
import { sortGender } from '../../utils/config'
import { createSearchParams, useNavigate } from 'react-router-dom'
import IconEmoAll from '../Icon/IconEmoAll'
import IconEmoWoman from '../Icon/IconEmoWoman'
import { IconEmoAllWhite } from '../Icon/IconEmoAllWhite'
import { IconEmoManWhite } from '../Icon/IconEmoManWhite'
import { IconEmoWomanWhite } from '../Icon/IconEmoWomanWhite'


export default function SortByGender({ gender, searchParams }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleIcon = (type, isSelected = false) => {
        switch (type) {
            case "all":
                return isSelected ? <IconEmoAllWhite/> : <IconEmoAll />
            case "boys":
                return isSelected ? <IconEmoManWhite/> : <IconEmoWoman />
            case "girls":
                return isSelected ? <IconEmoWomanWhite/> : <IconEmoWoman/>

            default:
                return (<></>);
        }
    }

    return (
        <li
            onBlur={() => setOpen(false)}
            onClick={() => setOpen(!open)}
            className="sort-gender inline-block relative align-top ml-[10%] lg:ml-[16%]">
                <span className='hidden lg:block'>sort by gender</span>
            <button
                className={`${open ? "open" : ""} sort-button w-[72px] text-left`}>
                <span
                    className='sort-title after:content-none'
                >
                    {handleIcon(gender)}
                </span>

                <div
                    style={{
                        visibility: open ? "visible" : "hidden"
                    }}
                    className="dropdown">

                    {sortGender.map(item => (
                        <li key={item}
                            style={{
                                background: item === gender ? "black" : "white",
                                color: item === gender ? "white" : "black"
                            }}
                            onClick={() => {
                                if (gender === item) return
                                navigate(
                                    {
                                        pathname: window.location.pathname,
                                        search: createSearchParams({
                                            ...Object.fromEntries([...searchParams]),
                                            gender: item
                                        }).toString()
                                    })
                            }}
                            className='block w-full first:border-t-0 border-t-[1px] border-t-black h-[30px] leading-[30px] text-[12px] pl-[10px] text-left lg:text-[16px] lg:pl-[20px] lg:leading-[46px] lg:h-[46px]'
                        >
                            <span>
                                {handleIcon(item, item === gender)}
                                {item}
                            </span>
                        </li>
                    ))}

                </div>
            </button>
        </li>
    )
}
