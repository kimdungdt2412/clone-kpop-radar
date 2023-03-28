import React from 'react'
import "./Loading.css"

export default function Loading() {
  return (
    <div className='spinner'>
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
