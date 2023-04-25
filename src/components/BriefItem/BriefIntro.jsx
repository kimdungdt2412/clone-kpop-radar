import React from 'react'
import shareIcon from "../../assets/images/kr-artist-ic-share.svg"
import { getDateByString } from '../../utils/function'

export default function BriefIntro({
    brief = {}
}) {
    const { year, month, day } = getDateByString(brief.date.toString())
    return (
        <React.Fragment>
            <li className='brief_date h-[70px] mb-0 text-right float-none w-auto max-w-[inherit] p-0 box-border'>
                <div className='date pt-0 mr-[5.3333vw] inline-block text-center'>
                    <span className='block text-[10px] mb-[4px] font-light'>
                        {year}. {month}
                    </span>
                    <strong className='block text-[36px] font-medium mb-[5px] leading-[36px]'>
                        {day}
                    </strong>
                </div>
            </li>

            <li className='brief_info float-none w-auto max-w-[inherit] h-auto p-0 mb-[10px]'>
                <div className='flip_card relative w-full h-full'>
                    <div className='relative h-full box-border overflow-hidden border-t-[0px] cursor-pointer pt-[40px] transition-transform duration-700 ease-in-out delay-0'>
                        <div className='max-h-[224px] overflow-hidden mx-[5.3333vw] mb-[10px] pr-0 text-[38px] font-bold leading-[1.36px] tracking-normal text-left text-black'>
                            <h3 className='overflow-hidden text-ellipsis font-bold max-h-[84px] mb-[12px] font-noto break-keep text-[24px] leading-[34px] pr-[40px]'>
                                {brief.title}
                            </h3>

                            <p className='overflow-hidden text-ellipsis mb-[12px] font-noto break-keep max-h-[84px] text-[14px] leading-[23px]'></p>
                        </div>
                        <p className='btn ml-[5.3333vw]'>
                            <button className='relative rounded-full bg-black border-0 w-[51px] h-[51px] before:content-[""] before:absolute before:top-[50%] before:left-[50%] before:h-[1px] before:w-[11px] before:bg-white before:translate-x-[-50%] before:translate-y-[-50%] after:absolute after:w-[11px] after:h-[1px] after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:rotate-90 after:content-[""] after:bg-white'>
                                <span className='absolute top-[-1px] left-[-1px] w-[1px] h-[1px] overflow-hidden '>+</span>
                            </button>
                        </p>

                        <div className='img-area static mt-[36px] w-full'>
                            <div className='count-info relative font-light leading-[28px] mb-[8px] ml-[5.3333vw] mr-[5.3333vw] text-[12px]'>
                                <span className='view inline-block w-[90px]'>
                                    <span>{brief.viewCount}</span>
                                    &nbsp;views
                                </span>
                                <span className='share inline-block'>
                                    <span>
                                        {brief.shareCount}
                                    </span>
                                    &nbsp;shares
                                </span>
                                <span className='sns-list'></span>
                                <img src={shareIcon} className='relative cursor-pointer block float-right border-0 overflow-hidden bg-transparent w-[16px] h-[15px] bottom-[-4px] before:absolute before:top-[50%] before:bg-black before:rounded-full before:content-[""] before:mt-[-2px] before:w-[4px] before:h-[4px] before:left-0 before:transition-[left] after:absolute after:top-[50%] after:bg-black after:rounded-full after:content-[""] after:mt-[-2px] after:w-[4px] after:h-[4px] after:right-0 after:transition-[right]'>
                                </img>
                            </div>
                            <figure className='block overflow-hidden max-h-[215px]'>
                                <img className='w-full block' src={brief.thumbnailUrl} />
                            </figure>

                        </div>
                    </div>

                </div>
            </li>
        </React.Fragment>
    )
}
