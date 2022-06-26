import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import banner from "../assets/img/banner.jpg";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  link: {
    color: "#fff",
    marginLeft: 15,
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia component="img" image={banner} title="Welcom Banner" />
    </Card>
  );
}
