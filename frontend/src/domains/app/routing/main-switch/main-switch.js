import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from "../../view/home-page/home-page";
import Patent from "../../view/patent/patent";

function MainSwitch() {
    return (
        <Router>
            <Switch>
                <Route exact path = "/">
                    <HomePage/>
                </Route>
                <Route exact path = "/patents">
                    <Patent/>
                </Route>
            </Switch>
        </Router>

    );
}

export default MainSwitch;
