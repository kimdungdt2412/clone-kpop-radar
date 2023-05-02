import React, { useState } from 'react'
import shareIcon from "../../assets/images/kr-artist-ic-share.svg"
import { getDateByString, handleShareLink } from '../../utils/function'
import { useDispatch } from 'react-redux'
import { setCurrentBriefData } from '../../features/BriefList/BriefSlice'
import { briefApi } from '../../app/services/Brief'
import { snsList } from '../../utils/config'
import { useNavigate } from 'react-router-dom'

export default function BriefIntro({
    brief = {}
}) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { year, month, day } = getDateByString(brief.date.toString())
    const dispatch = useDispatch()
    const [trigger] = briefApi.endpoints.getBriefContent.useLazyQuery()
    return (
        <React.Fragment>
            <li className='brief_date h-[70px] mb-0 text-right float-none w-auto max-w-[inherit] p-0 box-border  lg:h-[468px] lg:float-left lg:w-[50%] lg:px-[20px] xl:h-[626px] xl:px-[30px] xl:max-w-[640px]'>
                <div className='date pt-0 mr-[5.3333vw] inline-block text-center lg:float-left lg:mr-0 lg:pt-[25px] xl:pt-[30px] '>
                    <span className='block text-[10px] mb-[4px] font-light lg:mb-[6px] xl:text-[13px]'>
                        {year}. {month}
                    </span>
                    <strong className='block text-[36px] font-medium mb-[5px] leading-[36px] xl:text-[46px] xl:leading-[46px]'>
                        {day}
                    </strong>
                </div>
            </li>

            <li className='brief_info float-none w-auto max-w-[inherit] h-auto p-0 mb-[10px] lg:float-left lg:w-[50%] lg:max-w-[432px] lg:h-[540px] lg:mb-[80px] lg:py-0 lg:px-[20px] xl:h-[700px] xl:max-w-[640px] xl:px-[30px] xl:mb-[120px]'>
                <div className='flip_card relative w-full h-full' onClick={() => {
                    trigger({
                        briefId: brief.briefId
                      }).then(() => {
                        navigate(`/brief/${brief.briefId}`)
                      })
                }}>
                    <div className='front-panel border-t-0'>
                        <div className='title'>
                            <h3 className='overflow-hidden text-ellipsis font-bold max-h-[84px] mb-[12px] font-noto break-keep text-[24px] leading-[34px] pr-[40px] line-clamp-2 lg:mb-[10px] xl:text-[28px] xl:leading-[40px] xl:mb-[12px]'>
                                {brief.title}
                            </h3>

                            <p className='overflow-hidden text-ellipsis mb-[12px] font-noto break-keep max-h-[84px] text-[14px] leading-[23px]'></p>
                        </div>
                        <p className='btn ml-[5.3333vw] lg:ml-0'>
                            <button className='relative btn-more'>
                                <span className='absolute top-[-1px] left-[-1px] w-[1px] h-[1px] overflow-hidden '>+</span>
                            </button>
                        </p>

                        <div className='img-area static mt-[36px] w-full lg:mt-0 lg:absolute lg:bottom-0 lg:left-0'>
                            <div className='count-info relative font-light leading-[28px] mb-[8px] ml-[5.3333vw] mr-[5.3333vw] text-[12px] lg:mx-0 xl:text-[15px]'>
                                <span className='view inline-block w-[90px] lg:w-[86px] xl:w-[106px]'>
                                    <span>{brief.viewCount}</span>
                                    &nbsp;views
                                </span>
                                <span className='share inline-block'>
                                    <span>
                                        {brief.shareCount}
                                    </span>
                                    &nbsp;shares
                                </span>
                                {window.screen.width >= 1200 && open && (
                                    <span className='sns-list absolute top-0 h-[30px] w-[134px] right-[35px] xl:w-[156px] xl:right-[55px]'>
                                        {snsList.map(item => {
                                            return (
                                                <a key={item.id} href="#" className={`no-underline inline-block ml-[4px] overflow-hidden float-left w-[30px] h-[30px] first:ml-0 xl:ml-[12px]`} onClick={() => handleShareLink(item.id, brief)}>
                                                    <img src={item.img} className='w-[22px] m-auto' />
                                                </a>
                                            )
                                        })}

                                    </span>
                                )}
                                <img src={shareIcon} className='share-icon' onClick={(e) => {
                                    e && e.stopPropagation()
                                    if (window.screen.width < 1200) {
                                        dispatch(setCurrentBriefData(brief))
                                    } else {
                                        setOpen(!open)
                                    }
                                }}>
                                </img>
                            </div>
                            <figure className='block overflow-hidden max-h-[215px] lg:max-h-[246px] xl:max-h-[320px]'>
                                <img className='w-full block' src={brief.thumbnailUrl} />
                            </figure>

                        </div>
                    </div>

                </div>
            </li>
        </React.Fragment>
    )
}
