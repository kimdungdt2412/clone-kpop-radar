import React from 'react'
import "./style.css"

export default function TableHeader(
  {
    isViewCount = false,
    type
  }
) {
  return (
    <div className={`${isViewCount ? "view-table-head" : "table-head"} relative flex flex-row items-center justify-center pt-[20px] pb-[15px] uppercase tracking-[.05em] text-[10px] text-left leading-[10px] w-full lg:py-[35px] lg:text-[12px]`}>
      <div className="ranking basis-[120px] grow-0 min-w-auto max-w-[43px] lg:min-w-[120px]" />

      <div className="intro">
        {isViewCount ? "SONG" : "ARTIST"}
      </div>

      {isViewCount && (
        <React.Fragment>

          {type !== "total" ? (

            <React.Fragment>

              <div
                className="growth">
                GROWTH
              </div>

              <div
                className="total hidden lg:block"
              >
                TOTAL
              </div>
            </React.Fragment>

          ) : (

            <React.Fragment>

              <div
                className="growth"
              >
                TOTAL
              </div>

              <div
                className="hidden total lg:block">
                GROWTH
              </div>

            </React.Fragment>

          )}

        </React.Fragment>
      )}

      {!isViewCount && (
        <React.Fragment>
          <div
            className="growth"
          >
            {type === "total" ? "TOTAL" : "GROWTH"}
          </div>

          <div
            className="total">
            {type !== "total" ? "TOTAL" : "GROWTH"}
          </div>
        </React.Fragment>
      )}
 
      {isViewCount && (
        <div className="hidden mr-[40px] font-light ml-[55px] min-w-[100px] lg:block">RELEASE</div>
      )}

    </div>

  )
}
