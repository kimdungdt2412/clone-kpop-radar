import React, { useRef } from 'react'
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
import { selectChannel } from './ChannelSlice';
import { useGetMonthListQuery, useGetMonthlyDataQuery, useGetWeekListQuery, useGetWeeklyDataQuery, useLazyGetMonthlyDataQuery, useLazyGetWeeklyDataQuery } from '../../app/services/Channel';
import InnerLoading from '../../components/Loading/InnerLoading';

export const isValidNumber = (value = "") => {
  return !isNaN(Number(value)) && Number(value) > 0
}

export default function Channel({ isScrollDown }) {
  const [searchParams] = useSearchParams()
  let { type = "growth", date = "weekly", gender = "all", page = "1", weekId = "", month = "", year = "" } = Object.fromEntries([...searchParams])

  const channelData = useSelector(selectChannel);
  const [getWeeklyData] = useLazyGetWeeklyDataQuery()
  const [getMonthlyData] = useLazyGetMonthlyDataQuery()

  const payload = {
    orderCountInPage: channelData.orderCountInPage,
    lastOrderNo: (isValidNumber(page) ? (Number(page) - 1) : 0) * channelData.orderCountInPage,
    gender: gender === "all" ? "" : sortGenderMap[gender],
    ...youtubeSortTypeValue[type],
  }

  const getWeek = useGetWeekListQuery()
  const getMonth = useGetMonthListQuery()

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
      case "weekly":
        return channelData.weeklyData

      case "monthly":
        return channelData.monthlyData

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
            <SortByType isViewCount={false} type={type} searchParams={searchParams} isScrollDown={isScrollDown} />
            <SortByDate date={date} searchParams={searchParams} isScrollDown={isScrollDown} />
            <SortByGender gender={gender} searchParams={searchParams} isScrollDown={isScrollDown} />
          </ul>
        </div>
      </div>


      {!isScrollDown && (

        <div className="board-date relative min-h-[17px] mt-[10px] ml-[43px] pr-[15px] max-w-[1100px] lg:mx-auto">
          <BoardDate data={channelData} date={date} weekId={weekId} year={year} month={month} />

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
        {(getWeekly.isFetching || getMonthly.isFetching) ? (
          <InnerLoading />
        ) : (
          <div id="main-board" className='relative'>
            <TableHeader type={type} />
            <TableBody data={getData()} type={type} />
            <TablePagination total={channelData.totalCount[date]} orderCountInPage={channelData.orderCountInPage} currentPage={Number(page)} searchParams={searchParams} />
          </div>
        )}
      </div>
    </React.Fragment>

  )
}
