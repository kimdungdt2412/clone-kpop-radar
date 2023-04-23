import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getBriefList, selectBrief } from './BriefSlice';

export default function BriefList() {
  const briefList = useSelector(selectBrief);
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(getBriefList({
      orderCountInPage: briefList.orderCountInPage,
      lastOrderNo: briefList.lastOrderNo
    }))
    return () => {
      promise.abort()
    }
  }, [dispatch])
  return (
    <div>BriefList</div>
  )
}
