import React, { useRef } from 'react'
import { selectArtist } from '../../features/Artist/ArtistSlice';
import { useSelector } from 'react-redux';
import { useGetArtistNameIndicesQuery, useGetArtistNamesQuery } from '../../app/services/Artist';
import { Link } from 'react-router-dom';
import recommendIcon from '../../assets/images/kr-artist-ic-index-recommend.png'
import { useAutoFocus } from '../../utils/hooks';
import Loading from '../../components/Loading/Loading';

export default function ArtistPage() {

  const itemsRef = useRef([]);
  const mainContent = useAutoFocus()
  const artistData = useSelector(selectArtist);
  const nameIndices = useGetArtistNameIndicesQuery()
  const names = useGetArtistNamesQuery()
  const recommendArtists = ["EXO", "BLACKPINK", "TWICE", "LE SSERAFIM", "SEVENTEEN"]

  const handleScroll = async (type) => {
    if (type === "recommend") {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, itemsRef.current[Number(type)]?.offsetTop)
    }
  }

  return (
    <section className='artists block m-0 mt-[72px] relative overflow-hidden lg:mt-0 min-h-screen'>
      {(!names.isFetching) ? (
        <Loading />) : (
        <React.Fragment>
          <article className='artist mb-0 pt-[160px] my-0 mx-auto lg:pt-[300px]'>
            <div className='artist-wrap relative max-w-[1180px] pb-[73px] mt-[-137px] mx-0 mb-0 overflow-hidden lg:mx-[70px] lg:pb-[118px]'>

              {/* main content */}
              <div className='scroll-mask overflow-hidden w-[70%] ml-[23%] lg:w-[50%] lg:ml-[50%]'>

                <div ref={mainContent} className='relative w-[120%]'>
                  <div id="artist">

                    <span className='font-noto text-[13px] font-bold block mb-[15px] mr-[100px] lg:text-[16px] lg:mb-[23px] lg:mr-0'>Recommended Artist</span>

                    {recommendArtists?.map(item => (
                      <span key={item} className='art-category'>
                        <Link to={`/artist/${item.replace(" ","")}`} className='font-noto text-[38px] font-bold m-0 leading-[38px] lg:text-[68px] lg:leading-[68px]'>
                          {item}
                        </Link>
                      </span>
                    )
                    )}

                    <span className='font-noto text-[13px] font-bold block mb-[15px] mr-[100px] mt-[70px] lg:mt-[136px]'>Observed Artist {artistData.count > 0 ? `(${artistData.count})` : ""}</span>

                    {artistData.artistNames?.length > 0 && artistData.artistNames?.map((item, index) => {

                      let _id = index === 0 ? `indexId${item.indexId}` : ""
                      if (index !== 0 && item.indexId !== artistData.artistNames?.[index - 1]?.indexId) {
                        _id = `indexId${item.indexId}`

                      }
                      if (_id !== "") {
                        return (
                          <span ref={el => itemsRef.current[item.indexId] = el} key={item.name} id={_id} className={`art-category`}>
                            <Link to={`/artist/${item.artistPath}`} className='font-noto text-[38px] font-bold m-0 leading-[38px] lg:text-[68px] lg:leading-[68px]'>
                              {item.name}
                            </Link>
                          </span>
                        )
                      } else {
                        return (
                          <span key={item.name} className={`art-category`}>
                            <Link to={`/artist/${item.artistPath}`} className='font-noto text-[38px] font-bold m-0 leading-[38px] lg:text-[68px] lg:leading-[68px]'>
                              {item.name}
                            </Link>
                          </span>
                        )
                      }

                    })}

                  </div>

                </div>

              </div>

              {/* search */}
              {/* <div className="search-wrap fixed left-0 bottom-[20px] w-full max-w-[1180px] mx-auto my-0 z-[10] h-0">
            <button className='absolute bottom-0 left-[20px] block w-[20px] h-[20px] bg-icon_search bg-full bg-no-repeat indent-[-9999px] bg-transparent cursor-pointer z-[1]'>search</button>
            <div className="relative top-[20px] w-full h-[180px] pt-[26px] px-[85px] bg-black translate-y-[180px] transition-all none">
              <strong className='block text-[14px] font-bold text-white'>search</strong>
              <input className='absolute bottom-[10px] w-[260px] h-[40px] p-0 bg-transparent text-[36px] font-bold text-white leading-[43px]' />
              <button></button>
            </div>
          </div> */}

              {/* side bar */}

            </div>

          </article>

          <div className='nav-list fixed pl-[20px] top-[100px] right-[12px] inline-block text-center bg-white lg:right-[20px] lg:top-[150px]'>
            <a
              onClick={() => {
                handleScroll("recommend")
              }}

              className='group block relative m-0 cursor-pointer before:absolute before:right-0 before:h-[1px] before:bg-black before:content-[""] before:transition-all before:w-0 before:bottom-[-3px] hover:before:w-[26px] lg:hover:before:w-[52px] lg:before:bottom-[-6px]'>
              <span className='relative text-black transition-all font-noto font-bold text-[10px] left-0 group-hover:left-[-19px] lg:text-[12px] lg:group-hover:left-[-38px]'>
                <img src={recommendIcon} className='w-[10px]' />
              </span>
            </a>

            {
              !nameIndices.isFetching && artistData.artistNameIndices?.length > 0 && artistData.artistNameIndices?.map(item => {

                return (
                  <a
                    key={item.word}
                    onClick={(e) => {
                      e.preventDefault()
                      handleScroll(item.indexId)
                    }}
                    className='group block relative cursor-pointer mx-0 my-auto h-[13px] before:absolute before:right-0 before:h-[1px] before:bg-black before:content-[""] before:transition-all before:duration-300 before:w-0 before:bottom-[-3px] hover:before:w-[26px] lg:hover:before:w-[52px] lg:before:bottom-[-6px]'>
                    <span className='relative text-black transition-all font-noto font-bold text-[10px] left-0 group-hover:left-[-19px] lg:group-hover:left-[-38px]'>
                      {item.word}
                    </span>
                  </a>
                )
              })
            }
          </div>
        </React.Fragment>
      )
      }


    </section>
  )
}
