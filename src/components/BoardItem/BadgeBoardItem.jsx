import React, { useState } from 'react'
import "./style.css"
import BoardIntro from './BoardIntro'
import MoreIcon from "../../assets/images/kr-chart-more-nor.svg"
import CloseIcon from "../../assets/images/kr-chart-more-nor.png"
import { Link } from 'react-router-dom'

export default function BadgeBoardItem({ item, setSelectedItem, badges }) {
    const [visible, setVisible] = useState(false);
    const isMobile = window?.innerWidth < 1024

    return (
        <li
            className={`${visible ? "active" : ""} relative z-[1] h-auto`}>
            <div className="board-item flex items-center justify-center flex-row relative py-[19px] lg:py-[25px]">
                <div className="ranking min-w-auto text-center text-[13px] leading-[13px] basis-[43px] grow-0 relative break-words lg:pl-[10px] lg:text-[16px] lg:basis-[120px] lg:leading-[16px] lg:text-left">
                    {item.rank}
                </div>

                <div className="intro text-left w-[41%] basis-0 leading-[20px] grow break-words overflow-hidden">
                    <img className='inline-block w-[48px] h-[48px] rounded-[50%] overflow-hidden object-cover' src={item.imageUrl} />

                    <Link
                        to={`/artist/${item.path}`}
                    >
                        <strong className='absolute text-[13px] w-[70px] pt-[18px] pl-[13px] font-noto overflow-hidden text-ellipsis  whitespace-nowrap underline box-content leading-[13px]'>{item.name}
                        </strong>
                    </Link>
                </div>

                <div className="badge text-left grow basis-0">
                    <ul className='list-none'>
                        {badges?.map((item, index) => {
                            let isMore = index === 4 || index === badges.length - 1
                            if (index <= 4) return (
                                <React.Fragment key={index}>
                                    <li
                                        className='inline-flex text-center px-[11px]'>
                                        <img src={item.imageUrl}
                                            style={{
                                                filter: "drop-shadow(1px 0px 0 rgba(141, 32, 46, 0.5))",
                                                zIndex: badges.length - index
                                            }}
                                            className='w-auto h-[32px]' />
                                    </li>

                                    {isMore && (
                                        <li
                                            className='inline-flex text-center px-[11px]'>
                                            <img src={"https://storage.kpop-radar.com/static/badge/kr-artist-badge-red-more.png"}
                                                style={{
                                                    zIndex: badges.length - index
                                                }}
                                                className='w-auto h-[32px]' />
                                        </li>
                                    )}

                                </React.Fragment>

                            )
                        })}
                    </ul>
                </div>

                <div className="total text-left grow max-w-[40px]">
                    {item.totCount}
                </div>

                <a onClick={() => {
                    setVisible(!visible)
                }} className='link block w-[21px] h-[21px] z-[1] mt-[-8px] mr-[10px] overflow-hidden'>
                    <img className='w-full p-[1px]' src={visible ? CloseIcon : MoreIcon} alt="link" />
                </a>

            </div>

            <div className="chart-inner">

            </div>
        </li>
    )
}
