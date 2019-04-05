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
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import { element } from "prop-types";


import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
// core components
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";

import axios from 'axios'

function Transition(props) {
  return <Slide direction="down" {...props} />;
}



class adminUniversity extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            table : [ ],
             search: null,
             classicModal: false,
             cnic:"",
              name: "",
              fathername: "",
              email:"",
              address:"",
              mobile:"",
              city:"",
              matric:"",
              inter:"",
              regex:"",
              dep:""

        };

      }

      checkFunction = async () =>{
        try{
        let res = await axios.get('http://localhost:3001/api/Student', {withCredentials: true})
        
        let deg = await axios.get('http://localhost:3001/api/Degree', {withCredentials: true})
        
         let test = res.data.map( uni =>{

           let arr = [];
               arr.push(uni.cnic);
               arr.push(uni.name);
               arr.push(uni.email);
               arr.push(uni.mobile);
               let uniName = uni.department.split('#')
               arr.push(uniName[1])
let flag=true;
               deg.data.forEach(ele => {

                let std = ele.student.split('#')
                    if(std[1] === uni.StudentId && flag)
                        {
                          arr.push(ele.status)
                          flag=false;

                        }
               })
if(flag)
      arr.push("Degree Not Issued")


      arr.push(true)
    return arr;     
    })


    this.setState({
      table:test,
    })
      
        } catch (err) {
          return Promise.reject(err);
        }
      }

      
      async  componentDidMount(){
          this.checkFunction();
      }


      handleClick = () =>{

        alert("agya")

      }

    
      handleChange = async (e) => {
        var code = e.keyCode || e.which;
        
        var reg = /^[0-9]{13}$/;

        if(e.target.value.length > 13)
            e.target.value = e.target.value.slice(0,13)
        if(code === 13 || e.target.value.length === 13){
          
          if(reg.test(e.target.value) ){

            let date = new Date();
            let obj={
  "$class": "org.example.mynetwork.Request_Nadra",
  "cnic": e.target.value,
  "transactionId": "",
  "timestamp": date.toISOString()
            }

            let obj1={
              "$class": "org.example.mynetwork.Request_IBCC",
              "cnic": e.target.value,
              "transactionId": "",
              "timestamp": date.toISOString()
                        }
            let nadra = await axios.post('http://localhost:3000/api/Request_Nadra',obj, {withCredentials: true})
            let ibcc   = await axios.post('http://localhost:3000/api/Request_IBCC',obj1, {withCredentials: true})
          

            this.setState({
              cnic:obj.cnic,
              name:nadra.data.name,
              fathername: nadra.data.Father_name,
                          email:nadra.data.email,
                          address:nadra.data.Address,
                          mobile:nadra.data.mobile,
                          city:nadra.data.city,
                          matric:ibcc.data.matric,
                          inter:ibcc.data.inter,
                          regex:""
            })


        }
          else{

            this.setState({
              regex:"CNIC format is not correct",
              name: "",
              fathername: "",
              email:"",
              address:"",
              mobile:"",
              city:"",
              matric:"",
              inter:"",
            })


          }
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
      obj.name= "";
      obj.fathername= "";
      obj.email="";
      obj.address="";
      obj.mobile="";
      obj.city="";
      obj.matric="";
      obj.inter="";
      obj.regex="";
       this.setState(obj);
 
    }
    add = () =>{
      let date = new Date()

      let obj = {
        "$class": "org.example.mynetwork.Add_Student",
        "cnic": this.state.cnic,
        "name": this.state.name,
        "Father_name": this.state.fathername,
        "Address": this.state.address,
        "email": this.state.email,
        "mobile": this.state.mobile,
        "city": this.state.city,
        "matric": this.state.matric,
        "inter": this.state.inter,
        "department": "org.example.mynetwork.Department#"+this.state.dep,
        "transactionId": "",
        "timestamp": date.toISOString()
      }
     
      return axios.post('http://localhost:3001/api/Add_Student',obj,{withCredentials:true})
      .then(res =>{
      
        this.handleClose();
        console.log(res)
                     
             let obj = {
               id: this.state.cnic,
               type: 'Student'
             }
       return axios.post('http://zohaib:2002/user',obj)
       })
       .then(res=>{
         this.checkFunction();
       })
      .catch(error => {
       console.log(error)
       alert("Something Bad Happened")
      })


    }

    handleDep = (e) =>{
      this.setState({
        dep:e.target.value
      })
    }

render(){
  const { classes } = this.props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info" >
            <h4 style={{display:"inline"}} className={classes.cardTitleWhite}>STUDENTS  <Button className={classes.button} onClick={this.handleClickOpen} >Add Student</Button>
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
                      <h4 className={classes.modalTitle} >Add Student</h4>
                    </DialogTitle>
                    
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >

                    <GridContainer>
                 
                  <GridItem xs={12} sm={12} md={7}>
                    <CustomInput
                      labelText="CNIC"
                      id="cnic"
                      formControlProps={{
                        fullWidth: true,
                        required:true
                      }}
                      inputProps={{ 
                        onKeyUp: (event) => this.handleChange(event),
                        placeholder:"3520212345678",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                
                      id="regex"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.regex,
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                    
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.name,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Fathername"
                      id="fathername"
                     
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.fathername,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email address"
                      id="emailaddress"
                    
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.email,
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>


                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.address,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.city,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Mobile"
                      id="mobile"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.mobile,
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Matric Percentage"
                      id="matric"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.matric,
                        disabled: true
                      }}
                    />
                  </GridItem>
                 
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Inter Percentage"
                      id="inter"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value:this.state.inter,
                        disabled: true
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Department"
                      id="inter"
                      formControlProps={{
                        fullWidth: true,
                        required:true
                      }}
                      inputProps={{
                        onChange: (event) => this.handleDep(event),
                        value:this.state.dep,
                      }}
                    />
                  </GridItem>

                </GridContainer>



                    </DialogContent>

                    <DialogActions className={classes.modalFooter}>
                      <Button onClick={this.add} style={{color:"white", backgroundColor:"green"}} simple>
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
              tableHead={["CNIC", "Name", "Email", "Mobile", "Department", "Degree Status"]}
              tableData={ this.state.table.map(row => { return row[6] === true ? row.slice(0,6):[]})  }

            />
          </CardBody>
        </Card>
      </GridItem>
      
          </GridContainer>
  );
}
}

export default withStyles(javascriptStyles)(adminUniversity);
