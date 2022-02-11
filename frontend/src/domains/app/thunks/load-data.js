import axios from 'axios';

import { BASE_API } from "../constants";
import { setAppPatents, setAppPatent} from "../state";

const HARD_CODED_DATA = {
    line_items: [
        {
            organization: 'Tesla INC.',
            assignee_id: 'b1094623-3d25-49e1-938c-197aca941ecf'
        },
        {
            organization: 'Rivian Ip Holdings LLC',
            assignee_id: 'c3fe6c7a-acd9-47e8-aeee-dcfceeebec46'
        },
        {
            organization: 'General Motors LLC',
            assignee_id: '3b8494d6-1a53-4ced-81c9-b64e324c0bf4'
        },
        {
            organization: 'Nissan Motor Co. LTD.',
            assignee_id: 'e44ed94a-1b35-4e8b-ac31-c3d19219ef5b'
        }
    ]
};

export function loadData() {
    return (dispatch) => {
        return dispatch(setAppPatents(HARD_CODED_DATA));
        //return axios
         //   .get(`${BASE_API}/patents`)
         //   .then(dispatch(setAppPatents(HARD_CODED_DATA)));
        // .catch(() => {
        //     dispatch(setAppPatents(some error?));
        // });
        // dispatch(setAppPatents(HARD_CODED_DATA));
    }
}

export function loadPatentData(patent_id){
    return (dispatch) => {

        return axios.get('https://api.patentsview.org/patents/query',{
            
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        });

        return axios
            .get(`${BASE_API}/patents/` + patent_id + `/patent`)
            .then((data) => dispatch(setAppPatent(data)));
    }
}
