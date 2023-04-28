import React, { useState } from 'react'

export default function ShareBriefModal({setIsOpen}) {
    return (
        <div className='modal' id="modal-sns" aria-hidden="false">
           <div className='modal-overlay will-change-transform animate-mmfadeIn py-0 px-[14vw] z-[1000] fixed top-0 left-0 right-0 bottom-0 bg-black/[.6] flex justify-center items-center '>
                <div className='modal-container will-change-transform animate-mmslideIn_0 p-0 max-w-[980px] overflow-hidden bg-white max-h-[100vh] box-border'>

                </div>
           </div>
        </div>
    )
}
