import React from 'react'

export default function IconEmoWoman({ isWhite = false }) {
    if (isWhite) {
        return (
            <i className='inline-block align-middle bg-icon_emoticon_woman_w bg-no-repeat w-[16px] h-[16px] bg-[length:100%_auto] mr-[12px] lg:w-[26px] lg:h-[26px]'></i>
        )
    }
    return (
        <i className='inline-block align-middle bg-icon_emoticon_woman bg-no-repeat w-[16px] h-[16px] bg-[length:100%_auto] mr-[12px] lg:w-[26px] lg:h-[26px]'></i>
    )
}
