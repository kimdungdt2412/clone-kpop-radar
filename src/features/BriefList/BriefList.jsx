import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getBriefList, selectBrief } from './BriefSlice';
import { useGetBriefListQuery } from '../../app/services/Brief';
import BriefItem from '../../components/BriefItem/BriefItem';
import BriefIntro from '../../components/BriefItem/BriefIntro';
import Loading from '../../components/Loading/Loading';

export default function BriefList() {
  const briefList = useSelector(selectBrief);

  //default
  const { data, isLoading, isFetching } = useGetBriefListQuery({
    orderCountInPage: briefList.orderCountInPage,
    lastOrderNo: 0
  })

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const promise = dispatch(getBriefList({
  //     orderCountInPage: briefList.orderCountInPage,
  //     lastOrderNo: briefList.lastOrderNo
  //   }))
  //   return () => {
  //     promise.abort()
  //   }
  // }, [dispatch])


  useEffect(() => {

  }, [])
  return (
    <div className='brief'>

      <div className='brief-content'>
        <ul className='block mb-0 list-none [transform:translateZ(0px)]'>
          {isFetching ? (
            <Loading />
          ) : (
            <React.Fragment>
              {briefList.briefs?.map((item, index) => index === 0 ? <BriefIntro key={item.briefId} brief={item} /> : <BriefItem key={item.briefId} brief={item} />)}
            </React.Fragment>
          )}
        </ul>
      </div>

      <div className='brief-more'>

      </div>

    </div>
  )
}
