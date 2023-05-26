import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber, splitArtistData } from '../../utils/function'
import IconRankUp from '../Icon/IconRankUp'
import IconRankDown from '../Icon/IconRankDown'
import IconRankEqual from '../Icon/IconRankEqual'
import IconRankNew from '../Icon/IconRankNew'
import "./style.css"
import IconLink from "../../assets/images/kr-chart-link-nor.svg"
import RedIconLink from "../../assets/images/kr-chart-link-hover.svg"
import BoardIntro, { CreationBoardIntro, ViewCountBoardIntro } from './BoardIntro'

export default function BoardItem({ item, isViewCount = false, setSelectedItem, type, isCreation = false }) {

    const [visible, setVisible] = useState(false);
    const isMobile = window?.innerWidth < 1024


    const handleData = (isTotal) => {
        if (isTotal) return (
            <span>
                {isCreation ? item.creationCount : formatNumber(item.total)}
            </span>
        )

        if (isCreation) return (
            <span>
                <IconRankUp isWhite={visible && !isMobile} />
                {item.incCount}
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
            className={`group relative z-[1] h-auto max-h-[300px] ${(visible && !isMobile) ? "active" : ""} ${(isCreation) ? "creation" : ""}`}>
            <div className="board-item flex items-center justify-center flex-row relative py-[19px] lg:py-[25px]">
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

                {
                    (isCreation || isViewCount) ? (
                        <>
                            {
                                isViewCount && (
                                    <ViewCountBoardIntro item={item} setSelectedItem={setSelectedItem} />
                                )
                            }

                            {
                                isCreation && (
                                    <CreationBoardIntro item={item} />
                                )
                            }
                        </>
                    ) : (
                        <BoardIntro item={item} />
                    )
                }

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


                {
                    !(isViewCount || isCreation) && (
                        <div className="link hidden cursor-pointer grow-0 basis-auto min-w-[90px] ml-[70px] lg:flex">
                            <a onClick={() => window.open(item.url)} className='inline-block w-[31px] h-[31px] overflow-hidden'>
                                <img className='w-full p-[1px]' src={visible ? RedIconLink : IconLink} alt="link" />
                            </a>
                        </div>
                    )
                }

            </div>

            {isViewCount && (
                <div className="preview pointer-events-none hidden lg:block preview absolute z-[-2] top-0 left-[50%] ml-[-580px] w-[1540px] h-0 bg-black overflow-hidden [transition:height_.5s,opacity_.5s] opacity-0">
                    <img src={item.backgroundUrl} alt="bgUrl" className='block absolute top-[50%] translate-y-[-50%] left-0 w-full opacity-0 transition-opacity duration-500' />

                </div>
            )}
        </li>
    )
}
