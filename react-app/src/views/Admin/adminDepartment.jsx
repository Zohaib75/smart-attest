import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Button } from "@material-ui/core";

import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import Slide from "@material-ui/core/Slide";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import axios from 'axios' 

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const styles = {
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
  },

};

class adminUniversity extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            table : [
             ]
             , classicModal: false,
             id:"",
             name:"",
             uni: "",
             $class: "org.example.mynetwork.Add_Department",
             first: true

        };
      }

      componentDidMount(){

        
        if(this.state.first){
          return axios.get('http://localhost:3001/api/Department', {withCredentials: true})
              .then( res =>{
               let test = res.data.map( uni =>{
   
                 let arr = [];
                     arr.push(uni.DepartmentId);
                     arr.push(uni.name);
                     let uniName = uni.university.split('#')
                     arr.push(uniName[1])

                     this.setState({
                       table:[...this.state.table,arr]
                     })
               })
               this.setState({
                 first:false
               })
             })
           }
   
      }
      handleClickOpen = () =>  {
        let obj = [...this.state]
        obj.classicModal = true;
         this.setState(obj);
   
       }
   
       handleClose = () =>{
         let obj = [...this.state]
         obj.classicModal = false;
         obj.id="",
         obj.name="",
         obj.uni="",
         this.setState(obj);
       }

      handleClick = () =>{
        let date = new Date();

        let obj = {
          $class :     this.state.$class,
          name         : this.state.name,
          university   : "org.example.mynetwork.University#"+this.state.uni,
          transactionId: "",
          timestamp    :  date.toISOString()
        }
        return axios.post('http://localhost:3001/api/Add_Department', obj ,{withCredentials: true} )
             .then(res =>{
                let dep = res.data.name+this.state.uni;
                this.handleClose();
                return axios.get('http://localhost:3001/api/Department/'+dep, {withCredentials: true})
             })
             .then( res =>{
              console.log(res)
  
                let uni = res.data;
                let arr = [];
                arr.push(uni.DepartmentId);
                arr.push(uni.name);
                let uniName = uni.university.split('#')
                arr.push(uniName[1])

                    this.setState({
                      table:[...this.state.table,arr]
                    })
              })
             .catch(error => {
                
                console.log(error.response.data)
                let a = error.response.data.error.message.split('Error: ');
                if(typeof( a[5]) !== 'undefined')
                  alert(a[5]);
                else
                  alert("Error.")
              })
      }


      handleChange = (e, inputName)=>{
      
        this.setState({[inputName]: e.target.value})
      
      }


render(){
  const { classes } = this.props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info" >
            <h4 className={classes.cardTitleWhite}>DEPARTMENTS <Button style={{color:"white", backgroundColor:"#ef5350",float:"right"}} onClick={this.handleClickOpen} >Add department</Button>
                  </h4>
            
          </CardHeader>
          <GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={4}>
  
                  <Dialog
                    classes={{
                      root: classes.center,
                      paper: classes.modal
                    }}
                    open={this.state.classicModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose()}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                  >
                    <DialogTitle
                      id="classic-modal-slide-title"
                      disableTypography
                      className={classes.modalHeader}
                      color="info"
                    >
                      <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="info"
                        onClick={() => this.handleClose()}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>
                      <h4 className={classes.modalTitle} >Add Department</h4>
                    </DialogTitle>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >

                    <GridContainer>
                 
                  <GridItem xs={12} sm={12} md={7}>
                    <CustomInput
                      labelText="Name"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        onChange: (event) => this.handleChange(event, 'name'),
                        value: this.state.name,
                        required: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>


                <GridContainer>
                 
                 <GridItem xs={12} sm={12} md={7}>
                   <CustomInput
                   labelText="Univesity"
                      id="university"
                     formControlProps={{
                       fullWidth: true,
                        required: true
                     }}
                     inputProps={{
                        onChange: (event) => this.handleChange(event, 'uni'),
                        value: this.state.uni,
                        required: "true"
                      }}
                   />
                 </GridItem>
                 <GridItem xs={12} sm={12} md={5}>
                   <CustomInput
                     id="company-disabled"
                     formControlProps={{
                       fullWidth: true
                     }}
                     inputProps={{
                       disabled: true
                     }}
                   />
                 </GridItem>
               </GridContainer>
               

                    </DialogContent>

                    <DialogActions className={classes.modalFooter}>
                      <Button style={{color:"white", backgroundColor:"green"}} simple="true"  onClick={this.handleClick}>
                        Add
                      </Button>
                      <Button
                        onClick={() => this.handleClose()}
                        style={{color:"white", backgroundColor:"red"}}
                        simple
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </GridItem>
              </GridContainer>


          <CardBody>
            <Table
              tableHeaderColor="info"
              tableHead={["DepartmentId", "Name", "University"]}
              tableData={this.state.table}

            />
          </CardBody>
        </Card>
      </GridItem>
      
          </GridContainer>
  );
}
}

export default withStyles(javascriptStyles)(adminUniversity);
