import React, { useEffect, useState } from 'react'
import prevIcon from "../../assets/images/kr-chart-page-nav-prev-dim.svg"
import nextIcon from "../../assets/images/kr-chart-page-nav-next.svg"
import { createSearchParams, useNavigate } from 'react-router-dom'
import { isValidNumber } from '../../features/Youtube/ViewCount'

export default function TablePagination({ total, currentPage, orderCountInPage, searchParams }) {

    const navigate = useNavigate()
    const [currentSection, setCurrentSection] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [quantity, setQuantity] = useState(3)
    const [top, setTop] = useState(40)
    const [validPage, setValidPage] = useState(1)
    
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

    const handleValidPage = () => {
        if (isValidNumber(currentPage)) {
            if (currentPage > totalPage) return totalPage
            return currentPage
        }
        return 0
    }

    const handlePageList = () => {
        const listPage = Array.from(Array(totalPage ?? 0).keys())
        return listPage.map((item => (
            <button
                key={item}
                style={{
                    background: validPage === (item + 1) ? "black" : "white",
                    color: validPage === (item + 1) ? "white" : "black"
                }}
                onClick={() => handleChangePage(item + 1)}
                className='inline-block m-[5px] w-[30px] h-[30px] rounded-[50%] leading-[31px] text-[12px] border-[1px] border-black bg-white text-black lg:w-[38px] lg:h-[38px] lg:leading-[39px] lg:text-[16px] lg:mx-[10px] lg:border-[2px]'>
                {item + 1}
            </button>
        )))
    }

    useEffect(() => {
        if (window.innerWidth >= 1024) {
            setQuantity(5)
            setTop(48)
        }
        else {
            setQuantity(3)
            setTop(40)
        }
    }, [])

    useEffect(() => {
        setTotalPage(Math.ceil(total / orderCountInPage))
    }, [total])

    useEffect(() => {
        let page = currentPage
        if (isValidNumber(currentPage)) {
            if (currentPage > totalPage) page = totalPage
            page = currentPage
        } else {
            page = 1
        }

        setValidPage(page)
        let flag = page % quantity
        let section = flag === 0 ? Math.floor(page / quantity) - 1 : Math.floor(page / quantity)
        if (section !== currentSection) {
            setCurrentSection(section)
        }
    }, [totalPage, currentPage, quantity])

    return (
        <div className='page-area relative top-0 left-[50%] w-[200px] h-[40px] translate-x-[-50%] overflow-hidden mt-[30px] lg:w-[400px] lg:h-[50px]'>
            <button
                onClick={() => {
                    if (currentSection !== 0) setCurrentSection(currentSection - 1)
                }}
                className="prev absolute top-[10px] bg-transparent border-0 text-[14px] font-bold left-0 cursor-pointer lg:top-[15px]">
                <img src={prevIcon} alt="previous page" />

            </button>

            <div
                style={{
                    top: `-${currentSection * top}px`
                }}
                className="paging absolute w-[120px] left-[50%] m-0 translate-x-[-50%] pl-0 lg:w-[300px]"
            >
                {handlePageList()}
            </div>

            <button
                onClick={() => {
                    if ((currentSection + 1) * quantity < totalPage) setCurrentSection(currentSection + 1)
                }}
                className="next absolute top-[10px] bg-transparent border-0 text-[14px] font-bold right-0 cursor-pointer">
                <img src={nextIcon} alt="next page" />

            </button>
        </div>
    )
}
