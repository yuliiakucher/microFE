import React, {lazy, Suspense, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createGenerateClassName, StylesProvider} from "@material-ui/core";
import Header from "./components/Header";
import Progress from "./components/Progress";

const AuthApp = lazy(() => import('./components/AuthApp'));
const MarketingApp = lazy(() => import('./components/MarketingApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

function App() {

    const [isUserSignedIn, setUserSignedIn] = useState(false);

    console.log(isUserSignedIn)

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setUserSignedIn(false)} signedIn={isUserSignedIn}/>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthApp onSignIn={() => setUserSignedIn(true)}/>
                            </Route>
                            <Route path='/' component={MarketingApp}/>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>

        </BrowserRouter>
    )
}

export default App