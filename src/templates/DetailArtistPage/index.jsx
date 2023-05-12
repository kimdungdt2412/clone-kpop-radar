import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { artistApi, useGetArtistInfoQuery } from '../../app/services/Artist'
import { useSelector } from 'react-redux'
import { selectArtist } from '../../features/Artist/ArtistSlice'
import shareIcon from "../../assets/images/kr-artist-ic-share.svg"
import { Player } from '@lottiefiles/react-lottie-player'
import { ShareArtistModal } from '../../components/ShareArtistModal'

export default function DetailArtist() {
  const params = useParams()
  const navigate = useNavigate()
  const { artistInfo } = useSelector(selectArtist)
  const artist = artistInfo?.[params.artistPath] || {}
  const heartRef = useRef(null)
  const [likeCount, setLikeCount] = useState(0)
  const [open, setOpen] = useState(false)

  const { data , isFetching, error, isSuccess } = useGetArtistInfoQuery({
    artistPath: params.artistPath
  }, {
    skip: !!artist?.artistId
  })

  const [trigger] = artistApi.useLazyIncArtistLikeCountQuery()

  // useEffect(() => {
  //   if (!!artist.artistId) {
  //     trigger({
  //       artistPath: artist.artistPath,
  //       artistId: artist.artistId,
  //       likeCount: 0
  //     })
  //   }
  // }, [artist.artistId])

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

  if (!params.artistPath || params.artistPath === "") {
    navigate('/artist-list')
    return (<></>)
  }

  return (
    <section className="artist-content relative overflow-hidden m-0 pt-[72px]">

      <article className="artist my-0 mx-auto mb-[100px] pt-[160px]">
        <img src={shareIcon} onClick={() => setOpen(true)} alt="shareIcon" className="absolute w-[20px] left-[430px] top-[127px]" />

        <span className='absolute top-[104px] left-[33px]' onClick={() => {
          heartRef.current?.play()
          setLikeCount(likeCount + 1)
        }}>
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


          <ShareArtistModal artist={artist} open={open} handleClose={() => setOpen(false)}/>
        </span>

        <div className="artist-inner mt-[-70px] max-w-[1160px] mx-auto my-0">
          <div className="artist-img relative py-0 px-[10%] my-0 mx-auto">
                <p className="absolute bottom-[10vw] text-[89px] leading-[0.9] font-bold text-left text-black top-[355px] left-[30px] whitespace-nowrap">
                  {artist.names?.[0]?.NAME || ""}
                </p>

                <p className="absolute translate-y-[50%] text-[30px] leading-[0.9] font-bold text-left text-black top-[295px] left-[30px]">
                  {artist.names?.[1]?.NAME || ""}
                </p>

                <div className="bg-gradient-to-b from-transparent to-white/[.65]">
                  <img src={artist.imgUrl} alt="imgUrl" className='inline-block relative w-full z-[-1]'/>
                </div>
          </div>
        </div>



      </article>

    </section>
  )
}
