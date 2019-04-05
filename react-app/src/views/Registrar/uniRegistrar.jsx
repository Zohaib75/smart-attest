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

        };
      }

  
    handleClickOpen = () =>  {
     let obj = [...this.state]
     obj.classicModal = true;
      this.setState(obj);

    }

    handleClose = () =>{
      let obj = [...this.state]
      obj.classicModal = false;
       this.setState(obj);
 
    }
      componentDidMount(){

        let test = ["alialai", "registrar@ucp.edu.pk", "0423338712"]
      
      
        this.setState({
            table:[...this.state.table,test]
        })
      }

      handleClick = () =>{

        alert("agya")

      }

render(){
  const { classes } = this.props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info" >
            <h4 className={classes.cardTitleWhite}>REGISTRAR <Button className={classes.button} onClick={this.handleClickOpen} >Add Registrar</Button>
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
                      <h4 className={classes.modalTitle} >Add Registrar</h4>
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
                      <Button style={{color:"white", backgroundColor:"green"}} simple>
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
              tableHead={["Name", "Email", "Landline"]}
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
