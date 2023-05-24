import React, { useEffect, useState } from 'react'
import DatePicker from '../DatePicker'
import { isValidNumber } from '../../features/Youtube/ViewCount'
import { formatDDMM } from '../../utils/function'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

export default function BoardDate({ date, data = {}, day = "", weekId, year, month }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()


    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [openWeekYear, setOpenWeekYear] = useState(false)
    const [openMonthList, setOpenMonthList] = useState(false)
    const [openWeekList, setOpenWeekList] = useState(false)
    const [selectYear, setSelectYear] = useState()
    const [selectMonth, setSelectMonth] = useState(data.monthList?.[0] || {})
    const [selectWeek, setSelectWeek] = useState(data.weekList?.[0] || {})



    const handleDate = () => {
        if (day !== "") return day.substring(0, 4) + "." + day.substring(4, 6) + "." + day.substring(6, 8)
        return data.endDay?.toString().substring(0, 4) + "." + data.endDay.toString().substring(4, 6) + "." + data.endDay.toString().substring(6, 8)
    }

    const onSubmit = (payload = {}) => {
        navigate(
            {
                pathname: window.location.pathname,
                search: createSearchParams({
                    ...Object.fromEntries([...searchParams]),
                    ...payload
                }).toString()
            })
    }

    useEffect(() => {
        if (date !== "weekly" || data.weekList?.length === 0) return
        const week = isValidNumber(weekId) ? data.weekList?.filter(item => item.weekId === Number(weekId))?.[0] : data.weekList[0]
        setSelectWeek(week)
        setSelectYear(week.year)
    }, [date, data.weekList, weekId])

    useEffect(() => {
        if (date !== "monthly" || data.monthList?.length === 0) return

        let _year = data.monthList[0].year || 0
        if (isValidNumber(year)) {
            _year = Number(year)
        }
        setSelectYear(_year)

        let _month = data.monthList[0]
        if (isValidNumber(month)) {
            _month = data.monthList.filter(item => item.year === _year && item.month === Number(month))?.[0] || {}
        }
        setSelectMonth(_month)

    }, [date, data.monthList, year, month])

    return (
        <div className='lg:ml-[120px] border-b-[#e5e5e5] border-b-[1px] pb-[11px] lg:pb-[25px]'>

            <div className="info-right lg:text-right">
                {date === "realtime" && (
                    <span className="date inline w-full m-0 text-[10px] leading-[17px] mt-[10px] font-light text-[#999] align-middle lg:mr-[30px] lg:text-[13px] lg:leading-[20px] lg:mt-0">
                        updated {data.updateDate}
                    </span>
                )}
            </div>
            <div className="block">

                {/* daily */}
                {
                    date === "daily" && (
                        <button
                            onClick={() => setOpenDatePicker(!openDatePicker)}
                            className='sort-button font-noto text-[12px] leading-[22px] pr-[15px] font-medium w-auto after:mt-[-2px] lg:text-[14px] lg:min-w-0 lg:pr-[20px]'>
                            <span>{handleDate()}</span>
                        </button>
                    )
                }

                {(date === "weekly" || date === "monthly") && (
                    <ul className='list-none font-noto font-medium text-[12px] lg:text-[14px]'>

                        {/* yearList */}
                        <li className="relative w-auto inline-block mr-[20px] lg:mr-[36px]">
                            <button onClick={() => setOpenWeekYear(!openWeekYear)} className='sort-button w-auto pr-[15px] leading-[22px] min-w-0 after:mt-[-2px] lg:pr-[20px]'>
                                {selectYear}
                            </button>

                            <div
                                style={{
                                    display: openWeekYear ? "block" : "none"
                                }}
                                className="yearList z-[3] absolute left-0 top-[30px] min-w-full bg-white border-black border-[1px] box-border">
                                {data.yearList?.map(item => (
                                    <button
                                        key={item.year}
                                        style={{
                                            background: item.year === selectYear ? "black" : "white",
                                            color: item.year === selectYear ? "white" : "black",
                                            border: item.year === selectYear ? "none" : ""
                                        }}
                                        onClick={() => {
                                            setSelectYear(item.year)
                                            setOpenWeekYear(false)
                                            if (date === "weekly") setOpenWeekList(true)
                                            if (date === "monthly") setOpenMonthList(true)
                                        }}
                                        className='block relative whitespace-nowrap w-full h-[30px] leading-[30px] py-0 px-[10px] border-t-[black] border-[1px] first:border-none'
                                    >
                                        <span>{item.year}</span>
                                    </button>
                                ))}
                            </div>
                        </li>

                        {date === "weekly" && (
                            <li className='relative w-auto inline-block mr-[20px] '>
                                <button
                                    onClick={() => setOpenWeekList(!openWeekList)} className='sort-button w-auto pr-[15px] leading-[22px] min-w-0 after:mt-[-2px] lg:pr-[20px]'>
                                    {formatDDMM(selectWeek.startMonth)}.{formatDDMM(selectWeek.startDay)} ~ {formatDDMM(selectWeek.endMonth)}.{formatDDMM(selectWeek.endDay)} (week {selectWeek.week})
                                </button>

                                <div
                                    style={{
                                        display: openWeekList ? "block" : "none"
                                    }}
                                    className="weekList z-[3] absolute left-0 top-[30px] min-w-full bg-white border-black border-[1px] box-border">
                                    {data.weekList?.filter(item => item.year === selectYear)?.map(item => {
                                        let isSelected = item.weekId === selectWeek.weekId
                                        return (
                                            <button
                                                key={item.weekId}
                                                style={{
                                                    background: isSelected ? "black" : "white",
                                                    color: isSelected ? "white" : "black",
                                                    border: isSelected ? "none" : ""
                                                }}
                                                onClick={() => {
                                                    setOpenWeekList(false)
                                                    onSubmit({
                                                        weekId: item.weekId
                                                    })
                                                }}
                                                className='block relative whitespace-nowrap w-full h-[30px] leading-[30px] py-0 px-[10px] border-t-[black] border-[1px] first:border-none'
                                            >
                                                <span>{formatDDMM(item.startMonth)}.{formatDDMM(item.startDay)} ~ {formatDDMM(item.endMonth)}.{formatDDMM(item.endDay)} (week {item.week})</span>
                                            </button>
                                        )
                                    })}

                                </div>


                            </li>
                        )}


                        {date === "monthly" && (
                            <li className='relative w-auto inline-block mr-[20px] '>
                                <button
                                    onClick={() => setOpenMonthList(!openMonthList)} className='sort-button w-auto pr-[15px] leading-[22px] min-w-0 after:mt-[-2px] lg:pr-[20px]'>
                                    {formatDDMM(selectMonth.month)}
                                </button>

                                <div
                                    style={{
                                        display: openMonthList ? "block" : "none"
                                    }}
                                    className="weekList z-[3] absolute left-0 top-[30px] min-w-full bg-white border-black border-[1px] box-border">
                                    {data.monthList?.filter(item => item.year === selectYear)?.map(item => {
                                        let isSelected = item.month === selectMonth.month && item.year === selectMonth.year
                                        return (
                                            <button
                                                key={item.month}
                                                style={{
                                                    background: isSelected ? "black" : "white",
                                                    color: isSelected ? "white" : "black",
                                                    border: isSelected ? "none" : ""
                                                }}
                                                onClick={() => {
                                                    setOpenMonthList(false)
                                                    onSubmit({
                                                        month: item.month,
                                                        year: item.year
                                                    })
                                                }}
                                                className='block relative whitespace-nowrap w-full h-[30px] leading-[30px] py-0 px-[10px] border-t-[black] border-[1px] first:border-none'
                                            >
                                                <span>{formatDDMM(item.month)}</span>
                                            </button>
                                        )
                                    })}

                                </div>


                            </li>
                        )}
                    </ul>
                )}

            </div>
            {date === "daily" && (
                <DatePicker open={openDatePicker} handleClose={() => {
                    setOpenDatePicker(false)
                }} endDay={data.endDay} day={day} />
            )}
        </div>
    )
}
