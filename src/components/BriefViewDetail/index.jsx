import React, { useEffect, useState } from 'react'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import { removeBriefID, selectBrief } from '../../features/BriefList/BriefSlice';
import { getDateByString, handleShareLink, splitArtistData } from '../../utils/function';
import { NavLink } from 'react-router-dom';
import { snsList } from '../../utils/config';
import shareIcon from "../../assets/images/kr-artist-ic-share.svg"
import BriefItem from '../BriefItem/BriefItem';

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
                    <div className='date  inline-block text-white text-center absolute left-[20px] bottom-[20px] lg:left-[70px] lg:bottom-[36px]'>
                        <span className='block text-[13px] mb-[10px] font-light lg:text-[19.5px]'>
                            {year}. {month}
                        </span>
                        <strong className='block text-[46px] font-medium mb-0 leading-[46px] lg:text-[69px] lg:leading-[69px]'>
                            {day}
                        </strong>
                    </div>
                </div>

                <article className='brief-view-container pt-[30px] px-[20px] pb-0 lg:pt-[86px] lg:pr-[130px] lg:pb-[60px] lg:pl-[70px]'>
                    <header className='pb-0 lg:pb-[120px]'>
                        <h2 className='font-noto font-bold break-keep text-[28px] leading-[38px] lg:text-[40px] lg:leading-[58px]'>{brief.title}</h2>
                    </header>

                    <div className='content lg:flex lg:justify-between'>
                        <aside className='w-full pt-[30px] lg:w-[220px] '>
                            <div className='artist relative'>
                                {!!artistID && (
                                    <NavLink
                                        className="no-underline block mb-[15px]"
                                        to={`/artist/${artistBr}`}
                                    >
                                        <figure className='profile flex flex-nowrap items-center'>
                                            <img src={imgUrl} className='overflow-hidden rounded-[50%] w-[40px] h-[40px] lg:w-[64px] lg:h-[64px]' />

                                            <figcaption className='w-[156px] box-border block pl-[14px] lg:pl-[24px]'>
                                                {/* before:!content-none */}
                                                <span className='block font-noto font-semibold text-[14px] m-o after:content-[""] after:inline-block after:w-[20px] after:h-[16px] after:bg-ico_artist_arrow after:bg-no-repeat after:bg-[length:22px_auto] after:align-middle after:ml-[8px] lg:text-[18px] lg:mb-[6px] lg:after:!content-none'>
                                                    {artistName}
                                                </span>

                                                <span className='hidden leading-[22px] text-[15px] lg:block'>
                                                    artist&nbsp;
                                                    <i className='inline-block align-top ml-[4px] w-[20px] h-[20px] bg-ico_artist_arrow bg-no-repeat bg-[length:22px_auto]'></i>
                                                </span>
                                            </figcaption>
                                        </figure>


                                    </NavLink>
                                )}

                                <div className='count-info border-t-[1px] border-t-black mt-[10px] pt-[10px] pb-[5px] font-light lg:mt-[20px] lg:pt-[24px] lg:pb-0'>
                                    <dl className='inline-block mb-0 lg:flex lg:flex-wrap lg:justify-between lg:mb-[10px]'>
                                        <dt className='inline-block text-[12px] leading-[20px] font-medium lg:text-[16px] lg:leading-[24px]'>
                                            views
                                        </dt>
                                        <dd className='float-left mr-[3px] text-[12px] leading-[20px] font-medium lg:text-[16px] lg:leading-[24px]'>
                                            {brief.viewCount}
                                        </dd>
                                    </dl>

                                    <dl className='inline-block mb-0 ml-[30px] lg:ml-0 lg:flex lg:flex-wrap lg:justify-between lg:mb-[10px]'>
                                        <dt className='inline-block text-[12px] leading-[20px] font-medium lg:text-[16px] lg:leading-[24px]'>
                                            share
                                        </dt>
                                        <dd className='float-left mr-[3px] text-[12px] leading-[20px] font-medium lg:text-[16px] lg:leading-[24px]'>
                                            {brief.shareCount}
                                        </dd>
                                    </dl>
                                </div>


                                <div className='shares block mt-0 absolute right-0 lg:mt-[100px] lg:flex lg:justify-between lg:flex-wrap'>
                                    <p className='hidden w-full mb-[15px] text-[20px] font-bold leading-[36px] lg:block'>share this</p>

                                    {snsList.map(item => {
                                        return (
                                            <a key={item.id} href="#" onClick={() => handleShareLink(item.id, brief)} className={`no-underline block indent-[-999px] overflow-hidden mb-[15px] float-left w-[30px] h-[30px] opacity-0 lg:opacity-100`}>
                                                <img src={item.img} className='w-[22px] m-auto'/>
                                            </a>
                                        )
                                    })}
                                </div>

                                <img src={shareIcon} className='block cursor-pointer absolute right-0 top-[14px] border-0 w-[16px] h-[15px] overflow-hidden bg-transparent lg:hidden' />
                            </div>
                        </aside>

                        <div className='w-full mt-[55px] ml-0 lg:w-[600px] lg:mt-0 lg:ml-[60px]'>
                            <div
                                dangerouslySetInnerHTML={{ __html: brief.content }}
                            />
                        </div>
                    </div>
                </article>

                {/* more content */}
                <div className='more-content pt-[80px] px-[20px] pb-[30px] lg:pt-[90px] lg:pr-[130px] lg:pb-[60px] lg:pl-[70px]'>
                    <ul className='block mb-0 lg:flex lg:flex-wrap lg:justify-between'>
                        {briefContent.filter(item => item.briefId !== briefId)?.map(item => {
                            let { artistName } = splitArtistData(item.artists ?? "")
                            return (
                                <BriefItem key={item.briefId} isPreview={true} brief={item} artName={artistName}/>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}



