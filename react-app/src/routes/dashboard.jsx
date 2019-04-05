// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
//  import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
//import Unarchive from "@material-ui/icons/Unarchive";
import School from "@material-ui/icons/School"
import LocationCity from "@material-ui/icons/LocationCity"
import Business from "@material-ui/icons/Business"

// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
//admin views
import adminDashboardPage from "views/Admin/adminDashboard.jsx";
import adminUniversityPage from "views/Admin/adminUniversity.jsx";
import adminDepartmentPage from "views/Admin/adminDepartment.jsx";
import adminStudentPage from "views/Admin/adminStudent.jsx";
import adminDegreePage from "views/Admin/adminDegree";

//univiews
import uniDashboardPage from "views/uni/uniDashboard.jsx";
import uniRegistrar from "views/uni/uniRegistrar.jsx";
import uniDepartmentPage from "views/uni/uniDepartment.jsx";
import uniStudentPage from "views/uni/uniStudent.jsx";
import uniDegreePage from "views/uni/uniDegree";

//registrar views
import registrarDashboardPage from "views/Registrar/registrarDashboard.jsx";
import registrarDepartmentPage from "views/Registrar/registrarDepartment.jsx";
import registrarStudentPage from "views/Registrar/registrarStudent.jsx";
import registrarDegreePage from "views/Registrar/registrarDegree";

//issuer views
import issuerDashboardPage from "views/Issuer/issuerDashboard.jsx";
import issuerDepartmentPage from "views/Issuer/issuerDepartment.jsx";
import issuerStudentPage from "views/Issuer/issuerStudent.jsx";
import issuerDegreePage from "views/Issuer/issuerDegree";

//dean views
import deanDashboardPage from "views/dean/deanDashboard.jsx";
import deanDepartmentPage from "views/dean/deanDepartment.jsx";
import deanStudentPage from "views/dean/deanStudent.jsx";
import deanDegreePage from "views/dean/deanDegree";

//std views
import stdDashboardPage from "views/std/stdDashboard.jsx"

import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";





//import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Landing from '../layouts/Landing'


const dashboardRoutes = [
  
  {
    path: "/admin/dashboard",
    sidebarName: "Dashboard",
    navbarName: "",
    icon: Notifications,
    component: adminDashboardPage
  
  },
  {
    path: "/admin/university",
    sidebarName: "University",
    navbarName: "",
    icon: LocationCity,
    component: adminUniversityPage
  
  },

  {
    path: "/admin/department",
    sidebarName: "Department",
    navbarName: "",
    icon: Business,
    component: adminDepartmentPage
  
  },

  {
    path: "/admin/std",
    sidebarName: "Student",
    navbarName: "",
    icon: Person,
    component: adminStudentPage
  
  },

  {
    path: "/admin/degree",
    sidebarName: "Degree",
    navbarName: "",
    icon: School,
    component: adminDegreePage
  
  },

  {
    path: "/uni/dashboard",
    sidebarName: "Dashboard",
    navbarName: "",
    icon: Notifications,
    component: uniDashboardPage
  
  },
  {
    path: "/uni/registrar",
    sidebarName: "Registrar",
    navbarName: "",
    icon: LocationCity,
    component: uniRegistrar
  
  },

  {
    path: "/uni/department",
    sidebarName: "Department",
    navbarName: "",
    icon: Business,
    component: uniDepartmentPage
  
  },

  {
    path: "/uni/std",
    sidebarName: "Student",
    navbarName: "",
    icon: Person,
    component: uniStudentPage
  
  },

  {
    path: "/uni/degree",
    sidebarName: "Degree",
    navbarName: "",
    icon: School,
    component: uniDegreePage
  
  },
  
  {
    path: "/registrar/dashboard",
    sidebarName: "Dashboard",
    navbarName: "",
    icon: Notifications,
    component: registrarDashboardPage
  
  },

  {
    path: "/registrar/department",
    sidebarName: "Department",
    navbarName: "",
    icon: Business,
    component: registrarDepartmentPage
  
  },

  {
    path: "/registrar/std",
    sidebarName: "Student",
    navbarName: "",
    icon: Person,
    component: registrarStudentPage
  
  },

  {
    path: "/registrar/degree",
    sidebarName: "Degree",
    navbarName: "",
    icon: School,
    component: registrarDegreePage
  
  },



  {
    path: "/issuer/dashboard",
    sidebarName: "Dashboard",
    navbarName: "",
    icon: Notifications,
    component: issuerDashboardPage
  
  },

  {
    path: "/issuer/department",
    sidebarName: "Department",
    navbarName: "",
    icon: Business,
    component: issuerDepartmentPage
  
  },

  {
    path: "/issuer/std",
    sidebarName: "Student",
    navbarName: "",
    icon: Person,
    component: issuerStudentPage
  
  },

  {
    path: "/issuer/degree",
    sidebarName: "Degree",
    navbarName: "",
    icon: School,
    component: issuerDegreePage
  
  },




  {
    path: "/dean/dashboard",
    sidebarName: "Dashboard",
    navbarName: "",
    icon: Notifications,
    component: deanDashboardPage
  
  },

  {
    path: "/dean/department",
    sidebarName: "Department",
    navbarName: "",
    icon: Business,
    component: deanDepartmentPage
  
  },

  {
    path: "/dean/std",
    sidebarName: "Student",
    navbarName: "",
    icon: Person,
    component: deanStudentPage
  
  },

  {
    path: "/dean/degree",
    sidebarName: "Degree",
    navbarName: "",
    icon: School,
    component: deanDegreePage
  
  },

  {
    path: "/std/dashboard",
    sidebarName: "Dashboard",
    navbarName: "",
    icon: School,
    component: stdDashboardPage

  }
,
  // {
  //   path: "/dashboard",
  //   sidebarName: "Dashboard",
  //   navbarName: "Material Dashboard",
  //   icon: Dashboard,
  //   component: DashboardPage
  // },
  // {
  //   path: "/user",
  //   sidebarName: "Create Profile",
  //   navbarName: "Profile",
  //   icon: Person,
  //   component: UserProfile
  // },
  // {
  //   path: "/table",
  //   sidebarName: "Table List",
  //   navbarName: "Table List",
  //   icon: "content_paste",
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   sidebarName: "Typography",
  //   navbarName: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography
  // }
  // ,
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // // {
  // //   path: "/maps",
  // //   sidebarName: "Maps",
  // //   navbarName: "Map",
  // //   icon: LocationOn,
  // //   component: Maps
  // // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   sidebarName: "Upgrade To PRO",
  //   navbarName: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro
  // },
  { redirect: true, path: "/", to: "/home", navbarName: "Redirect" }
];

export default dashboardRoutes;
