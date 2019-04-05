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

import axios from 'axios'


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
          table : [ ],
           search: ""
        };
      }

       componentDidMount(){

        return axios.get('http://localhost:3001/api/Degree', {withCredentials: true})
        .then( res =>{
         let test = res.data.map(async uni =>{

           let arr = [];
              
           let std = uni.student.split('#')
                          
            let awae  = await axios.get('http://localhost:3000/api/Student/'+ std[1], {withCredentials: true})

    let depa = awae.data.department.split('#')
           arr.push(depa[1]); 
           arr.push(std[1])
               arr.push(uni.status);
               let iss = uni.issuer.split('#')
               arr.push(iss[1])
               arr.push(uni.issued_Date);
              arr.push(true)
               //  let uniName = uni.university.split('#')
              //  arr.push(uniName[1])

               
               this.setState({
                 table:[...this.state.table,arr],
               })
         })
       })
      }

      handleClick = () =>{

        alert("agya")

      }

      search = () =>{

        let table =  this.state.table.map(row => {
             if(row.includes(this.state.search)){
               row[5]=true
             }
             else
               row[5]=false
           
         return row;
             })

             this.setState({
               table:table
             })

             
     }
     handleChange = (e) => {
      var code = e.keyCode || e.which;
      
  
      if(code === 13){
        if(e.target.value !== "")
        this.search()  
      
      }
      else{
      this.setState({
        search: e.target.value
    })
  
  }

    }

render(){
  const { classes } = this.props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info" >
            <h4 style={{display:"inline"}} className={classes.cardTitleWhite}>DEGREE'S STATUS </h4>
            
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="info"
              tableHead={[  "Department", "Student", "Status", "Issuer" , "Date"]}
              tableData={ this.state.table.map(row => { return row[5] === true ? row.slice(0,5):[]})  }

            />
          </CardBody>
        </Card>
      </GridItem>
      
          </GridContainer>
  );
}
}

export default withStyles(headerLinksStyle)(adminUniversity);
