import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPatent } from "../../selectors";
import { loadPatentData } from "../../thunks/load-data";
import PatentStackedChart from '../components/patent-stacked-chart';

import styles from './patent.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { fontWeight } from '@mui/system';


export default function Patents() {
    const dispatch = useDispatch();
    const patent = useSelector(getPatent);
    const queryParams = new URLSearchParams(window.location.search);
    // eslint-disable-next-line camelcase
    const assignee_id = queryParams.get('assignee_id');
    useEffect(() => {
        dispatch(loadPatentData(assignee_id));
    }, []);

    if (patent !== null) {
        return (
            <div>
                <h3 style={{paddingLeft: 50, fontSize: 25}}>Patent data for {patent.organization}  <span style={{paddingLeft:5, fontWeight:"normal", fontSize:14}}><a style={{textDecorationLine:"none"}} href='/'> Return to Home Page</a></span></h3>
                <PatentStackedChart data={patent}/>
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

