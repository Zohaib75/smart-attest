import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg/blockchain2.png";

import { withRouter} from 'react-router-dom'
import axios from 'axios'


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      type: null
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    // setTimeout(
    //   function() {
    //     this.setState({ cardAnimaton: "" });
    //   }.bind(this),
    //   700
    // );
  }

  handleSubmit = (e) => {


   // console.log(e.target.elements["pass"].value)
    e.preventDefault();
    let secret = e.target.elements["pass"].value;
    e.target.elements["pass"].value = "";

    axios.get('http://localhost:2002/secret?secret=' + secret)
          .then(res => {
        
          let id = res.data.id
          let type = res.data.type
          
          return  axios.get(`http://localhost:3000/api/${type}/${id}`)
          })
          .then((response) => {

            console.log(response)
            let type = response.data.$class.split('.');
            let id   = type[3]+'Id';

            if(type[3] === "Registrar" || type[3] === "Dean" || type[3] === "Issuer"  )
              id = "EmployeeId"

            let final;
            switch(type[3]){

            case 'Hec':
                  final = 'admin';
                  break;
            case 'University':
                  final = 'uni';
                  break;
            case 'Registrar':
                  final = 'registrar';
                  break;
            case 'Dean':
                  final = 'dean';
                  break;
            case 'Issuer':
                  final = 'issuer';
                  break;
            case 'Student':
                  final = 'std';
                  break;
            }
            this.setState({
              type:final
            })
            

                const identity = {
                participant: response.data.$class + '#' + response.data[id],
                userID:  response.data[id],
                options: {}
              };
              console.log(identity)
             return  axios.post('http://localhost:3000/api/system/identities/issue', identity, {responseType: 'blob'});
            })
          .then((cardData) => {
            console.log('CARD-DATA', cardData.data);
              const file = new File([cardData.data], 'myCard.card', {type: 'application/octet-stream', lastModified: Date.now()});
      
              const formData = new FormData();
              formData.append('card', file);
              console.log(file)
              console.log(formData)

              // const headers = new HttpHeaders();
              // headers.set('Content-Type', 'multipart/form-data');

              var headers = {
                'Content-Type': 'multipart/form-data'
            }

              return axios.post('http://localhost:3001/api/wallet/import', formData, {
                withCredentials: true,
                headers
              });
            })
          .then((response)=>{
            if(response.status === 204)
              return  axios.get('http://localhost:3001/api/system/ping', {withCredentials: true})
                
          })
          .then( response => {
            console.log(response)

            if(response.status === 200){
            let path = '/' + this.state.type + '/dashboard';
            this.props.history.push({
            pathname: path,
            search: '?query=abc',
            state: { detail: response.data }})

                }

           })
          .catch(error => {
            alert("Error occurred...")
            console.log(error);
          });

  } 

  render() {
    const { classes, ...rest } = this.props;
    return (  
      <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem lg={6} md={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form  onSubmit = { this.handleSubmit} >
                    <CardHeader color="info" className={classes.cardHeader}>
                      <h4>Enter your Secret Key</h4>
                    </CardHeader>
                    <CardBody>
                
                    <CustomInput
                        labelText="Secret Key"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                      
                    </CardBody>

                    <CardFooter className={classes.cardFooter}>
                      <Button type="submit" simple color="info" size="lg" >
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
    );
  }
}

export default withRouter( withStyles(loginPageStyle)(LoginPage));
