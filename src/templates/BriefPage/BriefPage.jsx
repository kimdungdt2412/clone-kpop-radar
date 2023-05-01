import React from 'react'
import BriefList from '../../features/BriefList/BriefList'

export default function Brief() {
  return (
    <section className='brief m-0 pt-[72px] overflow-hidden relative lg:pt-[135px]'>
      <article className='brief-wrap pt-[50px] max-w-[1180px] mx-auto my-0 lg:pt-[80px] pb-[120px] lg:max-w-[904px]'>
        <BriefList />
      </article>
    </section>
  )
}
