import React from 'react'

export default function IconRankDown({isWhite = false}) {
    if (isWhite) return (
        <i className='inline-block align-middle bg-icon_rank_down_w bg-no-repeat w-[5px] h-[3px] bg-[length:5px_auto] mr-[5px] lg:w-[7px] lg:h-[4px] lg:mr-[7px] lg:bg-[length:auto_auto]'></i>
    )
    return (
        <i className='inline-block align-middle bg-icon_rank_down bg-no-repeat w-[5px] h-[3px] bg-[length:5px_auto] mr-[5px] lg:w-[7px] lg:h-[4px] lg:mr-[7px] lg:bg-[length:auto_auto]'></i>
    )
}
