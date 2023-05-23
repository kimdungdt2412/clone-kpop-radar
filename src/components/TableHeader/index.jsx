import React from 'react'

export default function TableHeader(
  {
    isViewCount = false,
    type
  }
) {
  return (
    <div className='table-head relative flex flex-row items-center justify-center pt-[20px] pb-[15px] uppercase tracking-[.05em] text-[10px] text-left leading-[10px] w-full lg:py-[35px] lg:text-[12px]'>
      <div className="ranking basis-[120px] grow-0 min-w-auto max-w-[43px] lg:min-w-[120px]" />

      <div className="grow basis-[41%] pl-[16px] lg:pl-[20px]">
        {isViewCount ? "SONG" : "ARTIST"}
      </div>

      {type !== "total" ? (
        <React.Fragment>
          <div className="text-[#ff354e] basis-[76px] pl-[30px] pr-0 grow lg:min-w-[100px] lg:grow-0 lg:basis-auto lg:text-center">
            GROWTH
          </div>

          <div
            className="hidden text-[#ff354e] basis-[76px] pr-0 grow lg:block lg:min-w-[100px] lg:basis-auto lg:grow-0 lg:ml-[55px] lg:text-center"
          >
            TOTAL
          </div>
        </React.Fragment>

      ) : (

        <React.Fragment>
          <div
            className="text-[#ff354e] basis-[76px] pl-[30px] pr-0 grow lg:min-w-[100px] lg:basis-auto lg:pl-0 lg:grow-0 lg:text-center"
          >
            TOTAL
          </div>

          <div className="hidden text-[#ff354e] basis-[76px] pr-0 grow lg:min-w-[100px] lg:grow-0 lg:basis-auto lg:block lg:ml-[55px] lg:text-center">
            GROWTH
          </div>
        </React.Fragment>

      )}

      <div className="hidden mr-[40px] font-light ml-[55px] min-w-[100px] lg:block">RELEASE</div>
    </div>

  )
}
