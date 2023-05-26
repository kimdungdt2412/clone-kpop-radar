import React from 'react'
import "./style.css"

export default function BadgeTableHeader(
    {
        type
    }
) {
    return (
        <div className={`relative flex flex-row items-center justify-center pt-[20px] pb-[15px] uppercase tracking-[.05em] text-[10px] text-left leading-[10px] w-full lg:py-[35px] lg:text-[12px]`}>
            <div className="ranking basis-[120px] grow-0 min-w-auto max-w-[43px] lg:min-w-[120px]" />

            <div className="intro w-[41%] basis-0 grow text-center lg:basis-[5%]">
                ARTIST
            </div>

            <div className="badges grow basis-0 text-center lg:basis-[50%]">
                BADGES
            </div>

            <div
                className="total grow max-w-[75px] lg:max-w-[130px]">
              TOTAL
            </div>

        </div>

    )
}
