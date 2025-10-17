import React from 'react'
import linkIcon from "../../assets/images/kr-artist-today-link.svg"

export default function SNSTodayItem({ item }) {

    return (
        <li className='inline-block w-full pb-[65px] lg:w-[49%] lg:pb-[150px]'>
            <span className='inline-block font-semibold leading-1 text-[20px] lg:text-[30px]'>
                {item.name}
                <a onClick={() => {
                    window.open(item.url)
                }}>
                    <img src={linkIcon} alt={item.name} className='relative inline-block w-[5px] top-[-1px] left-[6px] lg:w-[7px] lg:top-[-4px] lg:left-[15px]' />
                </a>
            </span>

            <div>
                <span className="absolute mt-[10px] mr-[10px] text-[#999] text-[18px] leading-[.67] text-left lg:text-[36px] lg:mt-[20px] lg:mr-[10px] lg:mb-[15px] lg:ml-0">
                    {Intl.NumberFormat('en-US').format(item.totalCount)}
                </span>
                <span className='relative text-[#999] top-[7px] left-[110px] text-[10px] lg:text-[14px] lg:top-[29px] lg:left-[205px]'>Rank {item.orderNo}</span>
            </div>

            <div>
                {item.name !== "youtube" && (
                    <React.Fragment>
                        {item.incCount > 0 ? (
                            <span className='text-[10px] mt-[15px] mr-[10px] mb-[20px] text-[#ff354e] leading-[1.68] text-left absolute lg:text-[20px] lg:mt-[40px] lg:mr-[10px] lg:mb-[20px] lg:ml-0'>
                                <i className='bg-icon_rank_up mr-[8px] w-[8px] h-[7px] inline-block bg-no-repeat lg:w-[9px] lg:h-[8px] lg:mr-[8px] lg:align-middle'></i>
                                {Intl.NumberFormat('en-US').format(item.incCount)} ({parseFloat(item.incRatio).toFixed(2)}%)
                            </span>
                        ) : (
                            <span className='text-[10px] mt-[15px] mr-[10px] mb-[20px] text-[#00a2ff] leading-[1.68] text-left absolute lg:text-[20px] lg:mt-[40px] lg:mr-[10px] lg:mb-[20px] lg:ml-0'>
                                <i className='bg-icon_rank_down mr-[8px] w-[8px] h-[7px] inline-block bg-no-repeat lg:w-[9px] lg:h-[8px] lg:mr-[8px] lg:align-middle'></i>
                                {Intl.NumberFormat('en-US').format(-item.incCount)} ({parseFloat(item.incRatio).toFixed(2)}%)
                            </span>
                        )}
                    </React.Fragment>
                )}
            </div>

        </li>
    )
}
