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
import { element } from "prop-types";
import axios from "axios";


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
              
             ],
              classicModal: false,
              id:"",
              name:"",
              email:"",
              landline:"",
              $class: "org.example.mynetwork.Add_",
              person: "",
              dep:"",
              reload:false

        };
      }

      async componentDidMount(){

        let dep =  await axios.get('http://localhost:3001/api/Department', {withCredentials: true})
        let dean =   await axios.get('http://localhost:3001/api/Dean', {withCredentials: true})
        let issuer = await axios.get('http://localhost:3001/api/Issuer', {withCredentials: true})

        dep.data.map(d => {
          let arr = [];
              arr.push(d.name)
              let Dean = dean.data.filter(dea => {
                   let ret = dea.department.split('#')
                    return ret[1] === d.DepartmentId

                  })
                  if(Dean.length === 0)
                    arr.push(false)
                  else{
                    let a =[]
                    a.push(Dean[0].name)
                    a.push(<br/>)
                    a.push(Dean[0].email)
                    a.push(<br/>)
                    a.push(Dean[0].landline)
                  arr.push(a)
                  }
              let Issuer = issuer.data.filter(iss =>{
                    let ret = iss.department.split('#')
                    return ret[1] === d.DepartmentId

                  })
                  if(Issuer.length === 0)
                  arr.push(false)
                else{
                  let a =[]
                  a.push(Issuer[0].name)
                  a.push(<br/>)
                  a.push(Issuer[0].email)
                  a.push(<br/>)
                  a.push(Issuer[0].landline)
                  arr.push(a)
                }

                this.setState({
                  table: [...this.state.table, arr]
                })

        })

        let test = []
        this.state.table.forEach(element => {

          if(element[1] === false)
            {
              element[1] = <Button style={{color:"white", backgroundColor:"green",float:"left"}} id={element[0]}  onClick={(e) => {this.handleClickOpen(e,"Dean")}} >Add Dean</Button>
            }
            else{
              element[1] = <b>{element[1]}</b>
            }
          
            if(element[2] === false)
            {
              element[2] = <Button style={{color:"white", backgroundColor:"green",float:"left"}} id={element[0]}  onClick={(e)=>{this.handleClickOpen(e, "Issuer")}} >Add Issuer</Button>
            }
            else{
              element[2] = <b>{element[2]}</b>
            }
          
            

            test.push(element)
        })

        this.setState({
            table:test
        })
      
      }
      handleClickOpen = (e, person) =>  {

        // department name blockchain ko table se send kruhga

        let obj = [...this.state]
        obj.classicModal = true;
        obj.person = person;
        obj.dep= e.currentTarget.id;
         this.setState(obj);
   
       }
   
       handleClose = () =>{
         let obj = [...this.state]
         obj.classicModal = false;
         obj.id="",
         obj.name="",
         obj.email="",
         obj.landline=""
   
         this.setState(obj);
    
       }

      handleClick = (e, p) =>{

        let date = new Date();
        let obj = {
          $class       : `org.example.mynetwork.Add_${p}`,
          name         : this.state.name,
          email        : this.state.email,
          landline    : this.state.landline,
          transactionId: "",
          department    : "org.example.mynetwork.Department#"+this.state.dep,
          timestamp    :  date.toISOString()
         }

        return axios.post('http://localhost:3001/api/Add_'+this.state.person, obj ,{withCredentials: true} )
             .then(res =>{
              

               return axios.get('http://localhost:3001/api/system/ping', {withCredentials: true})
              })
             .then( res =>{
               
              let uni = res.data.participant.split('#');

              let id = this.state.person.toLowerCase()+this.state.dep+uni[1]

                     
                    let obj = {
                      id,
                      type: this.state.person
                    }


              return axios.post('http://zohaib:2002/user',obj)
              })
              .then(res=>{
                
              


        let test = []
        this.state.table.forEach(element => {
          let a =[]
          a.push(this.state.name)
          a.push(<br/>)
          a.push(this.state.email)
          a.push(<br/>)
          a.push(this.state.landline)
         // console.log(a)
          if(element[0] === this.state.dep && this.state.person === "Issuer")
            {
              element[2] = <b>{a}</b>
            }
          
            else if(element[0] === this.state.dep && this.state.person === "Dean")
            {
              element[1] =  <b>{a}</b>
            }
            

            test.push(element)
        })

        this.setState({
            table:test
        })

          this.handleClose();

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
            <h4 className={classes.cardTitleWhite}>DEPARTMENTS 
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
                      <h4 className={classes.modalTitle} >{"Add " + this.state.person}</h4>
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
                        fullWidth: true
                        ,required: true
                      }}
                      inputProps={{
                        onChange: (event) => this.handleChange(event, 'name'),
                        value: this.state.name
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
                   labelText="Email address"
                      id="email-address"
                     formControlProps={{
                       fullWidth: true
                       ,required: true
                     }}
                     inputProps={{
                        onChange: (event) => this.handleChange(event, 'email'),
                        value: this.state.email
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
                   labelText="Landline"
                      id="landline"
                     formControlProps={{
                       fullWidth: true
                       ,required: true
                     }}
                     inputProps={{
                        onChange: (event) => this.handleChange(event, 'landline'),
                        value: this.state.landline
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
                      <Button style={{color:"white", backgroundColor:"green"}} simple="true" onClick={e => this.handleClick(e, this.state.person)} >
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
              tableHead={[ "Name", "Dean", "Issuer"]}
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
