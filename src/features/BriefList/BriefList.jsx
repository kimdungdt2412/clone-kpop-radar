import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getBriefList, selectBrief } from './BriefSlice';
import { briefApi, useGetBriefListQuery } from '../../app/services/Brief';
import BriefItem from '../../components/BriefItem/BriefItem';
import BriefIntro from '../../components/BriefItem/BriefIntro';
import Loading from '../../components/Loading/Loading';
import { ShareBriefModal } from '../../components/ShareBriefModal';
import BriefView from '../../components/BriefViewDetail';

export default function BriefList() {
  const briefData = useSelector(selectBrief);
  const [open, setOpen] = useState(false)
  const { isFetching } = useGetBriefListQuery({
    orderCountInPage: briefData.orderCountInPage,
    lastOrderNo: 0
  })

  const [trigger] = briefApi.endpoints.getBriefList.useLazyQuery()

  useEffect(() => {

  }, [])
  return (
    <div className='brief relative'>

      <div className='brief-content'>
        <ul className='block mb-0 list-none [transform:translateZ(0px)]'>
          {isFetching ? (
            <Loading />
          ) : (
            <React.Fragment>
              {briefData.briefs?.map((item, index) => index === 0 ? <BriefIntro key={item.briefId} brief={item} /> : <BriefItem key={item.briefId} brief={item} />)}
            </React.Fragment>
          )}
        </ul>
      </div>

      <div className='brief-more mt-[40px] mb-[100px] text-center'>
        <button
          className='relative btn-more w-[54px] h-[54px] before:w-[14px] after:w-[14px]'
          onClick={() => {
            // trigger({
            //   orderCountInPage: briefData.orderCountInPage,
            //   lastOrderNo: briefData.lastOrderNo
            // })
            setOpen(true)
          }}

        >
          <span className='absolute top-[-1px] left-[-1px] w-[1px] h-[1px] overflow-hidden '>+</span>
        </button>
      </div>


      <ShareBriefModal brief={briefData.currentBriefData} />

      <BriefView isOpen={open}/>

    </div>
  )
}
