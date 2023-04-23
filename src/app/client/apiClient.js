import Axios from "axios";
import { DOMAIN } from "../../utils/config";

var qs = require('qs');

//https://axios-http.com/docs/cancellation
export class APIClient {
    get = (url, model, signal) => {
        return Axios({
          url: `${DOMAIN}/${url}`,
          method: "POST",
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(model),
          signal
        });
    };
}