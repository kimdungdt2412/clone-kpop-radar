import React from 'react'

export default function TableHeader(
  {
    isViewCount = false,
    type
  }
) {
  return (
    <div className='table-head relative flex flex-row items-center justify-center pt-[20px] pb-[15px] uppercase tracking-[.05em] text-[10px] text-left leading-[10px] w-full'>
      <div className="ranking basis-[120px] grow-0 min-w-auto max-w-[43px]" />

      <div className="grow basis-[41%] pl-[16px]">
        {isViewCount ? "SONG" : "ARTIST"}
      </div>

      {type !== "total" ? (
        <React.Fragment>
          <div className="text-[#ff354e] basis-[76px] pl-[30px] pr-0 grow">
            GROWTH
          </div>
          <div
          style={{
            display: isViewCount ? "none" : "block"
          }}
            className="text-[#ff354e] basis-[76px] pl-[30px] pr-0 grow"
          >
            TOTAL
          </div>
        </React.Fragment>

      ) : (
        <div
          className="text-[#ff354e] basis-[76px] pl-[30px] pr-0 grow"
        >
          TOTAL
        </div>
      )}

      <div className=""></div>
    </div>

  )
}
