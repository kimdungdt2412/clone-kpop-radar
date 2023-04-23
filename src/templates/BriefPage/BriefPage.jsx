import React from 'react'
import BriefList from '../../features/BriefList/BriefList'

export default function Brief() {
  return (
    <section className='brief m-0 pt-[72px] overflow-hidden relative'>
        <article className='brief-wrap pt-[50px] max-w-[1180px] mx-auto my-0'>
            <div className='brief-content'>
                <BriefList/>
            </div>
        </article>
    </section>
  )
}
