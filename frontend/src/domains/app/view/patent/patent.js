import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPatent } from "../../selectors";
import { loadPatentData } from "../../thunks/load-data";

import styles from './patent.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


export default function Patent() {
    const dispatch = useDispatch();
    const patent = useSelector(getPatent);
    const queryParams = new URLSearchParams(window.location.search);
    // eslint-disable-next-line camelcase
    const patent_id = queryParams.get('patent_id');
    useEffect(() => {
        dispatch(loadPatentData(patent_id));
    }, []);

    if (patent !== null) {
        const linkToClaims = "/";
        return (
            <div>
                
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

