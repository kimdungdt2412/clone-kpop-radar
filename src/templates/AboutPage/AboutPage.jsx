import React from 'react'

export default function About() {
    return (
        <section className='about block overflow-hidden m-0 pt-[72px]'>
            <article className='about-wrap pt-0 bg-black overflow-hidden'>
                <div className='about-content relative max-w-[1440px] my-0 mx-auto'>
                    <div className='about-kv relative pt-[177px] pl-[15px] pr-[15px] pb-0 bg-about_bg_kv_m bg-no-repeat bg-100'>
                        <div className='relative text-white mb-[52px]'>
                            <div className='block absolute top-0 left-0 w-[24px] h-[24px] overflow-hidden text-transparent bg-icon_footer_logo bg-[center_left_50%] bg-100'>kpop radar</div>
                            <strong className='block font-noto font-bold max-w-[330px] pt-[45px] text-[18px] leading-[34px]'>
                                August 2019,
                                <br />
                                Music company Space Oddity
                                <br/>
                                <a className='text-white text-[12px] leading-[1px]' onClick={() => window.open('https://www.spaceoddity.me/')}>
                                    spaceoddity.me
                                </a>
                                <br />
                                founded Fandom Lab ‘blip’
                                <br/>
                                and released its first service
                                <br/>
                                K-Pop Radar, a Fandom Data Observatory.
                            </strong>
                            <span className='absolute right-0 block z-[1] text-[10px] bottom-[-38px] tracking-widest'>
                            Fandom Data Observatory
                            </span>
                        </div>

                        <div className='relative'>
                            <h2 className='hidden absolute top-[50%] left-[8.08%] translate-y-[-50%] text-[42px] text-bold text-white'>K-Pop Radar</h2>
                            <span></span>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    )
}
