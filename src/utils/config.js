import twIcon from "../assets/images/icon_brief_tw.jpg"
import fbIcon from "../assets/images/icon_brief_fb.jpg"
import lineIcon from "../assets/images/icon_brief_line.jpg"
import talkIcon from "../assets/images/icon_brief_talk.jpg"
import redLogo from "../assets/images/logo_1.png"
import redLogoGif from "../assets/images/logo_motion_1.gif"
import blueLogo from "../assets/images/logo_2.svg"
import blueLogoGif from "../assets/images/logo_motion_2.gif"
import pinkLogo from "../assets/images/logo_3.svg"
import pinkLogoGif from "../assets/images/logo_motion_3.gif"
import turqouiseLogo from "../assets/images/logo_5.svg"
import turqouiseLogoGif from "../assets/images/logo_motion_5.gif"
import greenLogo from "../assets/images/logo_7.svg"
import greenLogoGif from "../assets/images/logo_motion_7.gif"
import purleLogo from "../assets/images/logo_8.svg"
import purleLogoGif from "../assets/images/logo_motion_8.gif"
import icon_1 from "../assets/images/kr-sd-1.png"
import icon_2 from "../assets/images/kr-sd-2.png"
import icon_3 from "../assets/images/kr-sd-3.png"
import icon_4 from "../assets/images/kr-sd-4.png"
import icon_5 from "../assets/images/kr-sd-5.png"
import icon_6 from "../assets/images/kr-sd-6.png"

export const DOMAIN = "https://api.kpop-radar.com";


export const menus = [
    {
        title: "DATA BOARD",
        url: "/board"
    },
    {
        title: "ARTIST",
        url: "/artist"
    },
    {
        title: "BRIEF",
        url: "/brief"
    },
    {
        title: "ABOUT",
        url: "/about"
    },
]

export const snsList = [
    {
        id: "twitter",
        img: twIcon
    },
    {
        id: "facebook",
        img: fbIcon
    },
    {
        id: "kakaotalk",
        img: talkIcon
    },
    {
        id: "line",
        img: lineIcon
    },
]

export const listTabMenu = [
    {
        name: "youtube",
        detail: "viewcount",
        path: "viewcount"
    },
    {
        name: "youtube",
        detail: "subscribers",
        path: "youtube"
    },
    {
        name: "twitter",
        detail: "followers",
        path: "twitter"
    },
    {
        name: "instagram",
        detail: "followers",
        path: "instagram"
    },
    {
        name: "tiktok",
        detail: "creations",
        path: "tiktok_creations"
    },
    {
        name: "tiktok",
        detail: "followers",
        path: "tiktok"
    },
    {
        name: "spotify",
        detail: "followers",
        path: "spotify"
    },
    {
        name: "fan cafe",
        detail: "members",
        path: "fancafe"
    },
    {
        name: "badge",
        detail: "board",
        path: "badge"
    },
]

export const boardTypeMap = {
    "viewcount": {
        index: 1,
        name: "youtube",
        detail: "viewcount",
        logo: redLogo,
        logo_gif: redLogoGif,
        color: "#fc0101",
        desc: "Detects official music video's YouTube views in an hour"
    },
    "youtube":
    {
        index: 2,
        name: "youtube",
        detail: "subscribers",
        logo: redLogo,
        logo_gif: redLogoGif,
        color: "#fc0101",
        desc: "Detects official Youtube subscribers every day"
    },
    "twitter": {
        index: 3,
        name: "twitter",
        detail: "followers",
        logo: blueLogo,
        logo_gif: blueLogoGif,
        color: "#00a3ff",
        desc: "Detects official Twitter followers every day.",
        siteId: 53
    },
    "instagram": {
        index: 4,
        name: "instagram",
        detail: "followers",
        logo: pinkLogo,
        logo_gif: pinkLogoGif,
        color: "#ff0075",
        desc: "Detects official Instagram followers every day.",
        siteId: 52
    },
    "tiktok_creations": {
        index: 5,
        name: "tiktok",
        detail: "creations",
        logo: turqouiseLogo,
        logo_gif: turqouiseLogoGif,
        color: "#00f4ec",
        desc: "Detect number of video creations of TikTok every day. * Updates are made between 12 pm and 7 pm (KST)."
    },
    "tiktok": {
        index: 6,
        name: "tiktok",
        detail: "followers",
        logo_gif: turqouiseLogoGif,
        color: "#00f4ec",
        desc: "Detects official TikTok followers every day. * Updates are made between 12 pm and 7 pm (KST).",
        siteId: 54
    },
    "spotify": {
        index: 7,
        name: "spotify",
        detail: "followers",
        logo: greenLogo,
        logo_gif: greenLogoGif,
        color: "#1ed760",
        desc: "Detects Spotify followers every day.",
        siteId: 11
    },
    "fancafe": {
        index: 8,
        name: "fan cafe",
        detail: "members",
        logo: purleLogo,
        logo_gif: purleLogoGif,
        color: "#833ab4",
        desc: "Detects official Fan Cafe members every day."
    },
    "badge": {
        index: 9,
        name: "badge",
        detail: "board",
        logo: redLogo,
        logo_gif: redLogoGif,
        color: "#fc0101",
        desc: "Badge is updated when the artist reaches a certain milestone"
    },
}

export const sortTypes = ["growth", "total"]

export const youtubeSortType = ["growth", "total", "latest"]

export const youtubeSortTypeValue = {
    "growth": {
        sortType: 1
    },
    "total": {
        sortType: 2
    },
    "latest": {
        sortType: 1,
        dateOrder: 1
    },
}

export const sortDateV1 = ["weekly", "monthly"]
export const sortDateV2 = ["daily", "weekly", "monthly"]

export const youtubeSortDateValue = ["realtime", "daily", "weekly", "monthly"]

export const sortGender = ["all", "boys", "girls"]

export const sortGenderMap = {
    "boys": "M",
    "girls": "F"
}

export const badgeTypes = ["total", "highest"]
export const badgeTypeValue = {
    "total": {
        filterType: 2
    },
    "highest": {
        filterType: 1
    }
}

export const badgeDates = ["overall", "annual"]


export const scheduleTypeMap = {
    1: icon_1,
    2: icon_2,
    3: icon_3,
    4: icon_4,
    5: icon_5,
    6: icon_6
}