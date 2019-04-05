import React, { Component } from 'react';

import '../assets/css/main.css'
import logo from '../assets/img/mask.png'
import github from '../assets/img/icons/github.png'

import { Link , NavLink, withRouter} from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import '../assets/css/main.css'

const divStyle = {
  width: '88%',
  height: '800px',
  backgroundSize: 'cover'
};

class Check extends Component {

   state = {
        post: false
    }


    componentDidMount(){

       axios.get('http://localhost:3001/api/system/ping', {withCredentials: true})
            .then( response => {
              console.log(response)

              let res = response.data.participant.split('#');

              let type = res[0].split('.');
              let path = "";
          
                if(type[3] === "Hec")
                  path =  "/admin";
                else if(type[3] === "University")
                  path =  "/uni";
                else if(type[3] === "Registrar")
                  path =  "/registrar";
                else if(type[3] === "Dean")
                  path =  "/dean";
                else if(type[3] === "Issuer")
                 path =  "/issuer";
                else if (type[3] === "Student")
                 path =  "/std";
                 

              if(response.status === 200)
              this.props.history.push({
              pathname: path+'/dashboard',
              search: '?query=abc',
              state: { detail: response.data }})
                

             })
            .catch(e => {
              console.log(e)
              this.setState({post:true})
                
            })
    
    }

    
  
  render() {


    const {post} = this.state;
    const postList = post ? (

          <Login/>

        ) : ( null )

    return (

       <main className="page_wrapper">
 
     <div className="hero-cover"> 

     <div className="container cover__container--16 hero-cover-img" style={{divStyle }}>
          {postList}
      </div>
   </div>
   </main>
        
         
    )




  }
}

export default withRouter(Check);
