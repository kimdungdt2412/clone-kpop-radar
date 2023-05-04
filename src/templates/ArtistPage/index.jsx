import React from 'react'
import { selectArtist } from '../../features/Artist/ArtistSlice';
import { useSelector } from 'react-redux';
import { useGetArtistNameIndicesQuery, useGetArtistNamesQuery, useGetRecommendArtistsQuery } from '../../app/services/Artist';
import { Link } from 'react-router-dom';
import recommendIcon from '../../assets/images/kr-artist-ic-index-recommend.png'

export default function ArtistPage() {

  const artistData = useSelector(selectArtist);
  const nameIndices = useGetArtistNameIndicesQuery()
  const names = useGetArtistNamesQuery()
  const recommendedArt = useGetRecommendArtistsQuery({
    lang: "en"
  })

  return (
    <section className='artists m-0 pt-[72px] relative overflow-hidden'>
      <article className='artist mb-0 pt-[160px] my-0 mx-auto'>
        <div className='artist-wrap relative max-w-[1180px] pb-[73px] mt-[-137px] mx-0 mb-0'>

          <div className='scroll-mask overflow-hidden w-[70%] ml-[23%]'>

            <div className='relative w-[120%] overflow-x-hidden overflow-y-auto h-[610px]'>
              <div id="artist">
                <span className='font-noto text-[13px] font-bold block mb-[15px] mr-[100px]'>Recommended Artist</span>

                {!recommendedArt.isFetching && artistData.recommendArtists?.length > 0 && artistData.recommendArtists?.map(item => (
                  <span key={item.artistId} className='art-category'>
                    <Link to={`/artist/${item.artistPath}`} className='font-noto text-[38px] font-bold m-0 leading-[38px]'>
                      {item.artistName}
                    </Link>
                  </span>
                ))}

                <span className='font-noto text-[13px] font-bold block mb-[15px] mr-[100px] mt-[70px]'>Observed Artist {artistData.count > 0 ? `(${artistData.count})` : ""}</span>

                {!names.isFetching && artistData.artistNames?.length > 0 && artistData.artistNames?.map(item => (
                  <span key={item.name} className='art-category'>
                    <Link to={`/artist/${item.artistPath}`} className='font-noto text-[38px] font-bold m-0 leading-[38px]'>
                      {item.name}
                    </Link>
                  </span>
                ))}



              </div>

            </div>

          </div>


          <div className='nav-list absolute pl-[20px] top-0 right-[12px] inline-block text-center bg-white'>
                  <a href='' >
                    <span>
                      <img src={recommendIcon}/>
                    </span>
                  </a>
          </div>
        </div>
      </article>
    </section>
  )
}
