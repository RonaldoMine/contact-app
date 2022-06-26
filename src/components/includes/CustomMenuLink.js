import {Link, useRouteMatch} from "react-router-dom";
import makeStyles from "@material-ui/styles/makeStyles";
import '../../styles/CustomMenuLink.css'
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    link: {
        color: "#fff",
    },
});
export function CustomMenuLink({ name, to, active}) {
    const classes = useStyles();

    let match = useRouteMatch({
        path: to,
        exact: active
    });

    return (
        <Typography  className={ match && "active"}>
            <Link className={classes.link} to={ to }>
                { name }
            </Link>
        </Typography >
    )
}