import React from 'react'
import { snsList } from '../../utils/config'

export const ShareArtistModal = React.memo(({ artist, open, handleClose  }) => {

    const handleShareLink = (type) => {
        if (!artist.artistPath) return
        switch (type) {
            case "twitter":
                window.open(`https://twitter.com/intent/tweet?text=${artist.artistPath}&url=https://www.kpop-radar.com/${artist.artistPath}`)
                break;

            case "facebook":
                window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.kpop-radar.com/${artist.artistPath}`)
                break;

            case "kakaotalk":
                window.open(`https://accounts.kakao.com/login/?continue=https%3A%2F%2Fsharer.kakao.com%2Fpicker%2Flink%3Fapp_key%3Dcc87d420783819b49977dfef35e6e33e%26short_key%3Df2ec98bd-da8b-4b2e-bd63-eae1949c9d12#login`)
                break;
            case "line":
                window.open(`http://line.me/R/msg/text/?${artist.artistPath + ""}https://www.kpop-radar.com/${artist.artistPath}`)
                break;

            default:
                break;
        }
    }

    if (!open) return <></>

    return (
        <div className='modal' id="modal-sns" aria-hidden="false">
            <div className='modal-overlay will-change-transform animate-mmfadeIn py-0 px-[14vw] z-[1000] fixed top-0 left-0 right-0 bottom-0 bg-black/[.6] flex justify-center items-center' onClick={handleClose}>
                <div className='modal-container will-change-transform animate-mmslideIn p-0 max-w-[980px] overflow-hidden bg-white max-h-[100vh] box-border' onClick={(e) => {
                    e && e.stopPropagation()
                }}>
                    <header className='modal-header h-[10.6667vw] block text-right'>
                        <h2 className='text-[#00449e] box-border font-bold text-[1.25rem] my-0 leading-[1.25] absolute top-[-1px] left-[-1px] w-[1px] h-[1px] overflow-hidden clip'>SNS Share</h2>
                        <button className='border-0 bg-transparent m-[7px] relative w-[10.6667vw] h-[10.6667vw] indent-[-999px] before:content-["\2715"] before:absolute before:w-[4vw] before:h-[4vw] before:bg-icon_brief_close before:bg-100 before:top-[50%] before:left-[50%] text-0 before:translate-x-[-50%] before:translate-y-[-50%]' onClick={handleClose}>

                        </button>
                    </header>

                    <main className='modal-content m-0 text-inherit leading-[1.5] '>
                        <ul className='sns-lst flex px-[10vw] pt-0 pb-[2.1333vw] flex-wrap justify-between list-none'>
                            {snsList.map(item => {
                                return (
                                    <li key={item.id} className={`w-[21.86667vw] p-[4.26667vw] box-border`} onClick={() => handleShareLink(item.id)}>
                                        <a className='block no-underline text-black'>
                                            <img className='block w-full max-w-[80px] my-0 mx-auto' src={item.img} alt={item.id} />
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>

                        <div className='url-area relative h-[10.66667vw] pl-[4.53333vw] mt-[2.66667vw]'>
                            <span className='relative overflow-hidden block pl-[8vw] bottom-[3px]'>
                                <input className='w-[90%] whitespace-nowrap block overflow-hidden text-[3.2vw] font-thin leading-[10.6667vw] text-ellipsis border-0 bg-transparent focus-visible:outline-[#F0CA7D]' type="text" defaultValue={`https://www.kpop-radar.com/${artist.artistPath}`} />
                            </span>
                            <button className='absolute left-[8px] bottom-[5px] w-[10vw] h-[10vw] bg-icon_brief_url bg-[length:50%_auto] bg-no-repeat bg-center border-0'>

                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
})
