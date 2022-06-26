import {Route, Switch} from "react-router-dom";
import Home from "../Home";
import FormContact from "../FormContact";
import ListContact from "../ListContact";

export default function RouterComponent(){
    return (
        <Switch>
            <Route exact={true} path="/">
                <Home />
            </Route>
            <Route path="/form">
                <FormContact />
            </Route>
            <Route path="/contact">
                <ListContact />
            </Route>
        </Switch>
    );
}