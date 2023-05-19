import React from 'react'
import { useGetDailyDataQuery, useGetMonthListQuery, useGetMonthlyDataQuery, useGetRealtimeDataQuery, useGetStartDayQuery, useGetWeekListQuery, useGetWeeklyDataQuery, useLazyGetDailyDataQuery, useLazyGetMonthlyDataQuery, useLazyGetRealtimeDataQuery, useLazyGetWeeklyDataQuery } from '../../app/services/Youtube'
import { selectYoutube } from './YoutubeSlice';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { sortGenderMap, youtubeSortTypeValue } from '../../utils/config';
import SortByType from '../../components/Sort/SortByType';
import TableHeader from '../../components/TableHeader';
import TableBody from '../../components/TableBody';
import TablePagination from '../../components/TablePagination';
import SortByDate from '../../components/Sort/SortByDate';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import BoardDate from '../../components/BoardDate';
import SortByGender from '../../components/Sort/SortByGender';


export const isValidNumber = (value = "") => {
  return !isNaN(Number(value)) && Number(value) !== 0
}

export default function ViewCount() {
  const [searchParams] = useSearchParams()
  let { type = "growth", date = "realtime", gender = "all", page = "1", day = "", weekId = "", month = "", year = "" } = Object.fromEntries([...searchParams])

  const youtubeData = useSelector(selectYoutube);
  const [getRealtimeData] = useLazyGetRealtimeDataQuery()
  const [getDailyData] = useLazyGetDailyDataQuery()
  const [getWeeklyData] = useLazyGetWeeklyDataQuery()
  const [getMonthlyData] = useLazyGetMonthlyDataQuery()

  const payload = {
    orderCountInPage: youtubeData.orderCountInPage,
    lastOrderNo: (Number(page) - 1) * youtubeData.orderCountInPage,
    gender: gender === "all" ? "" : sortGenderMap[gender],
    ...youtubeSortTypeValue[type],
  }

  const getDay = useGetStartDayQuery()
  const getWeek = useGetWeekListQuery()
  const getMonth = useGetMonthListQuery()

  useGetRealtimeDataQuery(date === "realtime" ? {...payload} : skipToken)

  useGetDailyDataQuery((date === "daily" && !!getDay.data?.endDay) ? {
    ...payload,
    day: (day !== "" && Number(day) <= Number(getDay.data?.endDay)) ? day : getDay.data?.endDay,
  } : skipToken)

  useGetWeeklyDataQuery((date === "weekly" && getWeek.data?.length > 0) ? {
    ...payload,
    weekId: isValidNumber(weekId) ? Number(weekId) : getWeek.data[0]?.weekId,
  } : skipToken)

  useGetMonthlyDataQuery((date === "monthly" && getMonth.data?.length > 0) ? {
    ...payload,
    month: isValidNumber(month) ? Number(month) : getMonth.data[0]?.month,
    year: isValidNumber(year) ? Number(year) : getMonth.data[0]?.year
  } : skipToken)

  const handleRefreshData = () => {
    switch (date) {
      case "realtime":
        getRealtimeData(payload)
        break;

      case "daily":
        getDailyData({
          ...payload,
          day: (day !== "" && Number(day) <= Number(getDay.data?.endDay)) ? day : getDay.data?.endDay,
        })
        break;

      case "weekly":
        getWeeklyData({
          ...payload,
          weekId: isValidNumber(weekId) ? Number(weekId) : getWeek.data[0]?.weekId,
        })
        break;

      case "monthly":
        getMonthlyData({
          ...payload,
          month: isValidNumber(month) ? Number(month) : getMonth.data[0]?.month,
          year: isValidNumber(year) ? Number(year) : getMonth.data[0]?.year
        })
        break;

      default:
        break;
    }
  }

  const getData = () => {
    switch (date) {
      case "realtime":
        return youtubeData.realtimeData

      case "daily":
        return youtubeData.dailyData

      case "weekly":
        return youtubeData.weeklyData

      case "monthly":
        return youtubeData.monthlyData

      default:
        return []
    }
  }


  return (
    <div className='relative'>
      <div className="board-sort p-0 pt-[25px] ml-[43px] max-w-[980px]">
        <ul className="list-none">
          <SortByType type={type} searchParams={searchParams} />
          <SortByDate date={date} searchParams={searchParams} />
          <SortByGender gender={gender} searchParams={searchParams} />
        </ul>
      </div>

      <div className="board-date relative min-h-[17px] border-b-[#e5e5e5] border-b-[1px] mt-[35px] ml-[43px] pr-[15px] pb-[11px]">
      <BoardDate data={youtubeData} date={date} day={day} weekId={weekId} year={year} month={month}/>

        <div className="float-right w-full">
          <button
            onClick={handleRefreshData}
            className='absolute inline-block overflow-hidden text-transparent align-sub bottom-[11px] right-[15px] w-[17px] h-[17px] after:content-[""] after:block after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rotate-0 after:[transform-origin:50%] after:bg-icon_refresh after:transition-transform after:duration-300 hover:after:rotate-[-1turn]'>
            refresh
          </button>
        </div>
      </div>

      <TableHeader isViewCount={true} type={type} />
      <TableBody data={getData()} isViewCount={true} type={type} />
      <TablePagination total={youtubeData.totalCount[date]} orderCountInPage={youtubeData.orderCountInPage} currentPage={Number(page)} searchParams={searchParams} />
    </div>
  )
}
