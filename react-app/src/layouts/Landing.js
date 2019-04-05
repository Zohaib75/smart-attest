import React, { Component } from 'react';

import '../assets/css/main.css'
import logo from '../assets/img/pictures/BlockChain.png'
import github from '../assets/img/icons/github.png'

import { Link , NavLink, withRouter} from 'react-router-dom'


class Landing extends Component {
  
  render() {
    return (
        

     <div className="hero-cover"> 
       
   

       <nav className="header header--01">
         <div className="container header__container">

           <div className="header__left_box"><NavLink to="/" title="Home" className="header__logo_box"><img src={logo} alt="Logo" className="header__logo_img"/></NavLink></div>

           <div className="header__right_box">
             <ul className="header__menu_list header__item--desktop">
               <li className="header__menu_item"><NavLink to="/auth" className="header__menu_link header__menu_link--white">Hec</NavLink></li>
               <li className="header__menu_item"><NavLink to="/auth" className="header__menu_link header__menu_link--white">University</NavLink></li>
               <li className="header__menu_item"><NavLink to="/auth" className="header__menu_link header__menu_link--white">Registrar</NavLink></li>
               <li className="header__menu_item"><NavLink to="/auth" className="header__menu_link header__menu_link--white">issuer</NavLink></li>
               <li className="header__menu_item"><NavLink to="/auth" className="header__menu_link header__menu_link--white">Dean</NavLink></li>
               <li className="header__menu_item"><NavLink to="/auth" className="header__menu_link header__menu_link--white">Student</NavLink></li>
               <li className="header__menu_item"><a href={"https://github.com/Zohaib75/smart-attest"} className="header__menu_link header__menu_link--white"><img src={github} className="cover__img--16" style={{width: '18px', top: '-2px', position: 'relative', marginRight: '2px'}}/>&nbsp;Github</a></li>
             </ul>
             <button type="button" data-menu-index="01" className="header__burger_button js-open-menu header__item--mobile"></button>

           </div>
         </div>
       </nav>

       

       <div className="container cover__container--16  hero-cover-img" >

         <div className="col-lg-12">
           <div className="row">
               <h2>Own and Share Your Achievements</h2>
               <span className="subhead">With the blockchain, your official records are now yours forever. <br/>Receive them once, share and verify them for a lifetime.</span>
           </div>
         </div>

         </div>

       <br/>
      
        <div className="footer__description_box--04">
         <div className="container footer__container"><span className="footer__description footer__description--04">Blockchain Based Smart Attestation</span><span className="footer__copyright footer__copyright--04"><Link to="/">Smart-Attest Team (UCP)</Link></span></div>
       </div>
       
    

   </div>



    );
  }
}

export default Landing;
