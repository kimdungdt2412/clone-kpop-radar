import React from 'react'
import "./Loading.css"

export default function Loading() {
  return (
    <div className='spinner'>
        <div className='spinner-scope'>
            <div className='spinner-ellipsis left-[50%] lg:left-[50%]'>
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
