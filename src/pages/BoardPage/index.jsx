import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { boardTypeMap } from '../../utils/config'
import TabMenu from '../../components/TabMenu'
import ViewCount from '../../features/Youtube/ViewCount'
import "./style.css"
import Channel from '../../features/Channel/Channel'
import SNSFollowers from '../../features/SNS/SNS'
import TiktokCreation from '../../features/Tiktok/Tiktok'
import SiteArtist from '../../features/SiteArtist/SiteArtist'
import Fancafe from '../../features/Fancafe/Fancafe'
import Badge from '../../features/Badge/Badge'

export default function BoardPage() {
  const params = useParams()
  const [boardType, setBoardType] = useState(boardTypeMap["viewcount"])
  const [openTabMenu, setOpenTabMenu] = useState(false)
  const [isScrollDown, setIsScrollDown] = useState(false);

  const handleScroll = () => {
    let modifier = window.innerWidth >= 1024 ? 200 : 50;
    if (window.scrollY > modifier) {
      setIsScrollDown(true)
    }
    else {
      setIsScrollDown(false)
    }
  };

  const handleMainContent = () => {
    switch (boardType.index) {
      case 1:
        return (<ViewCount isScrollDown={isScrollDown} />)

      case 2:
        return (<Channel isScrollDown={isScrollDown} />)

      case 3:
      case 4:
        return (<SNSFollowers siteId={boardType.siteId} isScrollDown={isScrollDown} />)

      case 5:
        return (<TiktokCreation isScrollDown={isScrollDown} />)

      case 6:
      case 7:
        return (<SiteArtist siteId={boardType.siteId} isScrollDown={isScrollDown} />)

      case 8:
        return (<Fancafe isScrollDown={isScrollDown} />)
      case 9:
        return (<Badge isScrollDown={isScrollDown} />)
      default:
        break;
    }
  }

  useEffect(() => {
    if (params?.type) {
      setBoardType(boardTypeMap[params?.type])
    }
    else {
      setBoardType(boardTypeMap["viewcount"])
    }
  }, [params.type])



  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [window.pageYOffset]);

  return (
    <section className={`${isScrollDown ? "minify" : ""} relative overflow-hidden m-0 pt-[72px] lg:mt-[135px]`}>
      <TabMenu boardType={boardType} param={params.type} open={openTabMenu} onClose={() => {
        setOpenTabMenu(false)
      }} />

      <article className='inner overflow-hidden mb-[100px]'>
        <header
          className={`${isScrollDown ? "mini-board-header" : "board-header"}`}
        >

          <div className="board-info relative max-w-[980px] pr-0 ml-[43px] lg:ml-[120px]">
            <h2 className={`transition-all duration-300 font-bold tracking-[-0.01em] lg:transition-none`}>
              <div className="flip-card relative [perspective:1600px] [transform-style:preserve-3d] w-full lg:w-[60%] 2xl:w-full">
                <div className="front-panel pt-0 duration-[.25s] [backface-visibility:hidden] lg:border-none">
                  <p className="current-title block">
                    {boardType.name}&nbsp;
                    {window?.screen.width < 1024 && (
                      <span className='text-[11px] leading-[1] align-top font-bold'>{boardType.index}</span>
                    )}

                    <span
                      style={{
                        display: isScrollDown ? "initial" : `${window?.screen.width >= 1024 ? 'inline-block' : 'block'}`,
                        marginLeft: isScrollDown ? "4px" : "0px"
                      }}
                      className='[-webkit-text-stroke:1px_#000] [-webkit-text-fill-color:#fff]'>
                      {boardType.detail}&nbsp;
                    </span>

                    {window?.screen.width >= 1024 && (
                      <span className='sup leading-[1] align-top font-bold'>{boardType.index}</span>
                    )}
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

            {!isScrollDown && (
              <p className='font-noto text-[12px] leading-[20px] text-[#999] pr-[30px] pt-[5px] lg:text-[20px] lg:pt-[20px]'>
                <i className='bg-icon_detail inline-block ml-[2px] align-middle bg-no-repeat bg-[length:100%_auto] w-[12px] h-[14px] mr-[4px] lg:w-[20px] lg:h-[22px] lg:mr-[8px]'></i>
                <span>
                  {boardType.desc}
                </span>
              </p>
            )}


            <button
              style={{
                backgroundColor: boardType.color
              }}
              type='button'
              onClick={() => {
                setOpenTabMenu(true)
              }}
              className={`group absolute block rounded-[50%] text-transparent text-center top-[-4px]  right-[25px] leading-[52px] lg:right-0 2xl:right-[-43px]`}>
              <i className='inline-block rounded-[50%] bg-white align-middle [transition:margin_0.2s]'></i>
              <i className='inline-block rounded-[50%] bg-white align-middle ml-[4px] [transition:margin_0.2s] lg:ml-[8px]'></i>
              <i className='inline-block rounded-[50%] bg-white align-middle ml-[4px]  [transition:margin_0.2s] lg:ml-[8px]'></i>
            </button>
          </div>

        </header>

        {handleMainContent()}

      </article>
    </section>
  )
}
