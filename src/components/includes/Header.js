import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "../../styles/Header.css";
import {CustomMenuLink} from "./CustomMenuLink";

export default function Headers() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <CustomMenuLink name="Accueil" to="/" active={true}/>
        <CustomMenuLink name="Formulaire de contact" to="/form"/>
        <CustomMenuLink name="Liste de contact" to="/contact" active={true}/>
      </Toolbar>
    </AppBar>
  );
}
