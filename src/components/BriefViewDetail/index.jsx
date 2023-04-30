import React, { useEffect, useState } from 'react'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import { removeBriefID, selectBrief } from '../../features/BriefList/BriefSlice';
import { getDateByString, splitArtistData } from '../../utils/function';
import { NavLink } from 'react-router-dom';
import { snsList } from '../../utils/config';
import shareIcon from "../../assets/images/kr-artist-ic-share.svg"

export default function BriefView({ briefId }) {

    const dispatch = useDispatch()
    const { briefContent } = useSelector(selectBrief)
    const [brief, setBrief] = useState({})

    const { year, month, day } = getDateByString(brief.date?.toString() ?? "")
    const { artistID, artistName, artistBr, imgUrl } = splitArtistData(brief.artists ?? "")

    // useEffect(() => {
    //     // This will run when the page first loads and whenever the title changes
    //     document.title = title;
    //   }, [title]);

    useEffect(() => {
        console.log(briefContent, briefId)
        if (briefContent?.length > 0) {
            let index = briefContent?.findIndex(item => item.briefId === briefId)
            if (index !== -1) {
                setBrief(briefContent[index])
            }
        } else {
            setBrief({})
        }
    }, [briefContent])

    return (
        <section className={`brief-view ${!!briefId ? "open" : ""} flex flex-nowrap justify-end fixed top-0 bottom-0 right-0 z-[999] w-[101%] opacity-0 invisible`}>
            <button type='button' className='close-btn z-[10] fixed rounded-[50%] w-[40px] h-[40px] p-0 border-0 bg-ico_brief_moreblack bg-no-repeat rotate-45 top-[15px] right-[15px]' onClick={() => {
                dispatch(removeBriefID(briefId))
            }}>
            </button>

            <div id="detail" className='brief-view_inner max-w-[1200px] h-full overflow-hidden overflow-y-auto bg-[white] translate-x-[30px]'>
                <div className='key-visual relative'>
                    <figure>
                        <img className='block max-w-[1200px] max-h-[720px] w-full' src={brief.thumbnailUrl} alt="" />

                        <div className='w-full h-full block bg-black/[.4] absolute top-0 left-0'>
                        </div>
                    </figure>
                    <div className='date  inline-block text-white text-center absolute left-[20px] bottom-[20px]'>
                        <span className='block text-[13px] mb-[10px] font-light'>
                            {year}. {month}
                        </span>
                        <strong className='block text-[46px] font-medium mb-0 leading-[46px]'>
                            {day}
                        </strong>
                    </div>
                </div>

                <article className='container pt-[30px] px-[20px] pb-0'>
                    <header className='pb-0'>
                        <h2 className='font-noto font-bold break-keep text-[28px] leading-[38px]'>{brief.title}</h2>
                    </header>

                    <div className='content'>
                        <aside className='w-full pt-[30px]'>
                            <div className='artist relative'>
                                {!!artistID && (
                                    <NavLink
                                        className="no-underline block mb-[15px]"
                                        to={`/artist/${artistBr}`}
                                    >
                                        <figure className='profile flex flex-nowrap items-center'>
                                            <img src={imgUrl} className='overflow-hidden rounded-[50%] w-[40px] h-[40px]' />

                                            <figcaption className='w-[156px] box-border block pl-[14px]'>
                                                {/* before:!content-none */}
                                                <span className='block font-noto font-semibold text-[14px] m-o after:content-[""] after:inline-block after:w-[20px] after:h-[16px] after:bg-ico_artist_arrow after:bg-no-repeat after:bg-[length:22px_auto] after:align-middle after:ml-[8px]'>
                                                    {artistName}
                                                </span>

                                                <em className='hidden leading-[22px] text-[15px] font-bold'>
                                                    artist&nbsp;
                                                    <i className='inline-block align-top ml-[4px] w-[20px] h-[20px] bg-ico_artist_arrow bg-no-repeat bg-[length:22px_auto]'></i>
                                                </em>
                                            </figcaption>
                                        </figure>


                                    </NavLink>
                                )}

                                <div className='count-info border-t-[1px] border-t-black mt-[10px] pt-[10px] pb-[5px] font-light'>
                                    <dl className='inline-block mb-0'>
                                        <dt className='inline-block text-[12px] leading-[20px] font-medium'>
                                            views
                                        </dt>
                                        <dd className='float-left mr-[3px] text-[12px] leading-[20px] font-medium'>
                                            {brief.viewCount}
                                        </dd>
                                    </dl>

                                    <dl className='inline-block mb-0 ml-[30px]'>
                                        <dt className='inline-block text-[12px] leading-[20px] font-medium'>
                                            share
                                        </dt>
                                        <dd className='float-left mr-[3px] text-[12px] leading-[20px] font-medium'>
                                            {brief.shareCount}
                                        </dd>
                                    </dl>
                                </div>


                                <div className='shares block mt-0 absolute right-0'>
                                    <p className='hidden w-full mb-[15px] text-[20px] font-bold leading-[36px]'>share this</p>

                                    {snsList.map(item => {
                                        return (
                                            <a key={item.id} href="#" className={`no-underline block indent-[-999px] overflow-hidden mb-[15px] float-left w-[30px] h-[30px] opacity-0`}>
                                                <img src={item.img} />
                                            </a>
                                        )
                                    })}
                                </div>

                                <img src={shareIcon} className='block cursor-pointer absolute right-0 top-[14px] border-0 w-[16px] h-[15px] overflow-hidden bg-transparent' />
                            </div>
                        </aside>

                        <div className='w-full mt-[55px] ml-0'>
                            <div
                                dangerouslySetInnerHTML={{ __html: brief.content }}
                            />
                        </div>
                    </div>
                </article>
                
                {/* more content */}
                <div></div>
            </div>
        </section>
    )
}



