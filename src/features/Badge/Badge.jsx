import React from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { badgeTypeValue } from '../../utils/config';
import SortByType from '../../components/Sort/SortByType';
import TableHeader from '../../components/TableHeader';
import TableBody from '../../components/TableBody';
import TablePagination from '../../components/TablePagination';
import SortByDate from '../../components/Sort/SortByDate';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import BoardDate from '../../components/BoardDate';
import ScrollProgress from '../../components/ScrollProgress'
import InnerLoading from '../../components/Loading/InnerLoading';
import { isValidNumber } from '../../utils/function';
import { useGetBadgeDataQuery, useGetPeriodListQuery, useLazyGetBadgeDataQuery } from '../../app/services/Badge';
import SortByBadge from '../../components/Sort/SortByBadge';
import { selectBadge } from './BadgeSlice';
import BadgeTableHeader from '../../components/TableHeader/BadgeTableHeader';

export default function Badge({ isScrollDown }) {
    const [searchParams] = useSearchParams()
    let { type = "total", date = "overall", year = "" } = Object.fromEntries([...searchParams])

    const badgeData = useSelector(selectBadge);
    const [getBadgeData] = useLazyGetBadgeDataQuery()

    const payload = {
        ...badgeTypeValue[type],


    }

    useGetPeriodListQuery()

    const getBadges = useGetBadgeDataQuery({
        ...payload,
        periodId: date === "annual" ? (!isValidNumber(year) ? `2023000` : `${year}000`) : "0" 
    })

    const handleRefreshData = () => {
        getBadgeData({
            ...payload,
            periodId: date === "annual" ? (!isValidNumber(year) ? `2023000` : `${year}000`) : "0" 
        })
    }

    return (

        <React.Fragment>
            <div
                className={`${isScrollDown ? "mini-board-sort" : "board-sort"} bg-white z-[80] w-full`}>
                <div className="p-0 pt-[25px] max-w-[980px]">
                    <ul className="list-none ml-[43px] lg:ml-[120px]">
                        <SortByBadge type={type} searchParams={searchParams} isScrollDown={isScrollDown} />
                        <SortByDate isBadge={true} date={date} searchParams={searchParams} isScrollDown={isScrollDown} />
                    </ul>
                </div>
            </div>


            {!isScrollDown && (

                <div 

                className="board-date relative min-h-[17px] mt-[10px] ml-[43px] pr-[15px] max-w-[1100px] lg:mx-auto">
                    <BoardDate isBadge={true} data={badgeData} date={date} year={year} />

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
           transition-all duration-300 pb-[30px] overflow-hidden lg:min-h-[300px]">

                {getBadges.isFetching ? (
                    <InnerLoading />
                ) : (
                    <div id="main-board" className='relative'>
                        <BadgeTableHeader type={type} />
                        <TableBody data={badgeData} isBadge={true}/>

                    </div>
                )}


            </div>
        </React.Fragment>

    )
}
