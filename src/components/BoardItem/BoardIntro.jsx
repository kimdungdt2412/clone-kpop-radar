import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CreationThumb from "../../assets/images/creation_thum_200x200.jpg"
import { splitArtistData } from '../../utils/function'

export default function BoardIntro({ item }) {
    const [imgSrc, setImgSrc] = useState(item.imgUrl)
    const onError = () => {
        if (item.imgUrl2) setImgSrc(item.imgUrl2)
    }

    return (
        <div className="intro">
            <a
                onClick={() => { window.open(item.url) }
                }>
                <figure className='absolute top-[50%] left-0 translate-y-[-50%] overflow-hidden w-[46px] h-[46px] rounded-[50%]'>
                    <img className='block absolute top-[50%] left-[50%] max-w-[46px] translate-x-[-50%] translate-y-[-50%]' src={imgSrc} onError={onError} />
                </figure>
            </a>

            {item.visible !== 0 ? (
                <Link
                    to={`/artist/${item.artistPath}`}
                    className='inline-block relative w-auto'
                >
                    <span className='artistName after:content-[""] after:absolute after:block after:left-0 after:bottom-[2px] after:w-full after:h-[1px] after:bg-[black]'>{item.artistName}
                    </span>
                </Link>
            ) : (
                <span className='artistName'>{item.artistName}
                </span>
            )}
        </div>

    )

}

export const ViewCountBoardIntro = ({ setSelectedItem, item }) => {
    const { artistBr, artistName } = splitArtistData(item.artists ?? "")

    return (
        <div className="intro">
            <a
                onClick={() => setSelectedItem(item)}
                className='absolute left-0 top-[50%] translate-y-[-50%] before:content-[""] before:z-[2] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-icon_view_yt before:bg-no-repeat before:bg-[50%_center] before:opacity-1 before:bg-[length:13px_auto] after:content-[""] after:z-[1] after:block after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:w-full after:h-full after:bg-black after:opacity-20 lg:before:opacity-0 lg:after:opacity-0 lg:group-hover:after:opacity-30 lg:group-hover:after:scale-[1.4] lg:group-hover:before:opacity-100'>
                <figure className='relative overflow-hidden w-[60px] h-[34px] lg:w-[72px] lg:h-[42px] lg:group-hover:scale-[1.4]'>
                    <img className='block absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-50%]' src={item.thumbnailUrl} />
                </figure>
            </a>

            <div className="text-wrap overflow-hidden ml-auto w-full pr-0 lg:pr-[40px] lg:ml-[20px]">
                <span className='artistName'>{item.songName}
                </span>
                <Link
                    to={`/artist/${artistBr}`}
                    className='relative inline-block text-[#666] overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] text-[12px] p-0 h-auto leading-[17px] mr-[10px] after:content-[""] after:absolute after:block after:rounded-[14px] after:opacity-100 after:top-auto after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[#666] after:border-none lg:text-[14px] lg:after:content-none lg:h-[24px] '
                >
                    <span className='font-light m-0 transition-all'>{artistName}</span>
                </Link>
            </div>

        </div>
    )
}

export const CreationBoardIntro = ({ item }) => {
    const [imgSrc, setImgSrc] = useState(item.imgUrl)
    const onError = () => {
        setImgSrc(CreationThumb)
    }

    return (
        <div className='intro'>
            <a>
                <figure className='absolute top-[50%] left-0 translate-y-[-50%] overflow-hidden w-[46px] h-[46px] rounded-[50%]'>
                    <img className='block absolute top-[50%] left-[50%] max-w-[46px] translate-x-[-50%] translate-y-[-50%]' src={imgSrc ?? CreationThumb} onError={onError} />
                </figure>
            </a>

            <div className="text-wrap overflow-hidden ml-auto w-full pr-0 lg:pr-[40px] lg:ml-[20px]">
                <span className='artistName'>{item.songName}
                </span>
                <a
                    className='relative inline-block text-[#666] overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] text-[12px] p-0 h-auto leading-[17px] mr-[10px] after:content-[""] after:absolute after:block after:rounded-[14px] after:opacity-100 after:top-auto after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[#666] after:border-none lg:text-[14px] lg:after:content-none lg:h-[24px] '
                >
                    <span className='font-light m-0 transition-all'>{item.artistName}</span>
                </a>
            </div>
        </div>
    )
}

