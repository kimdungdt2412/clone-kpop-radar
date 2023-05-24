import React from 'react'
import "./Loading.css"

export default function InnerLoading() {
  return (
    <div className='inner spinner min-h-[200px] lg:min-h-[500px] relative h-auto z-[0]'>
        <div className='spinner-scope'>
            <div className='spinner-ellipsis'>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
            </div>
        </div>
    </div>
  )
}
