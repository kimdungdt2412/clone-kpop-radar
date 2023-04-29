import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getBriefList, selectBrief } from './BriefSlice';
import { briefApi, useGetBriefListQuery } from '../../app/services/Brief';
import BriefItem from '../../components/BriefItem/BriefItem';
import BriefIntro from '../../components/BriefItem/BriefIntro';
import Loading from '../../components/Loading/Loading';
import ShareBriefModal from '../../components/ShareBriefModal';

export default function BriefList() {
  const briefData = useSelector(selectBrief);

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
        className='relative rounded-full bg-black border-0 w-[54px] h-[54px] before:content-[""] before:absolute before:top-[50%] before:left-[50%] before:h-[1px] before:w-[14px] before:bg-white before:translate-x-[-50%] before:translate-y-[-50%] after:absolute after:w-[14px] after:h-[1px] after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:rotate-90 after:content-[""] after:bg-white'
        onClick={() => {
          trigger({
            orderCountInPage: briefData.orderCountInPage,
            lastOrderNo: briefData.lastOrderNo
          })
        }}
        
        >
          <span className='absolute top-[-1px] left-[-1px] w-[1px] h-[1px] overflow-hidden '>+</span>
        </button>
      </div>


      <ShareBriefModal/>

    </div>
  )
}
