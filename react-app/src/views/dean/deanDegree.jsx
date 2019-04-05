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
import Search from "@material-ui/icons/Search";
import axios from 'axios'
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

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
             search:""
        };
      }

      CheckFunction = ()=>{

        return axios.get('http://localhost:3001/api/Degree', {withCredentials: true})
                    .then(res =>{

                      let test = res.data.map( uni =>{
   
                        let arr = [];
                            arr.push(uni.DegreeId);
                            arr.push(uni.Description);
                            let issName = uni.issuer.split('#')
                            arr.push(issName[1])
       
                            let stdName = uni.student.split('#')
                            arr.push(stdName[1])

                            arr.push(uni.issued_Date)
                            //arr.push("01-01-2019")
                            let uniName = uni.university.split('#')
                            arr.push(uniName[1])
                            //arr.push("UCP")
                            arr.push(uni.status)
                            let btn = null;
                            if(uni.status === "APPROVED_BY_REGISTRAR")
                              btn = <Button style={{color:"white", backgroundColor:"red",float:"left"}} id={uni.DegreeId} onClick={e => this.handleClick(e)} >Approve</Button>        
                            else
                              btn = <Button style={{color:"white", backgroundColor:"green",float:"left"}} >APPROVED</Button>        

                          arr.push(btn)
                          arr.push(true)
                          console.log(arr)
                          return arr
       
                      })
                      this.setState({
                        table:test
                      })


                    })
                    .catch(error=>{
                      console.log(error)
                    })
      }
      componentDidMount(){

        this.CheckFunction()
      }

      handleClick = (e) =>{
        let degId = e.currentTarget.id
        let date = new Date();
        let obj = {
          "$class": "org.example.mynetwork.Approve",
     "degree": "org.example.mynetwork.Degree#"+degId, 
     "transactionId": "",
     "timestamp": date.toISOString()
        }
        axios.post('http://localhost:3001/api/Approve',obj, {withCredentials:true})
              .then(res => {
                
                let table =  this.state.table.map(row => {
                  if(row.includes(degId))
                    row[7]= <Button style={{color:"white", backgroundColor:"green",float:"left"}} >APPROVED</Button>        
  
              return row;
                  })
     
                  this.setState({
                    table:table
                  })  
                  this.CheckFunction()
  
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

      search = () =>{

        let table =  this.state.table.map(row => {
             if(row.includes(this.state.search)){
               row[8]=true
             }
             else
               row[8]=false
           
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
            <h4  style={{display:"inline"}} className={classes.cardTitleWhite}>DEGREE'S  </h4>
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
              tableHead={["DegreeId", "Status", "Issuer", "Student", "Date", "City", "University", "Approve" ]}
              tableData={this.state.table.map(row => { return row[8] === true ? row.slice(0,8):[]})}

            />
          </CardBody>
        </Card>
      </GridItem>
      
          </GridContainer>
  );
}
}

export default withStyles(headerLinksStyle)(adminUniversity);
