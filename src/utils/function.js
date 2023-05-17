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

export const handleShareLink = (type, brief) => {
    if (!brief.briefId) return
    switch (type) {
        case "twitter":
            window.open(`https://twitter.com/intent/tweet?text=${brief.title}&url=https://www.kpop-radar.com/brief/${brief.briefId}`)
            break;

        case "facebook":
            window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.kpop-radar.com/brief/${brief.briefId}`)
            break;

        case "kakaotalk":
            window.open(`https://accounts.kakao.com/login/?continue=https%3A%2F%2Fsharer.kakao.com%2Fpicker%2Flink%3Fapp_key%3Dcc87d420783819b49977dfef35e6e33e%26short_key%3Df2ec98bd-da8b-4b2e-bd63-eae1949c9d12#login`)
            break;
        case "line":
            window.open(`http://line.me/R/msg/text/?${brief.title + ""}https://www.kpop-radar.com/brief/${brief.briefId}`)
            break;

        default:
            break;
    }
}

export const findKeyOfMap = (type, keyValue, map) => {
    let result = null;
    for (const [key, value] of map) {
        if (value.elements?.[type].includes(keyValue)) {
            result = key;
        }
    }
    return result;
};

export const formatNumber = (number = 0) => {
    return Intl.NumberFormat('en-US').format(number)
}