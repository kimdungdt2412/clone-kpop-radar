import React, { useEffect, useRef, useState } from 'react'
import arrowIcon from '../../assets/images/kr-about-faq-arrow.png';
import spaceOddityThumbnail from '../../assets/images/thumbnail_space-oddity.jpg'
import bgContact from '../../assets/images/bg_contact_img.jpg'
import { NavLink } from 'react-router-dom';
import { ParallaxBanner } from 'react-scroll-parallax';
import kvBanner from "../../assets/images/img_kv_banner.jpg"
import mkvBanner from "../../assets/images/img_kv_banner_m.jpg"
import './style.css'

export default function About() {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [width, setWidth] = useState(0)

    const blipList = [
        {
            no: 1,
            title: "Observe",
            desc: `Blip detects and records growths and paths of K-Pop
            artists’ fandom data. Through ‘observation’ and
            analyzation, we predict and publish special cases in
            ‘brief’.`
        },
        {
            no: 2,
            title: "Analyze",
            desc: `Through practical case analysis, we explore internal
            factors that are difficult to observe. We believe we can
            learn from artists in various ways. And thus we combine
            life concerns with artists’ insights and stories.`
        },
        {
            no: 3,
            title: "Easy and fun",
            desc: `We think about ways to make fan activities more smart and
            fun by combining technology. Our aim is to eliminate
            barriers for people who want to become fans and allow more
            people to access their artists.`
        }
    ]

    useEffect(() => {
        if ((windowSize?.current?.[0] >= 1024 && width < 1024) || (windowSize?.current?.[0] < 1024 && width >= 1024)) {
            setWidth(windowSize?.current?.[0] || 0)
        }
    }, [windowSize.current[1]])
    return (
        <section className='about block overflow-hidden m-0 mt-[65px] lg:m-auto lg:mt-[135px]'>
            <article className='about-wrap pt-0 bg-black overflow-hidden lg:pt-[135px]'>
                <div className='about-content relative max-w-[1440px] my-0 mx-auto'>
                    <div className='about-kv relative pt-[177px] pl-[15px] pr-[15px] pb-0 bg-about_bg_kv_m bg-no-repeat bg-100 lg:pt-[250px] lg:pl-[40px] lg:pr-[40px] lg:bg-[position:-0px_-135px] lg:bg-about_bg_kv'>
                        <div className='relative text-white mb-[52px] lg:mb-[27px] '>
                            <div className='block absolute top-0 left-0 w-[24px] h-[24px] overflow-hidden text-transparent bg-icon_footer_logo bg-[center_left_50%] bg-100 lg:h-[30px] lg:w-[30px]'>kpop radar</div>
                            <strong className='block font-noto font-bold max-w-[330px] pt-[45px] text-[18px] leading-[34px] lg:pt-[78px] lg:text-[46px] lg:leading-[70px] lg:max-w-none'>
                                August 2019,
                                <br />
                                Music company Space Oddity
                                <br />
                                <a className='text-white text-[12px] leading-[1px] lg:text-[24px]' onClick={() => window.open('https://www.spaceoddity.me/')}>
                                    spaceoddity.me
                                </a>
                                <br />
                                founded Fandom Lab ‘blip’
                                <br />
                                and released its first service
                                <br />
                                K-Pop Radar, a Fandom Data Observatory.
                            </strong>
                            <span className='absolute right-0 block z-[1] text-[10px] bottom-[-38px] tracking-widest lg:bottom-0 lg:text-[12px]'>
                                Fandom Data Observatory
                            </span>
                        </div>

                        <div className='relative'>
                            <h2 className='hidden absolute z-[2] top-[50%] left-[8.08%] translate-y-[-50%] text-[42px] font-bold text-white lg:block'>K-Pop Radar</h2>
                            <ParallaxBanner
                                layers={[{
                                    children: <img src={width >= 1024 ? kvBanner : mkvBanner} style={{
                                        transform: `translateY(${width >= 1024 ? '90px' : '120px'})`,
                                        width: "100%"
                                    }} />,
                                    speed: -10,
                                    translateY: ["-100px", "100px"]
                                }]}
                                className='parallax-banner block w-full bg-100 bg-no-repeat pt-[69.5%] [background-position-y:-1px] lg:pt-[45.6%]'
                            />

                        </div>
                    </div>

                    <div className='about-kpop-radar relative text-white py-0 px-[40px] mt-[117px] pl-[31.6%] lg:mt-[287px] lg:pl-[50%]'>
                        <strong className="absolute block font-bold text-white rotate-90 top-[154px] left-[-200px] text-[128px] leading-[128px] lg:top-[440px] lg:left-[-530px] lg:text-[400px] lg:leading-[400px] after:content-[''] after:relative after:inline-block after:bg-[#ff334d] after:rounded-[100%] after:top-[5px] after:left-[47px] after:w-[79px] after:h-[79px] lg:after:left-[109px] lg:after:w-[236px] lg:after:h-[236px]">
                            Radar
                        </strong>

                        <div className='relative mb-[41px]'>
                            <h3 className='relative inline-block font-bold z-[1] align-top mb-[19px] text-[34px] leading-[34px] lg:text-[58px] lg:leading-[58px] lg:mb-[33px]'>K-Pop Radar</h3>
                            <strong className='block font-noto font-bold text-[#ff334d] leading-[14px] text-[14px] lg:text-[18px] lg:leading-[18px]'>Fandom Data Observatory</strong>
                        </div>

                        <p className='relative font-noto font-bold z-[1] break-keep max-w-[550px] text-[18px] leading-[34px] lg:text-[36px] lg:leading-[60px]'>
                            K-Pop Radar provides objective data by detecting an artist’s
                            fandom size, growth, and achieved milestones across social
                            platforms. It is the only dashboard that shows daily fandom data
                            at a glance.
                            <br />
                            <NavLink
                                className="inline-block underline"
                                rel="noopener noreferrer"
                                to="/faq"
                            >
                                FAQ
                                <img className='inline-block align-baseline w-[22px] relative top-[2px] left-[10px]' src={arrowIcon} />
                            </NavLink>
                        </p>
                    </div>

                    <div className='space-oddity relative text-white mt-[149px] py-0 px-[40px] lg:mt-[570px] lg:pl-[26.38%]'>
                        <div className='relative mb-[40px] lg:mb-[102px]'>
                            <h3 className='relative inline-block font-bold z-[1] align-top mb-[19px] text-[34px] leading-[34px] lg:mb-[33px] lg:text-[58px] lg:leading-[68px]'>Space Oddity</h3>
                            <strong className='block font-noto font-bold text-[#ff334d] leading-[14px] text-[14px] lg:text-[18px] lg:leading-[18px]'>Space Oddity</strong>
                        </div>
                        <img className='relative lg:absolute top-0 right-auto w-full max-w-[590px] mt-0 mx-auto mb-[30px] lg:w-[305px] lg:top-[83px] lg:right-[129px]' src={spaceOddityThumbnail} />

                        <p className='relative font-noto font-bold z-[1] break-keep max-w-[790px] text-[18px] leading-[34px] lg:text-[36px] lg:leading-[60px]'>
                            We are a strange music company founded in April 2017. Based on
                            our collaborative network with talented creators in the music
                            industry and professional expertise on music data analysis, we
                            create various music contents that are inspiring, shareable, and
                            meaningful. We believe in a better music ecosystem through our
                            research on culture and data that meet the needs of a rapidly
                            changing industry.
                            <br />
                            <a className='text-[14px] leading-[1px]' onClick={() => window.open('https://www.spaceoddity.me')}>
                                spaceoddity.me
                            </a>
                        </p>
                    </div>

                    <div className='blip relative text-white mt-[152px] mx-[-40px] mr-[-40px] ml-0 mb-0 py-0 px-[40px] lg:mt-[204px] lg:pl-[26.38%] lg:mr-0'>
                        <div className='relative mb-[40px] lg:mb-[102px]'>
                            <h3 className='relative inline-block font-bold z-[1] align-top mb-[19px] text-[34px] leading-[34px] lg:mb-[33px] lg:text-[58px] lg:leading-[68px]'>blip</h3>
                            <strong className='block font-noto font-bold text-[#ff334d] leading-[14px] text-[14px] lg:text-[18px] lg:leading-[18px]'>Fandom Lab</strong>
                        </div>

                        <p className='relative font-noto font-bold z-[1] break-keep max-w-[640px] text-[18px] leading-[34px] pr-[40px] lg:text-[36px] lg:leading-[60px]'>

                            Artists, shining like stars with their music and dreams,
                            exchange inspirations and motivations with their fans. In the
                            hope that this virtuous cycle will gradually expand like the
                            universe, Space Oddity established ‘Fandom Lab blip’. ‘Blip’
                            means the blinking point or object detected by the radar.

                        </p>

                        <div className='blip-list overflow-hidden h-[360px] lg:h-auto'>
                            <ul className='mt-[42px] mx-0 mb-0 whitespace-nowrap overflow-x-scroll overflow-y-hidden w-full text-0 lg:mt-[135px] lg:mx-[-4%] lg:overflow-hidden'>
                                {blipList.map(item => (
                                    <li key={item.no} className='inline-block text-white align-top border-t-[1px] border-t-white w-[255px] pt-[22px] whitespace-normal mt-0 mr-0 mb-0 ml-[40px] first:m-0 last:mx-[40px] last:my-0 lg:w-[25%] lg:my-0 lg:mx-[4%] lg:pt-[36px] lg:first:mx-[4%] lg:last:mx-[4%]'>
                                        <dl className='mb-[18px] lg:mb-[31px]'>
                                            <dt className='inline-block pr-[10px] text-[140px] font-bold align-top relative left-[-12px] leading-[140px]lg:text-[128px] lg:leading-[128px]'>{item.no}</dt>
                                            <dd className='relative top-[13px] inline-block font-bold align-top text-[28px] leading-[28px] lg:text-[25px] lg:leading-[25px]'>{item.title}</dd>
                                        </dl>
                                        <p className='font-noto text-[14px] font-normal break-keep leading-[26px] lg:leading-[30px]'>
                                            {item.desc}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className='contact relative pt-[135px] px-[40px] pb-[61px] overflow-hidden lg:pt-[265px] lg:px-0 lg:pb-[108px]'>
                        <div className='relative pl-0 text-white z-[1] lg:pl-[26.38%]'>
                            <h3 className='relative font-bold mb-[-10px] text-[34px] leading-[34px] lg:mb-[43px] lg:text-[58px] lg:leading-[58px]'>contact</h3>
                            <a className='block mail-txt font-bold text-white max-w-[340px] text-[12px] leading-[60px] lg:text-[120px] lg:leading-[120px] lg:max-w-[700px]' href='mailto:kpopradar@blip.co'>
                                kpopradar @ blip.kr
                            </a>
                        </div>

                        {width >= 1024 ? (
                            <div className='absolute bottom-0 left-[50%] min-w-[750px] translate-x-[-50%] w-full'>
                                <ParallaxBanner
                                    layers={[{
                                        children: <img src={bgContact} style={{
                                            transform: `translateY(120px)`,
                                            width: "100%"
                                        }} />,
                                        speed: -10,
                                    }]}
                                    className='parallax-banner block w-full bg-100 bg-no-repeat pt-[69.5%] [background-position-y:-1px] transition-all lg:pt-[45.6%]'
                                />
                            </div>
                        ) : (
                            <div className='absolute bottom-0 left-[50%] min-w-[750px] translate-x-[-50%] w-full'>
                                <img className='translate-y-[74px] relative w-full' src={bgContact} />
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </section>
    )
}
