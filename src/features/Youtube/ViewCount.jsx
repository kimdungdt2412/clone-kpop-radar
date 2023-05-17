import React from 'react'
import { useGetRealtimeDataQuery, useLazyGetRealtimeDataQuery } from '../../app/services/Youtube'
import { selectYoutube } from './YoutubeSlice';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { youtubeSortTypeValue } from '../../utils/config';
import SortByType from '../../components/SortByType';
import TableHeader from '../../components/TableHeader';
import TableBody from '../../components/TableBody';

export default function ViewCount() {
  const [searchParams] = useSearchParams()
  let { type = "growth", date = "realtime", gender = "all", page = "1" } = Object.fromEntries([...searchParams])

  const youtubeData = useSelector(selectYoutube);
  const [trigger] = useLazyGetRealtimeDataQuery()
  const { isSuccess, isFetching } = useGetRealtimeDataQuery({
    orderCountInPage: youtubeData.orderCountInPage,
    lastOrderNo: (Number(page) - 1) * youtubeData.orderCountInPage,
    ...youtubeSortTypeValue[type],
    gender: gender === "all" ? "" : gender,
  })
  return (
    <div className='relative'>
      <div className="board-sort p-0 pt-[25px] ml-[43px] max-w-[980px]">
        <ul className="list-none">
          <SortByType type={type} searchParams={searchParams} />

        </ul>
      </div>

      <div className="board-date relative min-h-[17px] border-b-[#e5e5e5] border-b-[1px] mt-[35px] ml-[43px] pr-[15px]">
        <div className="block">
          {date === "realtime" && (
            <span className="date block w-full m-0 text-[10px] leading-[17px] mt-[10px] font-light text-[#999] align-middle">
              updated {youtubeData.updateDate}
            </span>
          )}

        </div>

        <div className="float-right w-full">
          <button
            onClick={() => {
              trigger({
                orderCountInPage: youtubeData.orderCountInPage,
                lastOrderNo: (Number(page) - 1) * youtubeData.orderCountInPage,
                ...youtubeSortTypeValue[type],
                gender: gender === "all" ? "" : gender,
              })
            }}
            className='absolute inline-block overflow-hidden text-transparent align-sub bottom-[11px] right-[15px] w-[17px] h-[17px] after:content-[""] after:block after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rotate-0 after:[transform-origin:50%] after:bg-icon_refresh after:transition-transform after:duration-300 hover:after:rotate-[-1turn]'>
            refresh
          </button>
        </div>
      </div>

      <TableHeader isViewCount={true} type={type}/>
      <TableBody data={youtubeData.realtimeData} isViewCount={true} type={type}/>
    </div>
  )
}
