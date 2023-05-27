import React, { useEffect, useRef, useState } from 'react'
import "./style.css"
import BoardIntro from './BoardIntro'
import MoreIcon from "../../assets/images/kr-chart-more-nor.svg"
import CloseIcon from "../../assets/images/kr-chart-more-nor.png"
import { Link } from 'react-router-dom'
import defaultImg from "../../assets/images/kr-artist-none-profile-img.png"
import MoreIconHover from "../../assets/images/kr-chart-more-hover.png"
export default function BadgeBoardItem({ item, setSelectedItem, badges }) {
    const itemRef = useRef(null)
    const [imgSrc, setImgSrc] = useState(item.imageUrl)
    const onError = () => {
        setImgSrc(defaultImg)
    }
    const [visible, setVisible] = useState(false);
    const [openChart, setOpenChart] = useState(false)
    const isMobile = window?.innerWidth < 1024

    useEffect(() => {
        function handleClickOutside(event) {
          if (itemRef?.current && !itemRef.current.contains(event.target) && event.target.id !== "closeYoutubeModal") {
            setVisible(false)
            setTimeout(() => {
                setOpenChart(false)
            }, 200)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [itemRef]);

    return (
        <li
            ref={itemRef}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onBlur={() => setOpenChart(false)}
            className={`${(visible || openChart) ? "active" : ""} relative z-[1] h-auto`}>
            <div className="board-item flex items-center justify-center flex-row relative py-[19px] lg:py-[25px]">
                <div className="ranking min-w-auto text-center text-[13px] leading-[13px] basis-[43px] grow-0 relative break-words lg:pl-[10px] lg:text-[16px] lg:basis-[120px] lg:leading-[16px] lg:text-left">
                    {item.rank}
                </div>

                <div className="intro text-left w-[41%] basis-0 leading-[20px] grow break-words overflow-hidden">
                    <img className='inline-block w-[48px] h-[48px] rounded-[50%] overflow-hidden object-cover' src={imgSrc} onError={onError} />

                    <Link
                        to={`/artist/${item.path}`}
                    >
                        <strong className='absolute text-[13px] w-[70px] pt-[18px] pl-[13px] font-noto overflow-hidden text-ellipsis  whitespace-nowrap underline box-content leading-[13px] lg:text-[17px] lg:pt-[14px] lg:[pl-15px] lg:w-[150px] lg:leading-[17px]'>{item.name}
                        </strong>
                    </Link>
                </div>

                <div className="badge text-left grow basis-0 lg:basis-[25%]">
                    <ul className='list-none lg:mr-[-35px] lg:ml-[35px]'>
                        {badges?.map((item, index) => {
                            let isMore = index === 3  && badges.length >= 5
                            if ((isMobile && index < 4) || !isMobile) return (
                                <React.Fragment key={index}>
                                    <li
                                        className='inline-flex text-center px-[10px] ml-[-28px] first:ml-0 lg:px-[11px] lg:ml-[-36px] lg:first:ml-[-36px]'>
                                        <img src={item.imageUrl}
                                            style={{
                                                filter: "drop-shadow(1px 0px 0 rgba(141, 32, 46, 0.5))",
                                                zIndex: badges.length - index
                                            }}
                                            className='w-auto h-[32px] lg:h-[41px]' />
                                    </li>

                                    {(isMobile && isMore) && (
                                        <li
                                            className='inline-flex text-center px-[10px] ml-[-28px] lg:hidden'>
                                            <img src={"https://storage.kpop-radar.com/static/badge/kr-artist-badge-red-more.png"}
                                                style={{
                                                    zIndex: badges.length - index - 1
                                                }}
                                                className='w-auto h-[32px]' />
                                        </li>
                                    )}

                                </React.Fragment>

                            )
                        })}
                    </ul>
                </div>

                <div className="total text-left grow max-w-[40px] lg:max-w-[170px] lg:text-center">
                    {item.totCount}
                </div>

                <a onClick={() => {
                    setOpenChart(!openChart)
                    
                }} className='link cursor-pointer block w-[21px] h-[21px] z-[1] mt-[-8px] mr-[10px] overflow-hidden lg:w-[28px] lg:h-[28px]'>
                    <img className='w-full p-[1px]' src={MoreIconHover ? (openChart ? CloseIcon : MoreIconHover) : MoreIcon} alt="link" />
                </a>

            </div>

            <div
                style={{
                    maxHeight: openChart ? "fit-content" : "0"
                }}
                className='chart-inner h-auto relative top-0 left-0 overflow-hidden [transition:max-height_.3s] after:content-[""] after:block after:absolute after:z-[-1] after:top-0 after:left-0 after:right-0 after:w-full after:ml-0 after:h-full after:bg-[black]'>
                <div
                    style={{
                        opacity: openChart ? "1" : "0",
                        transition: openChart ? "opacity .3s .2s" : "opacity .1s"
                    }}
                    className="inner relative overflow-hidden h-auto transition-opacity duration-100">
                    <hr className='mb-[30px] mt-[7px] border-t-[0.5px] border-t-[#999]' />

                    <ul className="list-none mx-[initial] mb-[15px] lg:ml-[35%] lg:mr-[10%] ">
                        {
                            badges?.map((item, index) => (
                                <li key={index}
                                    onClick={(e) => {
                                        setTimeout(() => {
                                            setSelectedItem(item)
                                        }, 500)
                                    }}
                                    className='inline-block text-white text-center w-[33%] pb-[25px] lg:w-[25%] lg:py-[50px]'>
                                    <div className="">
                                        <img src={item.imageUrl} className={`relative mx-auto transition-transform duration-500 w-[64px] h-[68px] cursor-pointer active:[transform:rotateY(1turn)]  `} />

                                        <span className={`whitespace-nowrap relative top-[5px] text-[10px] lg:text-[17px] lg:top-[20px]`}>{item.songName.length > 12 ? item.songName.substring(0, 10) + ".." : item.songName}
                                        </span>
                                        <span className='block relative top-[8px] text-[10px] text-[#999] font-light lg:top-[25px] lg:text-[14px]'>{item.acquireDate}</span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </li>
    )
}
