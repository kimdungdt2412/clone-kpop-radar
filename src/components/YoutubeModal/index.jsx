import React from 'react'
import "./style.css"
import { useEffect } from 'react';

export default function YoutubeModal({ item = {}, closeModal }) {
    useEffect(() => {
        if (!!item.videoUrl) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [item]);

    if (!item.videoUrl) return (<></>)

    return (
        <div className={`youtubeModal ${!!item.videoUrl ? "open" : ""} opacity-0 invisible fixed top-0 right-0 left-0 w-full h-full overflow-auto z-[1] p-[20px] bg-black/[.75] text-center `} onClick={closeModal}>
            <div className="w-[96%] bg-white align-middle relative py-[15px] px-[30px] rounded-[8px] shadow-[0_0_10px_#000] max-w-[620px] inline-block top-[50%] translate-y-[-50%]" onClick={(e) => {
                e && e.stopPropagation()
            }}>
                <div>
                    <iframe
                        className='w-full aspect-video'
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        src={item.videoUrl.replace(".com", "-nocookie.com").replace("watch?v=", "embed/")}>
                    </iframe>
                </div>

                <button
                    onClick={closeModal}
                    className='absolute top-[-12.5px] right-[-12.5px] w-[30px] h-[30px] bg-icon_close indent-[-999px] bg-contain bg-no-repeat bg-[position:center_center] text-transparent'                >
                    Close
                </button>
            </div>
        </div>
    )
}
