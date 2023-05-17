import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber, splitArtistData } from '../../utils/function'
import IconRankUp from '../Icon/IconRankUp'
import IconRankDown from '../Icon/IconRankDown'
import IconRankEqual from '../Icon/IconRankEqual'


export default function BoardItem({ item, isViewCount, setSelectedItem, type }) {

    const { artistBr, artistName } = splitArtistData(item.artists ?? "")
    return (
        <li className='relative z-[1] h-auto max-h-[300px] transition-[max-height]'>
            <div className="board-item flex items-center justify-center flex-row relative overflow-hidden py-[19px]">
                <div className="ranking min-w-auto text-center text-[13px] leading-[16px] basis-[43px]  grow-0 relative break-words">
                    {item.orderNo}
                    <span className='font-light static inline-block w-full text-[10px] leading-[11px] mt-[8px] translate-y-[-50%]'>
                        {item.orderDiff === 0 && (
                            <IconRankEqual />
                        )}

                        {item.orderDiff > 0 && (
                            <IconRankUp />
                        )}

                        {item.orderDiff < 0 && (
                            <IconRankDown />
                        )}

                        {item.orderDiff !== 0 && (item.orderDiff > 0 ? item.orderDiff : -item.orderDiff)}
                    </span>
                </div>


                <div className="grow basis-[41%] text-left text-[#666] relative text-[10px] pl-[73px] break-words overflow-hidden">

                    {isViewCount && (
                        <a
                            onClick={() => setSelectedItem(item)}
                            className='absolute left-0 top-[50%] translate-y-[-50%] before:content-[""] before:z-[2] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-icon_view_yt before:bg-no-repeat before:bg-[50%_center] before:opacity-1 before:bg-[length:13px_auto] after:content-[""] after:z-[1] after:block after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:w-full after:h-full after:bg-black after:opacity-20'>
                            <figure className='relative overflow-hidden w-[60px] h-[34px]'>
                                <img className='block absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-50%]' src={item.thumbnailUrl} />
                            </figure>
                        </a>
                    )}

                    <div className="text-wrap overflow-hidden ml-auto w-full pr-0">
                        <span className='block text-black max-w-[390px] w-full text-[13px] leading-[20px] overflow-hidden text-ellipsis  whitespace-nowrap'>{isViewCount ? item.songName : item.artistName}</span>


                        {isViewCount && (
                            <Link
                                to={`/artist/${artistBr}`}
                                className='relative inline-block text-[#666] overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] text-[12px] p-0 h-auto leading-[17px] mr-[10px] after:content-[""] after:absolute after:block after:rounded-[14px] after:opacity-100 after:top-auto after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[#666] after:border-none'
                            >
                                <span className='font-light m-0 transition-all'>{artistName}</span>
                            </Link>
                        )}

                    </div>
                </div>


                {type !== "total" && (
                    <div
                        className="total grow break-words text-left basis-[110px] text-[11px] px-[25px] pb-[14px]"
                    >
                        <p className='relative inline-block'>
                            <span>
                                {item.prevIncCount > 0 && (
                                    <IconRankUp />
                                )}
                                {formatNumber(item.prevIncCount)}
                            </span>
                        </p>
                    </div>
                )}

                <div
                    style={{
                        display: (isViewCount && type !== "total") ? "none" : "block"
                    }}
                    className="total grow break-words text-left basis-[110px] text-[11px] px-[25px] pb-[14px]"
                >
                    <p className='relative inline-block'>
                        <span>
                            {formatNumber(item.playCount)}
                        </span>
                    </p>
                </div>
            </div>
        </li>
    )
}
