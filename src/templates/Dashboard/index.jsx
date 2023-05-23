import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import DashboardHeader from '../../components/DashboardHeader'
import { boardTypeMap } from '../../utils/config'
import TopButton from '../../components/TopButton'

export default function Dashboard() {
  const params = useParams()
  const [boardType, setBoardType] = useState(boardTypeMap["viewcount"])

  useEffect(() => {
    if (params?.type) {
      setBoardType(boardTypeMap[params?.type])
    }
  }, [params.type])

  return (

    <React.Fragment>
      <DashboardHeader boardType={boardType} />
      <main id="container max-w-[1920px] mx-auto my-0">
        <Outlet />
      </main>
      <TopButton/>
    </React.Fragment>
  )
}
