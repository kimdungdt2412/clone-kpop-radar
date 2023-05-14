import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { artistApi, useGetArtistBadgeQuery, useGetArtistInfoQuery, useGetRelatedArtistsQuery, useIncArtistLikeCountQuery } from '../../app/services/Artist'
import { useSelector } from 'react-redux'
import { selectArtist } from '../../features/Artist/ArtistSlice'
import detailIcon from "../../assets/images/kr-chartdetail-btn-info2.svg"
import linkIcon from "../../assets/images/kr-artist-today-link.svg"
import shareIcon from "../../assets/images/kr-artist-ic-share.svg"
import { Player } from '@lottiefiles/react-lottie-player'
import { ShareArtistModal } from '../../components/ShareArtistModal'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { handlePositionByArtistImg } from '../../utils/function'
import Loading from '../../components/Loading/Loading';

export default function DetailArtist() {
  const params = useParams()
  const navigate = useNavigate()
  const { artistInfo, badge, summaryBadge } = useSelector(selectArtist)
  const artist = artistInfo?.[params.artistPath] || {}
  const heartRef = useRef(null)
  const [likeCount, setLikeCount] = useState(0)
  const [open, setOpen] = useState(false)
  const imgRef = useRef(null)
  const [selectedBadge, setSelectedBadge] = useState()

  const { data, isSuccess } = useGetArtistInfoQuery(params.artistPath ? {
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

  const [trigger] = artistApi.useLazyIncArtistLikeCountQuery()

  const getDateYesterday = () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    console.log(date)
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
    if (imgRef) {
      handlePositionByArtistImg(imgRef)
    }
  }, [imgRef])

  if (!params.artistPath || params.artistPath === "") {
    navigate('/artist')
    return (<></>)
  }

  return (
    <section className="artist-content relative overflow-hidden m-0 pt-[72px]">

      <article className="section artist mb-[100px] pt-[160px]">
        <img id="shareIcon" src={shareIcon} onClick={() => setOpen(true)} alt="shareIcon" className="absolute w-[20px]"
        />

        <span
          id="heartIcon"
          className={`absolute left-[33px]`}
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


          <ShareArtistModal artist={artist} open={open} handleClose={() => setOpen(false)} />
        </span>



        <div className="artist-inner mt-[-70px] max-w-[1160px] mx-auto my-0">
          <div className="artist-img relative py-0 px-[10.6667%] my-0 mx-auto">
            <p id="enName" className="absolute bottom-[10.66667vw] text-[89px] leading-[0.9] font-bold text-left text-black left-[30px] whitespace-nowrap">
              {artist.names?.[0]?.NAME || ""}
            </p>

            <p id="krName" className="absolute translate-y-[50%] text-[30px] leading-[0.9] font-bold text-left text-black left-[30px]">
              {artist.names?.[1]?.NAME || ""}
            </p>

            <div className="bg-gradient-to-b from-transparent to-white/[.65]">
              <img ref={imgRef} id="artistImg" src={artist.imgUrl} alt="imgUrl" className='inline-block relative w-full z-[-1]' />
            </div>
          </div>
        </div>



      </article>


      {summaryBadge[artist.artistId]?.length > 0 && (
        <article className='section badge'>
          <header className="relative">
            <h2 className="font-[700] text-[15px] cursor-pointer">
              BADGE
              <img src={linkIcon} alt="linkIcon" className='relative inline-block cursor-pointer left-[8px] w-[5px] top-[-1px]' />
            </h2>
          </header>

          <ul className="pt-[30px] list-none">
            {
              summaryBadge[artist.artistId]?.map(badge => (
                <li key={badge.key}
                  // onClick={() => {
                  //   setSelectedBadge(badge)
                  // }} 
                  className="w-[33%] inline-block mb-0">
                  <div className="min-w-[110px]">
                    <img src={badge.badgeImg} className='inline-block cursor-pointer w-[75px] ml-[15px] mb-[20px]' />
                    <span className='relative text-white right-[14.5px] bottom-[48.5px] text-[9px] font-semibold'>{badge.count ?? 0}</span>
                  </div>
                </li>
              ))
            }
          </ul>
        </article>
      )}

      <article className='section today pt-[40px]'>
        <header className="relative">
          <h2 className="font-[700] text-[38px] cursor-pointer">
            TODAY
          </h2>
        </header>

        <aside className='block pt-0 pb-[40px]'>
          <div className="pt-[10px] pb-[40px]">
            <p className="font-light font-noto float-left w-full text-[12px]">
              <i className='bg-icon_detail inline-block ml-[2px] align-middle bg-no-repeat bg-[length:100%_auto] w-[12px] h-[14px] mr-[4px]'></i>
              <span className='text-[#999999]'>
                Shows subscriber status and current rank compared to the day before {getDateYesterday()}
              </span>
            </p>
          </div>


          <ul className='list-none'>

          </ul>
        </aside>
      </article>



    </section>
  )
}
