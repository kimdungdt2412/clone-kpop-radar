import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber, splitArtistData } from '../../utils/function'
import IconRankUp from '../Icon/IconRankUp'
import IconRankDown from '../Icon/IconRankDown'
import IconRankEqual from '../Icon/IconRankEqual'
import IconRankNew from '../Icon/IconRankNew'
import "./style.css"

export default function BoardItem({ item, isViewCount = false, setSelectedItem, type }) {

    const { artistBr, artistName } = splitArtistData(item.artists ?? "")
    const [visible, setVisible] = useState(false);
    const isMobile = window?.innerWidth < 1024


    const handleData = (isTotal) => {
        if (isTotal) return (
            <span>
                {formatNumber(item.total)}
            </span>
        )

        return (<span>
            {item.incCount > 0 && (
                <IconRankUp isWhite={visible && !isMobile} />
            )}

            {item.incCount < 0 && (
                <IconRankDown isWhite={visible && !isMobile} />
            )}

            {!item.incCount && (
                <IconRankEqual isWhite={visible && !isMobile} />
            )}
            {!item.incCount ? "-" : formatNumber(item.incCount)}

        </span>)
    }


    return (
        <li
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className={`group relative z-[1] h-auto max-h-[300px] ${(visible && !isMobile) ? "active" : ""}`}>
            <div className="board-item flex items-center justify-center flex-row relative overflow-hidden py-[19px] lg:py-[25px]">
                <div className="ranking min-w-auto text-center text-[13px] leading-[13px] basis-[43px] grow-0 relative break-words lg:pl-[10px] lg:text-[16px] lg:basis-[120px] lg:leading-[16px] lg:text-left">
                    {item.orderNo}
                    <span className='font-light static inline-block w-full text-[10px] leading-[10px] mt-[8px] translate-y-[-50%] lg:inline lg:absolute lg:left-[48px] lg:mt-0 lg:top-[50%] lg:text-[12px]'>
                        {
                            typeof item.orderDiff === "undefined" ? (
                                <IconRankNew isWhite={visible && !isMobile} />
                            ) : (
                                <React.Fragment>
                                    {item.orderDiff === 0 && (
                                        <IconRankEqual isWhite={visible && !isMobile} />
                                    )}

                                    {item.orderDiff > 0 && (
                                        <IconRankUp isWhite={visible && !isMobile} />
                                    )}

                                    {item.orderDiff < 0 && (
                                        <IconRankDown isWhite={visible && !isMobile} />
                                    )}

                                    {item.orderDiff !== 0 && (item.orderDiff > 0 ? item.orderDiff : -item.orderDiff)}
                                </React.Fragment>
                            )
                        }
                    </span>
                </div>


                <div className="intro">

                    {isViewCount ? (
                        <a
                            onClick={() => setSelectedItem(item)}
                            className='absolute left-0 top-[50%] translate-y-[-50%] before:content-[""] before:z-[2] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-icon_view_yt before:bg-no-repeat before:bg-[50%_center] before:opacity-1 before:bg-[length:13px_auto] after:content-[""] after:z-[1] after:block after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:w-full after:h-full after:bg-black after:opacity-20 lg:before:opacity-0 lg:after:opacity-0 lg:group-hover:after:opacity-30 lg:group-hover:after:scale-[1.4] lg:group-hover:before:opacity-100'>
                            <figure className='relative overflow-hidden w-[60px] h-[34px] lg:w-[72px] lg:h-[42px] lg:group-hover:scale-[1.4]'>
                                <img className='block absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-50%]' src={item.thumbnailUrl} />
                            </figure>
                        </a>
                    ) : (
                        <a
                            onClick={() => window.open(item.url)}>
                            <figure className='absolute top-[50%] left-0 translate-y-[-50%] overflow-hidden w-[46px] h-[46px] rounded-[50%]'>
                                <img className='block absolute top-[50%] left-[50%] max-w-[46px] translate-x-[-50%] translate-y-[-50%]' src={item.imgUrl} />
                            </figure>
                        </a>
                    )}

                    {isViewCount ? (
                        <div className="text-wrap overflow-hidden ml-auto w-full pr-0 lg:pr-[40px] lg:ml-[20px]">
                            <span className='artistName'>{item.songName}
                            </span>
                            <Link
                                to={`/artist/${artistBr}`}
                                className='relative inline-block text-[#666] overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] text-[12px] p-0 h-auto leading-[17px] mr-[10px] after:content-[""] after:absolute after:block after:rounded-[14px] after:opacity-100 after:top-auto after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[#666] after:border-none lg:text-[14px] lg:after:content-none lg:h-[24px] lg:group-hover:text-white lg:group-hover:pr-[10px] lg:group-hover:pl-[10px] lg:group-hover:rounded-[14px] lg:group-hover:border-white lg:group-hover:border-[1px] lg:group-hover:leading-[24px]'
                            >
                                <span className='font-light m-0 transition-all'>{artistName}</span>
                            </Link>
                        </div>

                    ) : (
                        <React.Fragment>

                            {item.visible !== 0 ? (
                                <Link
                                    to={`/artist/${item.artistPath}`}
                                    className='inline-block relative w-auto'
                                >
                                    <span className='artistName after:content-[""] after:absolute after:block after:left-0 after:bottom-[2px] after:w-full after:h-[1px] after:bg-[black] lg:group-hover:after:bg-white'>{item.artistName}
                                    </span>
                                </Link>
                            ) : (
                                <span className='artistName'>{item.artistName}
                                </span>
                            )}
                        </React.Fragment>
                    )}

                </div>

                {isViewCount && (
                    <React.Fragment>

                        {type !== "total" ? (

                            <React.Fragment>

                                <div
                                    className="growth"
                                >
                                    <p className='relative inline-block'>
                                        {handleData(false)}
                                    </p>
                                </div>

                                <div
                                    className="total hidden lg:block "
                                >
                                    <p className='relative inline-block'>
                                        {handleData(true)}
                                    </p>
                                </div>

                            </React.Fragment>

                        ) : (

                            <React.Fragment>

                                <div
                                    className="growth"
                                >
                                    <p className='relative inline-block'>
                                        {handleData(true)}
                                    </p>
                                </div>

                                <div
                                    className="total hidden lg:block">
                                    <p className='relative inline-block'>
                                        {handleData(false)}
                                    </p>
                                </div>

                            </React.Fragment>

                        )}

                    </React.Fragment>
                )}

                {!isViewCount && (
                    <React.Fragment>
                        <div
                            className="growth"
                        >
                            <p className='relative inline-block'>
                                {handleData(type === "total")}
                            </p>
                        </div>

                        <div
                            className="total">
                            <p className='relative inline-block'>
                                {handleData(type !== "total")}
                            </p>
                        </div>
                    </React.Fragment>
                )}

                {isViewCount && (
                    <div className="hidden mr-[40px] ml-[55px] min-w-[100px] font-light lg:block ">{item.publishTime}</div>
                )}
            </div>

            {isViewCount && (
                <div className="pointer-events-none hidden lg:block preview absolute z-[-2] top-0 left-[50%] ml-[-580px] w-[1540px] h-0 bg-black overflow-hidden transition-all duration-500 opacity-0 group-hover:h-full group-hover:opacity-100">
                    <img src={item.backgroundUrl} alt="bgUrl" className='block absolute top-[50%] translate-y-[-50%] left-0 w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

                </div>
            )}
        </li>
    )
}
