import React, { useEffect, useState } from 'react'
import dayjs from "dayjs"
import range from "lodash-es/range"

const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

export default function DatePicker({ endDay, day }) {

    const [selectedDay, setSelectedDay] = useState(dayjs())
    const [dayObj, setDayObj] = useState(dayjs())
    const [endObj, setEndObj] = useState(dayjs())

    const thisYear = dayObj.year()
    const thisMonth = dayObj.month() // (January as 0, December as 11)
    const daysInMonth = dayObj.daysInMonth()

    const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
    const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)

    const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
    const weekDayOfLast = dayObjOfLast.day()

    const handlePrev = () => {
        setDayObj(dayObj.subtract(1, "month"))
    }

    const handleNext = () => {
        if (thisMonth === endObj.month()) return
        setDayObj(dayObj.add(1, "month"))
    }

    useEffect(() => {
        if (!!endDay) {
            const date = new Date(endDay.toString().substring(0, 4) + "-" + endDay.toString().substring(4, 6) + "-" + endDay.toString().substring(6, 8))
            setEndObj(dayjs(date.toUTCString()))
        }
    }, [endDay])

    useEffect(() => {
        if (!!endDay) {
            let date = new Date(endDay.toString().substring(0, 4) + "-" + endDay.toString().substring(4, 6) + "-" + endDay.toString().substring(6, 8))
            if (day !== "") {
                date = new Date(day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6, 8))
            }
            setSelectedDay(dayjs(date.toUTCString()))
        }
    }, [day])

    return (
        <div className='datepicker absolute z-[10] bg-white box-border'>
            <div className="block box-content border-[1.2px] border-black w-[216px] h-auto mt-[5px] mx-auto mb-0 text-[9px] px-[20px] pb-[15px]">
                <div className="header relative w-[119%] left-[-20px]">
                    <button className='text-[12px] block relative font-bold float-left' onClick={handlePrev}>
                        <span className='block absolute left-[50%] mt-[8px] ml-[7px] top-[50%] indent-[-999px] overflow-hidden bg-kr-calendar-page-prev-next bg-no-repeat cursor-pointer w-[25px] h-[25px] bg-[length:18px]' >
                            prev
                        </span>
                    </button>

                    <button
                        className='text-[12px] block relative font-bold float-right'
                        onClick={handleNext}>
                        <span className='block absolute left-[50%] mt-[7px] ml-[-25px] top-[50%] indent-[-999px] overflow-hidden bg-kr-calendar-page-nav-next bg-no-repeat cursor-pointer w-[25px] h-[25px] bg-[length:18px]' >
                            next
                        </span>
                    </button>

                    <div className="datepicker-title text-center text-white bg-black py-[10px] text-[12px] leading-[15px]">
                        {thisYear}&nbsp; {thisMonth + 1 < 10 ? `0${thisMonth + 1}` : thisMonth + 1}
                    </div>
                </div>
                <div className='text-center w-full mt-[10px] text-[11px]'>
                    <div className="flex flex-wrap">
                        {weekDays?.map((item, index) => (
                            <div key={index} className='flex basis-[14.2857%] items-center justify-center uppercase text-[6pt] py-[5px] text-[#666] first:text-[#ff354e]'>
                                <span className='font-noto font-bold '>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap">
                        {range(weekDayOf1).map(i => (
                            <div className="text-[#d7d7d7] flex items-center justify-center p-[7px] basis-[14.2857%]" key={i}>

                                <span>{dayObjOf1.subtract(weekDayOf1 - i, "day").date()}</span>
                            </div>
                        ))}

                        {
                            thisMonth === endObj.month() ? (
                                <>
                                    {range(daysInMonth - (daysInMonth - endObj.date())).map(i => {

                                        const isSelected = i + 1 === selectedDay.date() &&
                                            thisMonth === selectedDay.month() &&
                                            thisYear === selectedDay.year()
                                        return (
                                            <div
                                                style={{
                                                    background: isSelected ? "#ff354e" : "white",
                                                    color: isSelected ? "white" : "black",
                                                    borderRadius: isSelected ? "50%" : "none"

                                                }}
                                                className={`flex items-center justify-center p-[7px] basis-[14.2857%]`}
                                                key={i}
                                            >
                                                <span>
                                                    {i + 1}
                                                </span>
                                            </div>
                                        )
                                    })}

                                    {range(daysInMonth - endObj.date()).map(i => (
                                        <div className="text-[#d7d7d7] flex items-center justify-center p-[7px] basis-[14.2857%]" key={i}>
                                            <span>{dayObjOfLast.add(i + dayObj.date() + 1, "day").date()}</span>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {range(daysInMonth).map(i => {
                                        const isSelected = i + 1 === selectedDay.date() &&
                                            thisMonth === selectedDay.month() &&
                                            thisYear === selectedDay.year()
                                        return (
                                            <div
                                                style={{
                                                    background: isSelected ? "#ff354e" : "white",
                                                    color: isSelected ? "white" : "black",
                                                    borderRadius: isSelected ? "50%" : "none"

                                                }}
                                                className={`flex items-center justify-center p-[7px] basis-[14.2857%]`}
                                                key={i}
                                            >
                                                <span>{i + 1}</span>
                                            </div>
                                        )
                                    })}
                                </>
                            )
                        }



                        {range(6 - weekDayOfLast).map(i => (
                            <div className="text-[#d7d7d7] flex items-center justify-center p-[7px] basis-[14.2857%]" key={i}>
                                <span>{dayObjOfLast.add(i + 1, "day").date()}</span>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    )
}
