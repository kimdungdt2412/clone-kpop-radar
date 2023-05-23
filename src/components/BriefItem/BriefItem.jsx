import React, { useState } from 'react'
import shareIcon from "../../assets/images/kr-artist-ic-share.svg"
import { getDateByString, handleShareLink } from '../../utils/function'
import { useDispatch } from 'react-redux'
import { setCurrentBriefData } from '../../features/BriefList/BriefSlice'
import { briefApi } from '../../app/services/Brief'
import { snsList } from '../../utils/config'
import { useNavigate } from 'react-router-dom'

export default function BriefItem({
  brief = {},
  isPreview = false,
  artName = ""
}) {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { year, month, day } = getDateByString(brief.date.toString())
  const dispatch = useDispatch()
  const [trigger] = briefApi.useLazyGetBriefContentQuery()

  return (
    <li className='brief_info float-none w-auto max-w-[inherit] h-auto p-0 mb-[10px] lg:float-left lg:w-[50%] lg:max-w-[432px] lg:h-[540px] lg:mb-[80px] lg:py-0 lg:px-[20px] xl:h-[700px] xl:max-w-[640px] xl:px-[30px] xl:mb-[120px]'>
      <div className='flip_card relative w-full h-full' onClick={() => {
        trigger({
          briefId: brief.briefId
        }).then(() => {
          navigate(`/brief/${brief.briefId}`)
        })
      }}>
        <div className='front-panel'>
          {!!brief.artists && (
            <p className='artist inline-block mb-[12px] rounded-[12px] mr-[10px] px-[10px] py-0 border-[1px] border-solid border-[#fc354e] text-[#fc354e] font-noto text-[12px] ml-[5.3333vw] h-[20px] leading-[18px] lg:ml-0 lg:mb-[8px] lg:h-[24px] lg:leading-[20px] lg:px-[10px]'>
              <span>{isPreview ? artName : brief.artists}</span>
            </p>
          )}
          <div className='date inline-block text-center pt-0 absolute top-[40px] right-[5.3333vw] lg:top-[30px] lg:right-0'>
            <span className='block text-[10px] mb-[4px] font-light xl:text-[13px] xl:mb-[10px]'>
              {year}. {month}
            </span>
            <strong className='block text-[36px] font-medium mb-[5px] leading-[36px] xl:text-[46px] xl:leading-[46px]'>
              {day}
            </strong>
          </div>
          <div className='title lg:pr-[80px] xl:max-h-[224px]'>
            <h3 className='font-bold max-h-[84px] mb-[12px] font-noto break-keep text-[24px] leading-[34px] pr-[45px] line-clamp-2 lg:mb-[10px] xl:mb-[12px] xl:text-[28px] xl:leading-[42px]'>
              {brief.title}
            </h3>

            {!isPreview && (
              <p className=' mb-[12px] font-noto break-keep max-h-[84px] text-[14px] leading-[23px] line-clamp-3 lg:max-h-[69px] lg:mb-[8px] xl:text-[18px] xl:leading-[28px] xl:mb-[12px] xl:max-h-[84px]'>
                {brief.content}</p>
            )}
          </div>
          {!isPreview && (
            <p className='btn ml-[5.3333vw] lg:ml-0'>
              <button className='relative btn-more w-[29px] h-[29px] lg:w-[32px] lg:h-[32px]'>
                <span className='absolute top-[-1px] left-[-1px] w-[1px] h-[1px] overflow-hidden '>+</span>
              </button>
            </p>
          )}

          <div className='img-area static mt-[36px] w-full lg:mt-0 lg:absolute lg:bottom-0 lg:left-0'>
            {!isPreview && (
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
                {window.innerWidth >= 1024 && open && (
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
                  if (window.innerWidth < 1024) {
                    dispatch(setCurrentBriefData(brief))
                  } else {
                    setOpen(!open)
                  }
                }}>
                </img>
              </div>
            )}

            <figure className='block overflow-hidden max-h-[215px] lg:max-h-[246px] xl:max-h-[320px]'>
              <img className='w-full block' src={brief.thumbnailUrl} />
            </figure>

          </div>
        </div>

      </div>
    </li>
  )
}
