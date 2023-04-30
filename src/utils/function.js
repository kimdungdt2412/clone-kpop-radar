export function isPendingAction(action) {
    return action.type.endsWith('/pending')
}


export function isRejectedAction(action) {
    return action.type.endsWith('/rejected')
}

export function isFulfilledAction(action) {
    return action.type.endsWith('/fulfilled')
}

export const getDateByString = (str = "") => {
    let year = str.slice(0, 4) ?? ""
    let month = str.slice(4, 6) ?? ""
    let day = str.slice(6) ?? ""

    return {
        year,
        month,
        day
    }
}

export const splitArtistData = (str = "") => {
    let text = str.split("|")
    let artistID = text[0]
    let artistName = text[1]
    let artistBr = text[2]
    let imgUrl = text[3]

    return {
        artistID,
        artistName,
        artistBr,
        imgUrl
    }
}