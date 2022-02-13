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
            return { ...state, patent: payload };
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
