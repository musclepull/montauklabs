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

export function loadPatentData(assignee_id){
    return (dispatch) => {
        const base_url = 'https://api.patentsview.org/patents/query?q=';
        const five_years_ago = new Date(new Date().setFullYear(new Date().getFullYear() - 5));
        const full_date = five_years_ago.getFullYear().toString() + '-' +  five_years_ago.getMonth().toString()  + '-' +  five_years_ago.getDate().toString() 
        const query = '{"_and":[{"_gte":{"patent_date":"' + full_date + '"}},{"assignee_id":"' + assignee_id + '"}]}&f=["patent_number","patent_date","cpc_section_id"]'; 
        const complete_url = base_url + query;
        axios.get(complete_url)
             .then((response) => {
          const totalPatents = response.data.total_patent_count;
          const updated_query = '{"_and":[{"_gte":{"patent_date":"' + full_date + '"}},{"assignee_id":"' + assignee_id + '"}]}&f=["assignee_organization","patent_number","patent_date","cpc_section_id"]&o={"per_page":' + totalPatents + '}&s=[{"patent_date":"asc"}]';
          const updated_complete_url = base_url + updated_query;
          axios.get(updated_complete_url)
               .then((response_2) => {
                var entireObj = {};
                var dict = {};

                response_2.data.patents.map(function (row, index) {
                    if(dict[row.patent_date] !== undefined){
                        var existing_cpc_array = dict[row.patent_date].cpcDict;
                        const new_obj = {};
                        new_obj.cpc_section_id = row.cpcs[0].cpc_section_id;
                        existing_cpc_array.push(new_obj);
                    }
                    else{
                        const new_obj = {};
                        new_obj.cpcDict = []; 
                        const cpcObj = {};
                        cpcObj.cpc_section_id = row.cpcs[0].cpc_section_id;
                        new_obj.cpcDict.push(cpcObj);
                        dict[row.patent_date] = new_obj;   
                    }
         
                })
                var entireObj = {};
                const organization = response_2.data.patents[0].assignees[0].assignee_organization;
                entireObj.organization = organization;
                entireObj.dict = dict;
                return dispatch(setAppPatent(entireObj));
            })       
        })
    }
}

export function loadAlternatePatentData(assignee_id){
    return (dispatch) => {
        const base_url = 'https://api.patentsview.org/patents/query?q=';
        const five_years_ago = new Date(new Date().setFullYear(new Date().getFullYear() - 5));
        const full_date = five_years_ago.getFullYear().toString() + '-' +  five_years_ago.getMonth().toString()  + '-' +  five_years_ago.getDate().toString() 
        const query = '{"_and":[{"_gte":{"patent_date":"' + full_date + '"}},{"assignee_id":"' + assignee_id + '"}]}&f=["patent_number","patent_date","cpc_section_id"]'; 
        const complete_url = base_url + query;
        axios.get(complete_url)
             .then((response) => {
          const totalPatents = response.data.total_patent_count;
          const updated_query = '{"_and":[{"_gte":{"patent_date":"' + full_date + '"}},{"assignee_id":"' + assignee_id + '"}]}&f=["patent_number","patent_date","cpc_section_id"]&o={"per_page":' + totalPatents + '}&s=[{"patent_date":"asc"}]';
          const updated_complete_url = base_url + updated_query;
          axios.get(updated_complete_url)
               .then((response_2) => {
                var dict = {};

                response_2.data.patents.map(function (row, index) {
                    if(dict[row.patent_date] !== undefined){
                        //key exists
                        const obj = dict[row.patent_date]
                        obj.count++;

                        //iterate through cpcslist -- change row.cpcs[0] to row.cpcs.length - 1 to get complete list

                        for(var i = 0; i <= row.cpcs.length - 1; i++){
                            for(var j = 0; j <= dict[row.patent_date].cpcDict.length - 1; j++){
                                if(dict[row.patent_date].cpcDict[j].cpc_section_id == row.cpcs[i].cpc_section_id){
                                    //cpc exists => take value and increment by 1 and chuck it back into dictionary
                                    const count = dict[row.patent_date].cpcDict[j].cpc_count;
                                    const updated_count = count + 1;
                                    const cpcObj = {};
                                    cpcObj.cpc_section_id = dict[row.patent_date].cpcDict[j].cpc_section_id;
                                    cpcObj.cpc_count = updated_count;
                                    //remove from dict
                                    const index = dict[row.patent_date].cpcDict.indexOf(dict[row.patent_date].cpcDict[j]);
                                    if(index > -1){
                                        dict[row.patent_date].cpcDict.splice(index,1);
                                    }
                                    //add to dict
                                    dict[row.patent_date].cpcDict.push(cpcObj);
                                }
                                else if(dict[row.patent_date].cpcDict.find(item => item.cpc_section_id === (row.cpcs[i].cpc_section_id)) != null){
                                    //within dictionary
                                    const elem = dict[row.patent_date].cpcDict.find(item => item.cpc_section_id === (row.cpcs[i].cpc_section_id));
                                    const count = elem.cpc_count;
                                    const updated_count = count + 1;
                                    const cpcObj = {};
                                    cpcObj.cpc_section_id = elem.cpc_section_id;
                                    cpcObj.cpc_count = updated_count;
                                    //remove from dict
                                    const index = dict[row.patent_date].cpcDict.indexOf(elem);
                                    if(index > -1){
                                        dict[row.patent_date].cpcDict.splice(index,1);
                                    }
                                    //add to dict
                                    dict[row.patent_date].cpcDict.push(cpcObj);
                                }
                                else{
                                    const cpcObj = {};
                                    cpcObj.cpc_section_id = row.cpcs[i].cpc_section_id;
                                    cpcObj.cpc_count = 1;                          
                                    //add to dict
                                    dict[row.patent_date].cpcDict.push(cpcObj);
                                }
                                break;
                            }
                        }
                    }
                    else{
                        //new key
                        const new_obj = {};
                        new_obj.count = 1;
                        
                        new_obj.cpcDict = []; 
                        
                        row.cpcs.map(function(row2,r2){
                            const cpcObj = {};
                            cpcObj.cpc_section_id = row2.cpc_section_id;
                            cpcObj.cpc_count = 1;
                            new_obj.cpcDict.push(cpcObj);
                        })
                       
                        dict[row.patent_date] = new_obj;
                    }
                })
                return dispatch(setAppPatent(dict));
            })       
        })
    }
}