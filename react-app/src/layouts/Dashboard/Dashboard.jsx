/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect ,withRouter} from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-4.jpg";
import logo from "assets/img/reactlogo.png";

let Routes = dashboardRoutes;
const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      detail: "HEC"
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
   
    if(this.props.location.state){
      
    let res = this.props.location.state.detail.participant.split('#');

    let type = res[0].split('.');

      this.setState({ detail:  "   "+ type[3]});


      if(type[3] === "Hec"){
        Routes = dashboardRoutes.filter((route)=> {
          return route.path.includes('/admin/')
        });
        // console.log(dashboardRoutes[0].path)
       }
      else if(type[3] === "University"){
        Routes = dashboardRoutes.filter((route)=> {
          return route.path.includes('/uni/')
        });
        // console.log(dashboardRoutes[0].path)
       }
      else if(type[3] === "Registrar"){
        Routes = dashboardRoutes.filter((route)=> {
          return route.path.includes('/registrar/')
        });
        // console.log(dashboardRoutes[0].path)
       }
      else if(type[3] === "Dean"){
        Routes = dashboardRoutes.filter((route)=> {
          return route.path.includes('/dean/')
        });
        // console.log(dashboardRoutes[0].path)
       }
       else if(type[3] === "Issuer"){
        Routes = dashboardRoutes.filter((route)=> {
          return route.path.includes('/issuer/')
        });
        // console.log(dashboardRoutes[0].path)
       }
       else if (type[3] === "Student"){
        Routes = dashboardRoutes.filter((route)=> {
          return route.path.includes('/std/')
        });
        // console.log(dashboardRoutes[0].path)
       }
 
    }
    else{
      this.props.history.push('/home')
    }

  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={Routes}
          logoText={this.state.detail}
          
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={Routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter( withStyles(dashboardStyle)(App));
