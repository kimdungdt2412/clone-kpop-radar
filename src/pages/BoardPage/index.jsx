import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { boardTypeMap } from '../../utils/config'
import TabMenu from '../../components/TabMenu'
import ViewCount from '../../features/Youtube/ViewCount'

export default function BoardPage() {
  const params = useParams()
  const [boardType, setBoardType] = useState(boardTypeMap["viewcount"])
  const [openTabMenu, setOpenTabMenu] = useState(false)


  useEffect(() => {
    if (params?.type) {
      setBoardType(boardTypeMap[params?.type])
    }
  }, [params.type])


  const handleView = () => {
    switch (boardType.index) {
      case 1:
        return (<ViewCount/>)
    
      default:
        break;
    }
  }

  return (
    <section className='relative overflow-hidden m-0 pt-[72px]'>
      <TabMenu boardType={boardType} param={params.type} open={openTabMenu} onClose={() => {
        setOpenTabMenu(false)
      }} />

      <article className='inner overflow-hidden mb-[100px]'>
        <header className='absolute top-0 left-0 right-0 max-w-[1100px] my-0 mx-auto bg-white transition-all z-[90] h-auto pt-[120px]'>

          <div className="board-info relative max-w-[980px] pr-0 ml-[43px]">
            <h2 className="text-[44px] leading-[48px] transition-all font-[700] tracking-[-0.01em]">
              <div className="flip-card relative [perspective:1600px] [transform-style:preserve-3d] w-full">
                <div className="front-panel pt-0 duration-[.25s] [backface-visibility:hidden]">
                  <p className="current-title block">
                    {boardType.name}
                    <span className='text-[11px] leading-[1] align-top font-bold'>{boardType.index}</span>
                    <span className='block [-webkit-text-stroke:1px_#000] [-webkit-text-fill-color:#fff]'> {boardType.detail}</span>
                  </p>
                </div>

                {/* <div className="front-panel pt-0 duration-[.25s] absolute top-0 left-0 w-full h-full [transform:rotateX(1440deg)]">
                <p className="current-title block">
                  youtube&nbsp;
                  <span className='text-[11px] leading-[11px] align-top font-bold'>1</span>
                  <span className='block [-webkit-text-stroke:1px_#000] [-webkit-text-fill-color:#fff]'> viewcount</span>
                </p>
              </div> */}
              </div>
            </h2>

            <p className='font-noto text-[12px] leading-[20px] text-[#999] pr-[30px] pt-[5px]'>
              <i className='bg-icon_detail inline-block ml-[2px] align-middle bg-no-repeat bg-[length:100%_auto] w-[12px] h-[14px] mr-[4px] lg:w-[20px] lg:h-[22px] lg:mr-[8px]'></i>
              <span>
                {boardType.desc}
              </span>
            </p>

            <button
              style={{
                backgroundColor: boardType.color
              }}
              type='button'
              onClick={() => {
                setOpenTabMenu(true)
              }}
              className={`group absolute block rounded-[50%] text-transparent text-center top-[-4px]  right-[25px] w-[52px] h-[52px] leading-[52px]`}>
              <i className='inline-block rounded-[50%] bg-white align-middle [transition:margin_0.2s] w-[7px] h-[7px] '></i>
              <i className='inline-block rounded-[50%] bg-white align-middle [transition:margin_0.2s] w-[7px] h-[7px] ml-[4px] group-hover:ml-[-7px]'></i>
              <i className='inline-block rounded-[50%] bg-white align-middle [transition:margin_0.2s] w-[7px] h-[7px] ml-[4px] group-hover:ml-[-7px]'></i>
            </button>
          </div>

          

        </header>

        <div className="board-content max-w-[1100px] my-0 mx-auto bg-white
         pt-[180px] transition-all duration-300 pb-[30px] overflow-hidden">
          {handleView()}
        </div>
      </article>
    </section>
  )
}
