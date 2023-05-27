import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { artistApi, useGetArtistBadgeQuery, useGetArtistInfoQuery, useGetBlipDataQuery, useGetRelatedArtistsQuery, useIncArtistLikeCountQuery } from '../../app/services/Artist'
import { useSelector } from 'react-redux'
import { selectArtist } from '../../features/Artist/ArtistSlice'
import whiteLinkIcon from "../../assets/images/kr-artist-today-link_white.svg"
import linkIcon from "../../assets/images/kr-artist-today-link.svg"
import shareIcon from "../../assets/images/kr-artist-ic-share.svg"
import { Player } from '@lottiefiles/react-lottie-player'
import { ShareArtistModal, handleShareArtistLink } from '../../components/ShareArtistModal'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import SNSTodayItem from '../../components/SNSTodayItem'
import YoutubeModal from '../../components/YoutubeModal'
import { snsList } from '../../utils/config'
import Loading from '../../components/Loading/Loading';

export default function DetailArtist() {
  const params = useParams()
  const navigate = useNavigate()
  const { artistInfo, badge, summaryBadge, relatedArtist, blipData } = useSelector(selectArtist)
  const artist = artistInfo?.[params.artistPath] || {}
  const heartRef = useRef(null)
  const [likeCount, setLikeCount] = useState(0)
  const [open, setOpen] = useState(false)
  const imgRef = useRef(null)
  const [selectedBadge, setSelectedBadge] = useState({})
  const [isLoadedImg, setIsLoadedImg] = useState(false)

  const { data, isSuccess, isFetching, isError } = useGetArtistInfoQuery(params.artistPath ? {
    artistPath: params.artistPath
  } : skipToken)

  useIncArtistLikeCountQuery(isSuccess ? {
    artistPath: data?.artistPath,
    artistId: data?.artistId,
    likeCount: 0
  } : skipToken)

  useGetArtistBadgeQuery(isSuccess ? {
    artistId: data?.artistId,
  } : skipToken)

  useGetRelatedArtistsQuery(isSuccess ? {
    artistId: data?.artistId,
    lang: "en"
  } : skipToken)

  useGetBlipDataQuery(isSuccess ? {
    artistId: data?.artistId
  } : skipToken)

  const [trigger] = artistApi.useLazyIncArtistLikeCountQuery()

  const getDateYesterday = () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return `(${date.getFullYear()}.${date.getUTCMonth() < 9 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1}.${date.getUTCDate()})`
  }

  useEffect(() => {
    if (likeCount === 0) return
    const timer = setTimeout(() => {
      if (likeCount !== 0) {
        trigger({
          artistPath: artist.artistPath,
          artistId: artist.artistId,
          likeCount
        }).then(() => {
          setLikeCount(0)
        })
      }
    }, 1000);

    return () => clearTimeout(timer);

  }, [likeCount])

  useEffect(() => {
    if(isError) navigate(-1)
  }, [isError])

  if (!params.artistPath || params.artistPath === "") {
    navigate('/artist')
    return (<></>)
  }

  return (
    <section className="artist-content relative overflow-hidden m-0 pt-[72px] lg:pt-0">

      {(isFetching) ? (<Loading />) : (
        <article className="section artist mb-[100px] pt-[160px] lg:pt-[300px] lg:max-w-full lg:pl-0">
          <div className="artist-inner mt-[-70px] max-w-[1160px] mx-auto my-0 lg:mt-0">
            <div className="artist-img relative py-0 px-[10.6667%] my-0 mx-auto lg:px-[6.897%] lg:mb-[200px]">

              <div className="relative bg-gradient-to-b from-transparent to-white/[.65]">
                <img id="shareIcon" src={shareIcon}
                  onClick={() => { setOpen(true) }} alt="shareIcon" className="absolute w-[20px] right-0 top-[-35px] lg:hidden"
                />

                <span className='hidden sns-list absolute h-[30px] w-[134px] right-0 top-[-55px] lg:block xl:w-[156px]'>
                  {snsList.map(item => {
                    return (
                      <a key={item.id} href="#" className={`no-underline inline-block ml-[4px] overflow-hidden float-left w-[30px] h-[30px] first:ml-0 xl:ml-[12px]`} onClick={() => handleShareArtistLink(artist, item.id)}>
                        <img src={item.img} className='w-[22px] m-auto' />
                      </a>
                    )
                  })}

                </span>
                <ShareArtistModal artist={artist} open={open} handleClose={() => setOpen(false)} />


                <span
                  id="heartIcon"
                  className={`absolute top-[-60px] left-[-25px] lg:top-[-80px]`}
                  onClick={() => {
                    heartRef.current?.play()
                    setLikeCount(likeCount + 1)
                  }}
                >
                  <Player
                    ref={heartRef}
                    autoplay={false}
                    loop={false}
                    mode="normal"
                    speed="3"
                    src="https://assets9.lottiefiles.com/private_files/lf30_kpak4iic.json"
                    style={{
                      width: "70px",
                      height: "70px"
                    }}
                    complete
                  ></Player>

                  <span className='text-[12px] relative bottom-[45px] left-[60px]'>{artist.count ?? ""}</span>

                </span>
                <img 
                ref={imgRef} 
                id="artistImg" 
                loading="lazy" 
                onLoad={() => setIsLoadedImg(true)} src={artist.imgUrl}
                 alt="imgUrl" 
                 style={{
                  height: isLoadedImg ? "auto" : "1000px"
                 }}
                 className='inline-block relative w-full z-[-1]' />

                <div className='absolute bottom-[-10%] left-[-5%]'>
                  <p id="krName" className="translate-y-[50%] text-[30px] leading-[0.9] font-bold text-left text-black mb-[25px] lg:text-[50px]">
                    {artist.names?.[1]?.NAME || ""}
                  </p>
                  <p id="enName" className="text-[89px] leading-[0.9] font-bold text-left text-black whitespace-nowrap lg:text-[254px] lg:leading-[0.94]">
                    {artist.names?.[0]?.NAME || ""}
                  </p>
                </div>

              </div>
            </div>
          </div>

        </article>

      )}

      {summaryBadge[artist.artistId]?.length > 0 && (
        <article className='section summaryBadge'>
          <header className="relative">
            <h2 className="font-bold text-[15px] cursor-pointer lg:text-[30px]">
              BADGE
              <img src={linkIcon} alt="linkIcon" className='relative inline-block cursor-pointer left-[8px] w-[5px] top-[-1px] lg:w-[10px] lg:top-[-3px] lg:left-[18px]' />
            </h2>
          </header>

          <ul className="pt-[30px] list-none lg:pt-[80px]">
            {
              summaryBadge[artist.artistId]?.map(badge => (
                <li key={badge.key}
                  // onClick={() => {
                  //   setSelectedBadge(badge)
                  // }} 
                  className="w-[33%] inline-block mb-0 lg:w-[25%] lg:mb-[50px]">
                  <div className="min-w-[110px]">
                    <img src={badge.badgeImg} className='inline-block cursor-pointer w-[75px] ml-[15px] mb-[20px] lg:w-[150px]' />
                    <span className='relative text-white right-[14.5px] bottom-[48.5px] text-[9px] font-semibold lg:text-[17px] lg:right-[30px] lg:bottom-[85px]'>{badge.count ?? 0}</span>
                  </div>
                </li>
              ))
            }
          </ul>
        </article>
      )}

      <article className='section today pt-[40px] lg:pt-[120px]'>
        <header className="relative">
          <h2 className="font-bold text-[38px] cursor-pointer lg:text-[102px]">
            TODAY
          </h2>
        </header>

        <aside className='block pt-0 pb-[40px] lg:pb-[100px]'>
          <div className="pt-[10px] pb-[40px] lg:pt-[20px] lg:pb-[80px]">
            <p className="font-light font-noto w-full text-[12px] lg:text-[16px]">
              <i className='bg-icon_detail inline-block ml-[2px] align-middle bg-no-repeat bg-[length:100%_auto] w-[12px] h-[14px] mr-[4px] lg:w-[20px] lg:h-[22px] lg:mr-[8px]'></i>
              <span className='text-[#999999]'>
                Shows subscriber status and current rank compared to the day before {getDateYesterday()}
              </span>
            </p>
          </div>


          <ul className='list-none'>
            {artist.sns?.length > 0 && artist.sns?.map(item => (
              <SNSTodayItem key={item.name} item={item} />
            ))}
          </ul>
        </aside>
      </article>

      {relatedArtist[artist.artistId]?.length > 0 && (
        <article className='section recommand mt-[35px] lg:mt-[40px]'>
          <header className='relative'>
            <h2 className='text-[13px] font-semibold lg:text-[24px]'>
              Recommended Artist
            </h2>
          </header>

          <ul className='list-none pt-[20px] pb-0 lg:pt-[40px] lg:pb-[30px]'>
            {relatedArtist[artist.artistId]?.map(item => (
              <li key={item.artistPath} className='inline-block w-[25%]'>
                <div className="w-[80px] h-[80px] relative rounded-[50%] overflow-hidden lg:w-[175px] lg:h-[175px]">
                  <NavLink
                    to={`/artist/${item.artistPath}`}
                  >
                    <img src={item.profileImageUrl} alt={item.artistName} className='w-[80px] h-[80px] relative rounded-[50%] overflow-hidden lg:w-[175px] lg:h-[175px]' />
                    <div className="absolute opacity-40 bottom-0 w-[80px] h-[80px] rounded-[50%] overflow-hidden bg-black lg:w-[175px] lg:h-[175px]"></div>
                    <span className='absolute inline-block underline text-white top-[50%] left-[50%] text-center font-semibold translate-x-[-50%] translate-y-[-50%] text-[13px] whitespace-nowrap lg:text-[16px]'>
                      {item.artistName}
                      <img src={whiteLinkIcon} className='inline-block pl-[5px] w-[10px] lg:w-[11px]' />
                    </span>

                  </NavLink>
                </div>
              </li>
            ))}
          </ul>
        </article>
      )}


      {badge[artist.artistId]?.length > 0 && (
        <article className='section badge max-w-[1920px] pt-[120px] bg-black pl-[20px] w-full mt-[60px] pb-0 mb-[-30px] lg:mt-0 lg:pb-[150px]'>
          <header className='relative max-w-[1160px] text-white mt-[-50px] ml-[10px] pt-0 lg:pt-[110px] lg:mt-0 lg:mx-auto'>
            <h2 className='font-semibold text-white text-[38px] lg:text-[102px] lg:leading-[102px]'>
              BADGE
            </h2>
            <p className='text-white mt-[10px] pl-0 text-[13px] lg:text-[14px] lg:mt-[30px] lg:pl-[5px]'>Badge is updated when the artist reaches a certain milestone</p>
          </header>

          <div className="max-w-[1160px] relative mt-[45px] text-white lg:mt-[70px] mx-auto">
            <div className="mt-0">
              <ul className='list-none my-0 mx-[-16px] flex flex-wrap pb-[55px] px-0 lg:mt-[-20px] lg:mx-0 lg:pb-0'>
                {badge[artist.artistId]?.map(item => (
                  <li key={item.videoUrl} onClick={(e) => {
                    setTimeout(() => {
                      setSelectedBadge(item)
                    }, 500)
                  }} className='group inline-block text-center w-[33%] pb-[55px] px-0 lg:py-[50px] lg:w-[25%]'>
                    <div className="mr-[15px] lg:mr-0">
                      <img src={item.normalImgUrl} className={`relative mx-auto h-full text-center transition-transform duration-500 w-[75px] cursor-pointer active:[transform:rotateY(1turn)] lg:w-[160px]`} />

                      <span className={`mx-auto w-[75px] break-keep whitespace-nowrap relative top-[5px] text-[10px] lg:text-[17px] lg:top-[20px]`}>{item.name.length > 12 ? item.name.substring(0, 10) + ".." : item.name}
                      </span>
                      <span className='block relative top-[8px] text-[10px] text-[#999] font-light lg:top-[25px] lg:text-[14px]'>{item.acquireDate}</span>
                    </div>

                  </li>
                ))}
              </ul>
            </div>
          </div>

        </article>
      )}




      <YoutubeModal url={selectedBadge?.videoUrl || ""} closeModal={() => setSelectedBadge({})} />
    </section>
  )
}
