import React from 'react'
import { formatDate } from '../../utils/function'
import { scheduleTypeMap } from '../../utils/config'
import thumbnailIcon from "../../assets/images/kr-icon-img@3x.png"

export default function BlipData({ schedules = [], collections = [] }) {

  return (
    <React.Fragment>
      {schedules.length > 0 && (
        <article className='section schedule mb-[30px] lg:mb-[77px]'>
          <header className="relative">
            <h2 className="font-bold text-[38px] lg:text-[102px]">
              SCHEDULE
            </h2>
          </header>
          <div className="inner relative max-w-[1160px] mx-auto mt-[45px] lg:mt-[70px]">
            <div className="schedule">
              <ul className="list-none">
                {schedules.map(item => (
                  <li
                    key={item.scheduleId}
                    className='inline-block w-full pb-[37px] lg:w-[49%] lg:pb-[55px]'
                  >
                    <span className="date font-bold text-[20px] lg:text-[31px]">
                      {formatDate(item.startTime)}
                    </span>

                    <div className="content flex mt-[12px] lg:mt-[25px]">
                      <img src={scheduleTypeMap[item.typeId]} className='w-[40px] h-[40px] lg:w-[71px] lg:h-[71px]' />
                      <div className="ml-[24px]">
                        <div className="font-noto font-bold mt-[6px] text-[13px] lg:mt-[6px] lg:text-[22px]">{item.title}</div>
                        <div className="font-noto whitespace-nowrap text-ellipsis text-[#999] overflow-hidden text-[11px] w-[150px] mt-[7px] lg:mt-[14px] lg:w-[300px] lg:text-[21px]">{item.message}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      )}

      <article className='section banner-blip mb-[70px] pl-0 lg:mb-[150px]'>
        <div className="bg-kr-blip-schedule-banner-mo h-[122px] w-full bg-[length:375px_122px] bg-[center_50%] bg-no-repeat cursor-pointer lg:bg-kr-blip-schedule-banner-pc lg:bg-repeat-round lg:w-[1138px] lg:h-[255px] lg:bg-[length:auto_auto] lg:[background-position:inherit]" onClick={() => window.open("https://blip.kr/")}></div>
      </article>

      {collections.length > 0 && (
        <article className="section collection mb-[40px] lg:mb-0">
          <header className="relative">
            <h2 className="font-bold text-[38px] lg:text-[102px]">
              COLLECTIONS
            </h2>
          </header>

          <div className="inner relative max-w-[1160px] mx-auto mt-[45px] lg:mt-[70px]">
            <div className="collections">
              <ul className="list-none">
                {collections.map(item => (
                  <li
                    key={item.collectionId}
                    className='inline-block w-[49%] pb-[40px] lg:w-[25%] lg:pb-[150px]'
                  >
                    <div className='content'>
                      <div
                        onClick={() => window.open(`https://s.blip.kr/c/${item.idHash}`)}
                        className="w-[10rem] h-[10rem] cursor-pointer [background:linear-gradient(180deg,transparent 0,rgba(0,0,0,.4))] lg:w-[16.6rem] lg:h-[16.6rem]">
                        <img
                          loading='lazy'
                          src={`https://image.blip.kr/v1/file/${item.coverFileId}`}
                          alt="cover-image"
                          className='relative z-[-1] mr-[1.133rem] object-cover w-[10rem] h-[10rem] lg:w-[16.6rem] lg:h-[16.6rem]'
                        />

                        <div className="relative text-white bottom-[2rem] left-[0.8rem] lg:bottom-[2rem] lg:left-[1.2rem]">
                          <img src={thumbnailIcon} alt="thumbnail" className='inline-block w-[16px] h-[13px] mr-[5px] align-middle' />
                          {item.imageCount}
                        </div>

                      </div>
                    </div>

                    <div className="description relative top-[12px] lg:top-[20px]">
                      <div className="text-[13px] leading-normal h-auto text-ellipsis overflow-hidden w-[90%] whitespace-nowrap font-bold mb-[5px] lg:text-[16px]">
                        {item.title}
                      </div>

                      <div className="text-[12px] text-[#999] lg:text-[14px]">
                        <img
                        loading='lazy'
                        src={`https://image.blip.kr/v1/file/${item.profileFileId}`}
                        alt="profile-image"
                        className='inline-block w-[14px] h-[14px] mr-[4px] align-bottom rounded-[20px] border-[1px] border-black/20 object-cover lg:align-middle lg:w-[20px] lg:h-[20px]'
                        />
                        {item.nickname}
                      </div>

                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </article>
      )}

    </React.Fragment>
  )
}
