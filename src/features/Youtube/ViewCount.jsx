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
import ScrollProgress from '../../components/ScrollProgress'
import InnerLoading from '../../components/Loading/InnerLoading';
import { isValidNumber } from '../../utils/function';

export default function ViewCount({ isScrollDown }) {
  const [searchParams] = useSearchParams()
  let { type = "growth", date = "realtime", gender = "all", page = "1", day = "", weekId = "", month = "", year = "" } = Object.fromEntries([...searchParams])

  const youtubeData = useSelector(selectYoutube);
  const [getRealtimeData] = useLazyGetRealtimeDataQuery()
  const [getDailyData] = useLazyGetDailyDataQuery()
  const [getWeeklyData] = useLazyGetWeeklyDataQuery()
  const [getMonthlyData] = useLazyGetMonthlyDataQuery()

  const payload = {
    orderCountInPage: youtubeData.orderCountInPage,
    lastOrderNo: (isValidNumber(page) ? (Number(page) - 1) : 0) * youtubeData.orderCountInPage,
    ...youtubeSortTypeValue[type],
  }

  if (gender !== "all") payload.gender = sortGenderMap[gender]

  const getDay = useGetStartDayQuery()
  const getWeek = useGetWeekListQuery()
  const getMonth = useGetMonthListQuery()

  const getRealtime = useGetRealtimeDataQuery(date === "realtime" ? { ...payload } : skipToken)

  const getDaily = useGetDailyDataQuery((date === "daily" && !!getDay.data?.endDay) ? {
    ...payload,
    day: (day !== "" && Number(day) <= Number(getDay.data?.endDay)) ? day : getDay.data?.endDay,
  } : skipToken)

  const getWeekly = useGetWeeklyDataQuery((date === "weekly" && getWeek.data?.length > 0) ? {
    ...payload,
    weekId: isValidNumber(weekId) ? Number(weekId) : getWeek.data[0]?.weekId,
  } : skipToken)

  const getMonthly = useGetMonthlyDataQuery((date === "monthly" && getMonth.data?.length > 0) ? {
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

    <React.Fragment>
      <div
        className={`${isScrollDown ? "mini-board-sort" : "board-sort"} bg-white z-[80] w-full`}>
        <div className="p-0 pt-[25px] max-w-[980px]">
          <ul className="list-none ml-[43px] lg:ml-[120px]">
            <SortByType isViewCount={true} type={type} searchParams={searchParams} isScrollDown={isScrollDown} />
            <SortByDate isViewCount={true} date={date} searchParams={searchParams} isScrollDown={isScrollDown} />
            <SortByGender gender={gender} searchParams={searchParams} isScrollDown={isScrollDown} />
          </ul>
        </div>
      </div>


      {!isScrollDown && (

        <div className="board-date relative min-h-[17px] mt-[10px] ml-[43px] pr-[15px] max-w-[1100px] lg:mx-auto">
          <BoardDate data={youtubeData} date={date} day={day} weekId={weekId} year={year} month={month} />

          <div className="float-right w-full lg:float-none relative">

            <button
              onClick={handleRefreshData}
              className='absolute inline-block overflow-hidden text-transparent align-sub bottom-[11px] right-[15px] w-[17px] h-[17px] after:content-[""] after:block after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rotate-0 after:[transform-origin:50%] after:bg-icon_refresh after:transition-transform after:duration-300 hover:after:rotate-[-1turn] lg:bottom-[25px] lg:right-[0px] lg:w-[20px] lg:h-[20px]'>
              refresh
            </button>

          </div>
        </div>
      )}

      {isScrollDown && (
        <ScrollProgress />
      )}


      <div className="board-content max-w-[1100px] my-0 mx-auto bg-white
         transition-all duration-300 pb-[30px] overflow-hidden">

        {(getRealtime.isFetching || getDaily.isFetching || getWeekly.isFetching || getMonthly.isFetching) ? (
          <InnerLoading />
        ) : (
          <div id="main-board" className='relative'>
            <TableHeader isViewCount={true} type={type} />
            <TableBody data={getData()} isViewCount={true} type={type} />
            <TablePagination total={youtubeData.totalCount[date]} orderCountInPage={youtubeData.orderCountInPage} currentPage={Number(page)} searchParams={searchParams} />
          </div>
        )}


      </div>
    </React.Fragment>

  )
}
