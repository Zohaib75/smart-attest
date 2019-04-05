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

import CustomInput from "components/CustomInput/CustomInput.jsx";

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
            table : [
             ],
             classicModal: false,
             id:"",
             name:"",
             email:"",
             category:"",
             sector:"",
             landline:"",
             city:"",
             $class: "org.example.mynetwork.University",
             first: true

        };
      }

  
    handleClickOpen = () =>  {
     let obj = [...this.state]
     obj.classicModal = true;
      this.setState(obj);

    }

    handleClose = () =>{
      let obj = [...this.state]
      obj.id="",
      obj.name="",
      obj.email="",
      obj.category="",
      obj.sector="",
      obj.landline="",
      obj.city="",
      
      obj.classicModal = false;
       this.setState(obj);
 
    }
      componentDidMount(){

        if(this.state.first){
       return axios.get('http://localhost:3001/api/University', {withCredentials: true})
           .then( res =>{
            let test = res.data.map( uni =>{

              let arr = [];
                  arr.push(uni.UniversityId);
                  arr.push(uni.name);
                  arr.push(uni.email);
                  arr.push(uni.category);
                  arr.push(uni.sector);
                  arr.push(uni.landline);
                  arr.push(uni.city);
                  
                  this.setState({
                    table:[...this.state.table,arr],
                  })
            })

            this.setState({
              first:false
            })
            console.log(this.state.first)
          })
        }


      } 

      handleClick = () =>{

          let obj = {
            $class       : this.state.$class,
            UniversityId : this.state.id,
            name         : this.state.name,
            email        : this.state.email,
            category     : this.state.category,
            sector      : this.state.sector,
            landline    : this.state.landline,
            city        : this.state.city,
          }

    
        

          return axios.post('http://localhost:3001/api/University', obj ,{withCredentials: true} )
               .then(res =>{
                
                 this.handleClose();

                 return axios.get('http://localhost:3001/api/University/'+res.data.UniversityId, {withCredentials: true})
               })
               .then( res =>{
                console.log(res)
    
                  let uni = res.data;
                  let arr = [];
                      arr.push(uni.UniversityId);
                      arr.push(uni.name);
                      arr.push(uni.email);
                      arr.push(uni.category);
                      arr.push(uni.sector);
                      arr.push(uni.landline);
                      arr.push(uni.city);
                      
                      this.setState({
                        table:[...this.state.table,arr]
                      })

                       
                      let obj = {
                        id: uni.UniversityId,
                        type: 'University'
                      }
                return axios.post('http://zohaib:2002/user',obj)
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
            <h4 className={classes.cardTitleWhite}>UNIVERSITIES <Button className={classes.button} onClick={this.handleClickOpen} >Add University</Button>
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
                      <h4 className={classes.modalTitle} >Add University</h4>
                    </DialogTitle>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >

                    <GridContainer>
                  <GridItem xs={12} sm={12} md={7}>
                    <CustomInput
                      labelText="UniID"
                      id="id"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        onChange: (event) => this.handleChange(event, 'id'),
                        value: this.state.id
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
                      labelText="Name"
                      id="uni"
                      formControlProps={{
                        fullWidth: true,
                        required: true
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
                       fullWidth: true,
                        required: true,
                        type:"email"
                     }}
                     inputProps={{
                      onChange: (event) => this.handleChange(event, 'email'),
                        value: this.state.email,
                        type:"email"
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
                   labelText="Category"
                      id="category"
                     formControlProps={{
                       fullWidth: true,
                        required: true
                     }}

                     inputProps={{
                      onChange: (event) => this.handleChange(event, 'category'),
                        value: this.state.category
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
                   labelText="Sector"
                      id="sector"
                     formControlProps={{
                       fullWidth: true,
                        required: true
                     }}

                     inputProps={{
                      onChange: (event) => this.handleChange(event, 'sector'),
                        value: this.state.sector
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
                   labelText="City"
                      id="city"
                     formControlProps={{
                       fullWidth: true,
                        required: true
                     }}

                     inputProps={{
                      onChange: (event) => this.handleChange(event, 'city'),
                        value: this.state.city
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
                       fullWidth: true,
                        required: true
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
                      <Button style={{color:"white", backgroundColor:"green"}} simple="true" onClick={this.handleClick} >
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
              tableHead={["UniversityId", "Name", "Email", "Category", "Sector", "Landline", "City"]}
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
