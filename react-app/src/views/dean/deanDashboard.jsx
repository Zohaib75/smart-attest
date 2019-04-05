/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = {
  cardAction: {
      display: 'block',
      textAlign: 'initial'
    }
,  
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class adminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false
    };
  }
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  handleClick = () => {

    alert("agya")

  }

  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>Notifications</h4>
          <p className={classes.cardTitleWhite}>
            For the Approved Degree's
          </p>  
        </CardHeader>
        <CardBody>
          <GridContainer>
            
            <GridItem md={12} md={12} md={16}>
            <ButtonBase
          className={classes.cardAction}
          onClick={this.handleClick}>
              <SnackbarContent 
                message={
                  'DEGREE - STATUS HAS BEEN APPROVED'
                }
               
                color="danger"
                icon={AddAlert}
              />
              </ButtonBase>

            </GridItem>
          
          </GridContainer>
          <br />
          <br />
          
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(styles)(adminDashboard);
