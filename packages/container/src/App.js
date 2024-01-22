import React, {lazy, Suspense, useState, useEffect} from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {createGenerateClassName, StylesProvider} from "@material-ui/core";
import {createBrowserHistory} from 'history';
import Header from "./components/Header";
import Progress from "./components/Progress";

const AuthApp = lazy(() => import('./components/AuthApp'));
const MarketingApp = lazy(() => import('./components/MarketingApp'));
const DashboardApp = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

function App() {

    const [isUserSignedIn, setUserSignedIn] = useState(false);

    useEffect(() => {
        if(isUserSignedIn) {
            history.push('/dashboard');
        }
    }, [isUserSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setUserSignedIn(false)} signedIn={isUserSignedIn}/>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthApp onSignIn={() => setUserSignedIn(true)}/>
                            </Route>
                            <Route path='/dashboard' >
                                {!isUserSignedIn && <Redirect to={'/'} />}
                                <DashboardApp/>
                            </Route>
                            <Route path='/' component={MarketingApp}/>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    )
}

export default App