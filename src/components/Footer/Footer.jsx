import React from 'react'
import { NavLink } from 'react-router-dom'
import arrowIcon from '../../assets/images/kr-about-faq-arrow.png';
import blipIcon from '../../assets/images/kr-footer-blip-ccl.png'

export default function Footer() {
    return (
        <footer id="footer" className='block relative w-full bg-black text-white p-[60px] pt-[180px] box-border overflow-hidden z-[2]'>
            <div className='block absolute top-[60px] left-[60px] w-[80px] h-[60px] overflow-hidden bg-footer_blip bg-no-repeat bg-100 text-transparent'>
                k-pop radar
            </div>
            <div className='inner w-full max-w-[1440px] mx-0 my-auto'>
                <ul className='z-1 relative ml-auto pb-[320px] max-w-[800px] w-full list-style-none'>
                    <li className='relative'>
                        <NavLink
                            className="block w-full text-[120px] leading-[140px] font-bold"
                            rel="noopener noreferrer"
                            to="/"
                        >
                            data board
                        </NavLink>
                    </li>

                    <li className='relative'>
                        <NavLink
                            className="block w-full text-[120px] leading-[140px] font-bold"
                            rel="noopener noreferrer"
                            to="/"
                        >
                            artist
                        </NavLink>
                    </li>


                    <li className='relative'>
                        <NavLink
                            className="block w-full text-[120px] leading-[140px] font-bold"
                            rel="noopener noreferrer"
                            to="/brief"
                        >
                            brief
                        </NavLink>
                    </li>


                    <li className='relative'>
                        <NavLink
                            className="block w-full text-[120px] leading-[140px] font-bold"
                            rel="noopener noreferrer"
                            to="/about"
                        >
                            about
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="foot w-full max-w-[1440px] mx-0 my-auto">
                <div className='mail-text relative ml-auto mb-[60px] max-w-[800px] w-full text-[30px] leading-[38px] text-white'>
                    <NavLink
                        className="inline-block hover:underline"
                        rel="noopener noreferrer"
                        to="/notice"
                    >
                        <strong className='block'>
                            Notice
                            <img className='inline-block align-baseline w-[26px] relative top-[4px] left-[5px]' src={arrowIcon} />
                        </strong>
                    </NavLink>
                    <br />

                    <NavLink
                        className="inline-block hover:underline"
                        rel="noopener noreferrer"
                        to="/faq"
                    >
                        <strong className='block'>
                            FAQ
                            <img className='inline-block align-baseline w-[26px] relative top-[4px] left-[5px]' src={arrowIcon} />
                        </strong>
                    </NavLink>

                    <br />

                    <NavLink
                        className="inline-block hover:underline mb-[30px]"
                        rel="noopener noreferrer"
                        to="/new-letter"
                    >
                        <strong className='block'>
                            Newsletter
                            <img className='inline-block align-baseline w-[26px] relative top-[4px] left-[5px]' src={arrowIcon} />
                        </strong>
                    </NavLink>
                    <br />
                    <strong>contact</strong>
                    <a className='text-[#7a7a7a]' href='mailto:kpopradar@blip.co'>
                        <p>kpopradar@blip.co</p>
                    </a>

                </div>


                <div className="sns-wrap relative ml-auto max-w-[800px] w-full text-[30px] leading-[38px] after:block after:clear-both after:content-['']">
                    <a className='bg-twitter_icon float-left w-[30px] h-[30px] text-transparent overflow-hidden bg-no-repeat bg-100 bg-[50%]' target="_blank" href='https://twitter.com/kpopradar_twt'>
                        twitter
                    </a>

                    <a className='bg-youtube_icon float-left ml-[50px] w-[30px] h-[30px] text-transparent overflow-hidden bg-no-repeat bg-100 bg-[50%]' target="_blank" href='https://www.youtube.com/@kpop_radar'>
                        youtube
                    </a>


                    <a className='bg-instagram_icon float-left ml-[50px] w-[30px] h-[30px] text-transparent overflow-hidden bg-no-repeat bg-100 bg-[50%]' target="_blank" href='https://www.instagram.com/kpopradar_official/'>
                        instagram
                    </a>
                </div>

                <p className='copyright relative'>
                    <a className='' target='_blank' href='http://creativecommons.org/licenses/by-nc-nd/4.0/'>
                        <img src={blipIcon}/>
                    </a>
                </p>
                <p className='copyright'></p>

                <a className='license'></a>

            </div>
        </footer>
    )
}
