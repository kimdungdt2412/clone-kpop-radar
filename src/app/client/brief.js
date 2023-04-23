import { APIClient } from "./apiClient";

let apiPrefix = "brief";

export class briefClient extends APIClient {
    constructor() {
        super();
    }

    getBriefContentList = (data = {}, signal) => {
        return this.get(`${apiPrefix}/getContentList`, data, signal)
    }

    getBriefContentDetail = (briefId) => {
        return this.get(`${apiPrefix}/getContent`, {
            briefId
        })
    }
}

export const getBriefClient = new briefClient();
