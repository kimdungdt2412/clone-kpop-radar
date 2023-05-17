import React from 'react'
import { NavLink } from 'react-router-dom'
import arrowIcon from '../../assets/images/kr-about-faq-arrow.png';
import blipIcon from '../../assets/images/kr-footer-blip-sp-logo.png'
import licenseIcon from '../../assets/images/kr-footer-blip-ccl.png'
import './style.css'

export default function Footer() {

    const menuList = [
        {
            title: "data board",
            url: "/board"
        },
        {
            title: "artist",
            url: "/artist"
        },
        {
            title: "brief",
            url: "/brief"
        },
        {
            title: "about",
            url: "/about"
        }
    ]

    return (
        <footer id="footer" className='block relative w-full bg-black text-white pt-[100px] px-[13px] pb-[35px] lg:p-[60px] lg:pt-[180px] box-border overflow-hidden z-[2]'>
            <div className='block absolute top-[10px] left-[24px] w-[55px] h-[55px] lg:top-[60px] lg:left-[60px] lg:w-[80px] lg:h-[60px] overflow-hidden bg-footer_blip bg-no-repeat bg-100 bg-[50%] text-transparent'>
                k-pop radar
            </div>
            <div className='inner w-full max-w-[1440px] mx-0 my-auto'>
                <ul className='z-1 relative max-w-none w-auto left-0 m-0 ml-[77px] pb-0 lg:ml-auto lg:pb-[320px] lg:max-w-[800px] lg:w-full list-style-none'>
                    {
                        menuList.map(item => (
                            <li className='relative' key={item.title}>
                                {item.title !== 'about' ? (
                                    <NavLink
                                        className="menu-item block w-full text-[46px] leading-[64px] lg:text-[120px] lg:leading-[140px] font-bold"
                                        rel="noopener noreferrer"
                                        to={item.url}
                                    >
                                        {item.title}
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        className="menu-item block w-full text-[46px] leading-[64px] lg:text-[120px] lg:leading-[140px] font-bold"
                                        rel="noopener noreferrer"
                                        to={item.url}
                                    >
                                        {item.title}
                                    </NavLink>
                                )}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="foot w-full mt-[55px] lg:mt-auto ml-[77px] lg:ml-auto max-w-[1440px] mx-0 my-auto">
                <div className='mail-text text-[17px] leading-[28px] static w-auto ml-0 lg:relative lg:ml-auto mb-[60px] max-w-[800px] lg:w-full lg:text-[30px] lg:leading-[38px] text-white'>
                    <NavLink
                        className="inline-block hover:underline"
                        rel="noopener noreferrer"
                        to="/notice"
                    >
                        <strong className='block leading-[15px] lg:leading-none'>
                            Notice
                            <img className='inline-block align-baseline w-[18px] lg:w-[26px] relative top-[4px] left-[3px] lg:left-[5px]' src={arrowIcon} />
                        </strong>
                    </NavLink>
                    <br />

                    <NavLink
                        className="inline-block hover:underline"
                        rel="noopener noreferrer"
                        to="/faq"
                    >
                        <strong className='block leading-[15px] lg:leading-none'>
                            FAQ
                            <img className='inline-block align-baseline w-[18px] lg:w-[26px] relative top-[4px] left-[3px] lg:left-[5px]' src={arrowIcon} />
                        </strong>
                    </NavLink>

                    <br />

                    <NavLink
                        className="inline-block hover:underline mb-[30px]"
                        rel="noopener noreferrer"
                        to="/new-letter"
                    >
                        <strong className='block leading-[15px] lg:leading-none'>
                            Newsletter
                            <img className='inline-block align-baseline w-[18px] lg:w-[26px] relative top-[4px] left-[3px] lg:left-[5px]' src={arrowIcon} />
                        </strong>
                    </NavLink>
                    <br />
                    <strong className='block leading-[15px] lg:leading-none'>contact</strong>
                    <a className='text-[#7a7a7a]' href='mailto:kpopradar@blip.co'>
                        <p>kpopradar@blip.co</p>
                    </a>

                </div>


                <div className="sns-wrap text-[30px] max-w-[800px] leading-[38px] static w-auto mt-[-40px] ml-[-6px] lg:relative lg:mt-0 lg:ml-auto lg:w-full after:block after:clear-both after:content-['']">
                    <a className='bg-twitter_icon float-left w-[30px] h-[30px] text-transparent overflow-hidden bg-no-repeat bg-[50%] bg-[length:22px_auto] lg:bg-100' onClick={() => window.open('https://twitter.com/kpopradar_twt')}>
                        twitter
                    </a>

                    <a className='bg-youtube_icon inline-block float-left w-[30px] h-[30px] text-transparent overflow-hidden bg-no-repeat bg-[50%] bg-[length:22px_auto] lg:bg-100 ml-[30px] lg:ml-[50px]' onClick={() => window.open('https://www.youtube.com/@kpop_radar')}>
                        youtube
                    </a>


                    <a className='bg-instagram_icon inline-block float-left w-[30px] h-[30px] text-transparent overflow-hidden bg-no-repeat bg-[50%] bg-[length:22px_auto] lg:bg-100 ml-[30px] lg:ml-[50px]' onClick={() => window.open('https://www.instagram.com/kpopradar_official/')}>
                        instagram
                    </a>
                </div>

                <p className='copyright static w-auto mt-[40px] text-[10px]  lg:relative lg:ml-auto lg:left-0 lg:bottom-0 lg:mt-0 lg:max-w-[800px] lg:leading-[38px] lg:text-[13px] xl:absolute xl:left-[60px] xl:bottom-[60px] lg:w-full leading-[20px]'>
                    <a className='inline-block absolute lg:relative xl:absolute bottom-[55px] lg:bottom-[-15px] xl:ml-auto xl:bottom-[20px] lg:leading-[38px] xl:leading-none left-auto lg:left-0' onClick={() => window.open("http://creativecommons.org/licenses/by-nc-nd/4.0/")}>
                        <img className='w-[75px] ml-[4px] lg:w-[120px]' src={blipIcon} />
                    </a>
                </p>
                <p className='copyright static w-auto mt-[40px] text-[10px]  lg:relative lg:ml-auto lg:left-0 lg:bottom-0 lg:mt-0 lg:max-w-[800px] lg:leading-[38px] lg:text-[13px] xl:absolute xl:left-[60px] xl:bottom-[60px] xl:leading-[20px] lg:w-full leading-[20px]'>
                    <a className='text-[#7a7a7a]' onClick={() => window.open('https://www.spaceoddity.me')}>
                        © 2019 Spaceoddity. All Rights Reserved
                    </a>
                </p>

                <a className='license absolute right-[5px] bottom-[37px] lg:bottom-[60px] lg:right-[60px]' onClick={() => window.open('http://creativecommons.org/licenses/by-nc-nd/4.0/')}>
                    <img className='w-[60px] mr-[10px] lg:mr-0 lg:w-[120px]' src={licenseIcon} />
                </a>

            </div>
        </footer>
    )
}
