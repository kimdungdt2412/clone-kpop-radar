import React, { useState } from 'react'
import BoardItem from '../BoardItem'
import YoutubeModal from '../YoutubeModal'
import BadgeBoardItem from '../BoardItem/BadgeBoardItem'

export default function TableBody(
    {
        data,
        isViewCount = false,
        isCreation = false,
        isBadge = false,
        type
    }
) {

    const [selectedItem, setSelectedItem] = useState({})

    return (
        <React.Fragment>
            {
                isBadge ? (
                    <div
                        className={"badge-table-body"}>
                        <ul className="list-none w-full overflow-hidden">
                            {data?.rankData?.map((item, index) => (
                                <BadgeBoardItem badges={data?.badgeMap?.[item.artistId] || []} key={item.name} item={item} setSelectedItem={setSelectedItem} />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div
                        className={(isCreation || isViewCount) ? "view-table-body" : "table-body"}>
                        <ul className="list-none w-full overflow-hidden">
                            {data?.map((item, index) => (
                                <BoardItem key={index} isCreation={isCreation} isViewCount={isViewCount} type={type} item={item} setSelectedItem={setSelectedItem} />
                            ))}
                        </ul>
                    </div>
                )
            }

            <YoutubeModal isViewcount={isViewCount} url={selectedItem.url} closeModal={() => setSelectedItem({})} />
        </React.Fragment>

    )
}
