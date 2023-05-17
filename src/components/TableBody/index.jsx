import React, { useState } from 'react'
import BoardItem from '../BoardItem'
import YoutubeModal from '../YoutubeModal'

export default function TableBody(
    {
        data = [],
        isViewCount = false,
        type
    }
) {

    const [selectedItem, setSelectedItem] = useState({})

    return (
        <React.Fragment>
            <div className='table-body'>
                <ul className="list-none w-full overflow-hidden">
                    {data?.map((item, index) => (
                        <BoardItem key={index} isViewCount={true} type={type} item={item} setSelectedItem={setSelectedItem}/>
                    ))}
                </ul>
            </div>

            <YoutubeModal isViewcount={isViewCount} url={selectedItem.url} closeModal={() => setSelectedItem({})}/>
        </React.Fragment>

    )
}
