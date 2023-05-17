import React from 'react'
import "./style.css"
import { useEffect } from 'react';

export default function YoutubeModal({ url = "", closeModal, isViewcount = false }) {
    useEffect(() => {
        if (url !== "") {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [url]);

    if (!url) return (<></>)

    return (
        <div className={`youtubeModal ${!!url ? "open" : ""} opacity-0 invisible fixed top-0 right-0 left-0 w-full h-full overflow-auto z-[1] p-[20px] bg-black/[.75] text-center `} onClick={closeModal}>
            <div 
            style={{
                background: isViewcount ? "transparent" : "white",
                boxShadow: isViewcount ? "none" : "0 0 10px #000" 
            }}
            className="w-[96%] align-middle relative py-[15px] px-[30px] rounded-[8px] max-w-[620px] inline-block top-[50%] translate-y-[-50%]" 
            onClick={(e) => {
                e && e.stopPropagation()
            }}>
                <div>
                    <iframe
                        className='w-full aspect-video'
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        src={url.replace(".com", "-nocookie.com").replace("watch?v=", "embed/")}>
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
