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
            className="sortGender text-[17px] leading-[25px] relative float-left align-top ml-[10%]">
            <button
                className={`${open ? "open" : ""} sortButton w-[72px] text-left`}>
                <span
                    className='sortTitle after:content-none'
                >
                    {handleIcon(gender)}
                </span>

                <div
                    style={{
                        visibility: open ? "visible" : "hidden"
                    }}
                    className="dropdown z-[2] absolute bg-white border-black border-[1px] w-[100px] top-[34px]">

                    {sortGender.map(item => (
                        <li key={item}
                            style={{
                                background: item === gender ? "black" : "white",
                                color: item === gender ? "white" : "black"
                            }}
                            onClick={() => {
                                navigate(
                                    {
                                        pathname: window.location.pathname,
                                        search: createSearchParams({
                                            ...Object.fromEntries([...searchParams]),
                                            gender: item
                                        }).toString()
                                    })
                            }}
                            className='block w-full first:border-t-0 border-t-[1px] border-t-black h-[30px] leading-[30px] text-[12px] pl-[10px] text-left'
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
