import React, { useEffect, useState } from 'react'
import prevIcon from "../../assets/images/kr-chart-page-nav-prev-dim.svg"
import nextIcon from "../../assets/images/kr-chart-page-nav-next.svg"
import { createSearchParams, useNavigate } from 'react-router-dom'

export default function TablePagination({ total, currentPage, orderCountInPage, searchParams }) {

    const navigate = useNavigate()
    const [currentSection, setCurrentSection] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const handleChangePage = (page) => {
        navigate(
            {
                pathname: window.location.pathname,
                search: createSearchParams({
                    ...Object.fromEntries([...searchParams]),
                    page
                }).toString()
            })
    }

    const handlePageList = () => {
        const listPage = Array.from(Array(totalPage ?? 0).keys())
        return listPage.map((item => (
            <button
                key={item}
                style={{
                    background: currentPage === (item + 1) ? "black" : "white",
                    color: currentPage === (item + 1) ? "white" : "black"
                }}
                onClick={() => handleChangePage(item + 1)}
                className='inline-block m-[5px] w-[30px] h-[30px] rounded-[50%] leading-[31px] text-[12px] border-[1px] border-black bg-white text-black'>
                {item + 1}
            </button>
        )))
    }

    useEffect(() => {
        setTotalPage(Math.ceil(total / orderCountInPage))
    }, [total])

    useEffect(() => {
        if (Math.floor(currentPage/3) !== currentSection) {
            setCurrentSection(Math.floor(currentPage/3))
        }
    }, [currentPage])
    return (
        <div className='page-area relative top-0 left-[50%] w-[200px] h-[40px] translate-x-[-50%] overflow-hidden mt-[30px]'>
            <button
                onClick={() => {
                    if (currentSection !== 0) setCurrentSection(currentSection - 1)
                }}
                className="prev absolute top-[10px] bg-transparent border-0 text-[14px] font-bold left-0 cursor-pointer">
                <img src={prevIcon} alt="previous page" />

            </button>

            <div
                style={{
                    top: `-${currentSection * 40}px`
                }}
                className="paging absolute w-[120px] left-[50%] m-0 translate-x-[-50%] pl-0"
            >
                {handlePageList()}
            </div>

            <button
                onClick={() => {
                    if ((currentSection + 1) * 3 <= totalPage) setCurrentSection(currentSection + 1)
                }}
                className="next absolute top-[10px] bg-transparent border-0 text-[14px] font-bold right-0 cursor-pointer">
                <img src={nextIcon} alt="next page" />

            </button>
        </div>
    )
}
