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


class adminUniversity extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            table : [ ],
             search: ""
        };
      }

      async componentDidMount(){

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
               this.setState({
                 table:[...this.state.table,arr],
               })
         })
      

      }

      handleClick = () =>{

        alert("agya")

      }

      search = () =>{

         let table =  this.state.table.map(row => {
              if(row.includes(this.state.search)){
                row[6]=true
              }
              else
                row[6]=false
            
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
            <h4 style={{display:"inline"}} className={classes.cardTitleWhite}>STUDENTS </h4>
            <div id="divSearch" style={{  float:"right"}} className={classes.searchWrapper}>
          <CustomInput 
            formControlProps={{
              className: classes.margin + " " + classes.search 
            }}
            inputProps={{
              onKeyUp: (event) => this.handleChange(event),
              id:"input",
              type:"string",
              className: classes.label + " " + classes.underline,
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search",
              },
            }}

          />
          <Button onClick={this.search} style={{color:"white"}} color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
                 
          </CardHeader>
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

export default withStyles(headerLinksStyle)(adminUniversity);
