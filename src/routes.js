import React from 'react';
import AddCategory from './views/AddCategory/AddCategory';
import CallToAttend from './views/CallsToAttend/CallsToAttend';
import ListReason from './views/AddRegion/ListReason';
import AddRegion from './views/AddRegion/AddRegion';
import Breadcrumbs from './views/Base/Breadcrumbs';
import Cards from './views/Base/Cards';
import Carousels from './views/Base/Carousels';
import Collapses from './views/Base/Collapses';
import Dropdowns from './views/Base/Dropdowns';
import Forms from './views/Base/Forms';
import Jumbotrons from './views/Base/Jumbotrons';
import ListGroups from './views/Base/ListGroups';
import Navbars from './views/Base/Navbars';
import Navs from './views/Base/Navs';
import Paginations from './views/Base/Paginations';
import Popovers from './views/Base/Popovers';
import ProgressBar from './views/Base/ProgressBar';
import Switches from './views/Base/Switches';
import Tables from './views/Base/Tables';
import Tabs from './views/Base/Tabs';
import Tooltips from './views/Base/Tooltips';
import BrandButtons from './views/Buttons/BrandButtons';
import ButtonDropdowns from './views/Buttons/ButtonDropdowns';
import ButtonGroups from './views/Buttons/ButtonGroups';
import Buttons  from './views/Buttons/Buttons';
import Charts from './views/Charts';
import Dashboard from './views/Dashboard';
import CoreUIIcons from './views/Icons/CoreUIIcons';
import Flags from './views/Icons/Flags';
import FontAwesome from './views/Icons/FontAwesome';
import SimpleLineIcons from './views/Icons/SimpleLineIcons';
import Alerts from './views/Notifications/Alerts';
import Badges from './views/Notifications/Badges';
import Modals from './views/Notifications/Modals';
import Colors  from './views/Theme/Colors';
import Engineers from './views/Engineers/Enginners.js';
import Typography from './views/Theme/Typography';
import Widgets from './views/Widgets/Widgets';
import Users from './views/Users/Users';
import User from './views/Users/User';
import ListEngineers from './views/ListEngineers/ListEngineers.js';
import NewServiceCalls from './views/NewServiceCalls/NewServiceCalls';
import ListCategory from './views/ListCategory/ListCategory';
import CallsToAttend from './views/CallsToAttend/CallsToAttend';
import CallsAttend from './views/CallsToAttend/CallToAttend';
import CallAttend from './views/CallAttend/CallAttend';
import CompletedCalls from './views/CompletedCalls/CompletedCalls';
import CompletedCall from './views/CompletedCalls/CompletedCall';
import PendingCalls from './views/PendingCalls/PendingCalls';
import PendingCall from './views/PendingCalls/PendingCall';
import EditPendingCalls from './views/PendingCalls/EditPendingCalls';
import Login from './views/Pages/Login/Login';
import RegeneratedPendingCalls from './views/PendingCalls/RegeneratedPendingCalls';
import EditEngineer from './views/ListEngineers/EditEngineer';
import EditRegions from './views/AddRegion/EditRegion';
import EditCategory from './views/ListCategory/EditCategory';
import Customers from './views/Customers/Customers';
import {AddCustomer} from './views/PendingCalls/s1';
import ProfileSetting from './views/PendingCalls/ProfileSetting';
import SetPassword from './views/PendingCalls/SetPassword';
import ViewCompletedCalls from './views/CompletedCalls/ViewCompletedCalls';
import ViewCallsToAttend from './views/CallsToAttend/ViewCallsToAttend';


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/engineers', exact: true, name: 'Engineers', component: Engineers },
  { path: '/enginners', name: 'Add Engineers', component: Engineers },
  { path: '/listengineers', exact: true, name: 'ListEngineers', component: ListEngineers },
  { path: '/listengineers', name: 'ListEngineers', component: ListEngineers },
  { path: '/newservicecalls', exact: true, name: 'New Service Calls', component: NewServiceCalls },
  { path: '/newservicecalls/:id', name: 'New Service Calls', component: NewServiceCalls },
  { path: '/addcategory', exact: true, name: 'Add New Category', component: AddCategory },
  { path: '/addcategory/:id', name: 'Add New Category', component: AddCategory },
  { path: '/listcategory', exact: true, name: 'List Category', component: ListCategory },
  { path: '/listcategory', name: 'List Category', component: ListCategory },
  { path: '/callstoattendlist', exact: true, name: 'Calls To Attend', component: CallsToAttend },
  { path: '/callstoattendlist', name: 'Calls To Attend', component: CallsToAttend },
  { path: '/callattend', exact: true, name: 'Call Attend', component: CallAttend },
  { path: '/callattend/:id', name: 'Call Attend', component: CallAttend },
  { path: '/pendingcalls', exact: true, name: 'Pending Calls', component: PendingCalls },
  { path: '/pendingcalls', name: 'Pending Calls', component: PendingCalls },
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/login', name: 'Login', component: Login },
  { path: '/regeneratedpendingcalls', exact: true, name: 'Regenerated Pending Calls', component: RegeneratedPendingCalls },
  { path: '/regeneratedpendingcalls/:id', name: 'Regenerated Pending Calls', component: RegeneratedPendingCalls },
  { path: '/editenginner', exact: true, name: 'Edit Engineer', component: EditEngineer },
  { path: '/editenginner/:id', name: 'Edit Enginner', component: EditEngineer },
  { path: '/addregion', exact: true, name: 'Add Region', component: AddRegion },
  { path: '/addregion/:id', name: 'Add New Region', component: AddRegion },
  { path: '/listregions', exact: true, name: 'ListReason', component: ListReason },
  { path: '/listregions', name: 'ListReason', component: ListReason },
  { path: '/editregion/:id', name: 'Edit Region', component: EditRegions },
  { path: '/editcategory', exact: true, name: 'Edit Category', component: EditCategory },
  { path: '/editcategory/:id', exact: true, name: 'Edit Category', component: EditCategory },
  { path: '/customers', exact: true, name: 'Customers', component: Customers },
  { path: '/customers', name: 'Customers', component: Customers },
  { path: '/calltoattendlist', exact: true, name: 'Calls To Attend', component: CallsAttend },
  { path: '/pendingcall', exact: true, name: 'Pending Calls', component: PendingCall },
  { path: '/completedcalls', exact: true, name: 'Completed Calls', component: CompletedCalls },
  { path: '/completedcall', exact: true, name: 'Completed Calls', component: CompletedCall },
  { path: '/profilesettings', exact: true, name: 'ProfileSettings', component: ProfileSetting },
  { path: '/setpassword', exact: true, name: 'SetPassword', component: SetPassword },
  { path: '/editpendingcalls/:id', name: 'Edit Pending Calls', component: EditPendingCalls },
  { path: '/viewcompletedcalls/:id', name: 'View Completed Calls', component: ViewCompletedCalls },
  { path: '/viewcallstoattend/:id', name: 'View Calls To Attend', component: ViewCallsToAttend },

];

export default routes;
