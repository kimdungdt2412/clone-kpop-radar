import React from 'react'
import BriefList from '../../features/BriefList/BriefList'
import BriefView from '../../components/BriefViewDetail'

export default function Brief() {
  return (
    <section className='brief m-0 pt-[72px] overflow-hidden relative lg:pt-[135px] '>
      <article className='brief-wrap pt-[50px] max-w-[1180px] mx-auto my-0 lg:pt-[80px] pb-[120px] lg:max-w-[904px] xl:pt-[115px] xl:pb-[160px] xl:max-w-[1180px] xl:my-0 xl:mx-auto'>
        <BriefList />
        <BriefView/>
      </article>
    </section>
  )
}
