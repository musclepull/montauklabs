const SET_APP_PATENTS = 'app/SET_APP_PATENTS';
const MANAGE_PATENT = 'app/MANAGE_PATENT';

const appInitialState = {
    patents: null,
    patent: null
};

//banker

//receives action that consists of type and payload: 


export default function appReducer(state = appInitialState, { payload, type, row } = {}) {
    switch (type) {
        case SET_APP_PATENTS:
            return { ...state, patents: payload };
        case MANAGE_PATENT: {
            var list = [];
            var completeObj = {};
            var r = 1;
            var c = 1;

            completeObj.name = "Bella";
            completeObj.birthday = "06/16/2018";
            completeObj.weight = "16";

            payload.data.data.map(obj => {
                var modifiedUtilization = {};
                modifiedUtilization.claim_line_item_type = obj.claim_line_item_type;
                modifiedUtilization.id = obj.id;
                modifiedUtilization.row_id = "row_" + r;
                modifiedUtilization.col_id = "col_" + r;
                modifiedUtilization.quantity = obj.utilized;
                modifiedUtilization.total = obj.total;
                modifiedUtilization.remaining = obj.total - obj.utilized;
                list.push(modifiedUtilization);
                r++;
                c++;     
            })            

            completeObj.utilObj = list

            return { ...state, modifiedUtilization: completeObj }
        }
        default:
            return state;
    }
}

export function setAppPatents(payload) {
    return {
        row: {},
        type: SET_APP_PATENTS,
        payload,
    };
}

export function setAppPatent(payload){ 
    return{
        type: MANAGE_PATENT,
        payload,
    }
}
