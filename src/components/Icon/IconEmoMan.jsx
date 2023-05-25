import React from 'react'

export default function IconEmoMan({ isWhite = false }) {
    if (isWhite) return (
        <i className='inline-block align-middle bg-icon_emoticon_man_w bg-no-repeat w-[16px] h-[16px] bg-[length:100%_auto] mr-[12px] lg:w-[26px] lg:h-[26px]'></i>
    )
    return (
        <i className='inline-block align-middle bg-icon_emoticon_man bg-no-repeat w-[16px] h-[16px] bg-[length:100%_auto] mr-[12px] lg:w-[26px] lg:h-[26px]'></i>
    )
}
