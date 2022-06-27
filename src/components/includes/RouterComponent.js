import {Route, Switch} from "react-router-dom";
import Home from "../Home";
import FormContact from "../FormContact";
import ListContact from "../ListContact";
import UpdateContact from "../UpdateContact";

export default function RouterComponent(){
    return (
        <Switch>
            <Route exact={true} path="/">
                <Home />
            </Route>
            <Route path="/form">
                <FormContact />
            </Route>
            <Route exact={true} path="/contact">
                <ListContact />
            </Route>
            <Route path="/contact/update/:ID">
                <UpdateContact />
            </Route>
        </Switch>
    );
}