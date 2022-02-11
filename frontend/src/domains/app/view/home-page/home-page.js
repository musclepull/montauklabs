import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../../thunks/load-data";
import { getAppPatents } from "../../selectors";
import PatentsTable from '../components/patents-table';

export default function HomePage() {
    const dispatch = useDispatch();
    const patents = useSelector(getAppPatents) || {}; //access patents data from store
    //componentdidmount-ish

    useEffect(() => {
        dispatch(loadData());
    }, []);

    if (Object.keys(patents).length !== 0) {
        const patents_list = patents.line_items ? patents.line_items : null;
        return (
            <div>
             <PatentsTable data={patents_list}/>
            </div>
        );
    }
    else {
        return (
            <div>
            </div>
        );
    }
}