import React from 'react';

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
import Buttons from './views/Buttons/Buttons';
import Charts from './views/Charts';
import Dashboard from './views/Dashboard';
import SuperDashboard from './views/Dashboard/SuperDashboard';
import DefaultLayout from './containers/DefaultLayout';
import CoreUIIcons from './views/Icons/CoreUIIcons';
import Flags from './views/Icons/Flags';
import FontAwesome from './views/Icons/FontAwesome';
import SimpleLineIcons from './views/Icons/SimpleLineIcons';
import Alerts from './views/Notifications/Alerts';
import Badges from './views/Notifications/Badges';
import Modals from './views/Notifications/Modals';
import Colors from './views/Theme/Colors';
import Typography from './views/Theme/Typography';
import Widgets from './views/Widgets/Widgets';
import Users from  './views/Users/Users';
import User from './views/Users/User';
import UserMaster from './views/UserMaster/UserMaster';
import BankMaster from './views/BankMaster/BankMaster';
import DeviceMaster from './views/DeviceMaster/DeviceMaster';
import DeductionTypeMaster from './views/DeductionTypeMaster/DeductionTypeMaster';
import DeductionList from './views/DeductionTypeMaster/DeductionList';
import EditDeduction from './views/DeductionTypeMaster/EditDeduction';
import UnitMaster from './views/UnitMaster/UnitMaster';
import SupplierMaster from './views/SupplierMaster/SupplierMaster';
import ProductMaster from './views/ProductMaster/ProductMaster';
import UnionMaster from './views/UnionMaster/UnionMaster';
import ListUsers from './views/ListUsers/ListUsers';
import BankList from './views/BankMaster/BankList';
import DeviceList from './views/DeviceMaster/DeviceList';
import UnitList from './views/UnitMaster/UnitList';
import EditBank from './views/BankMaster/EditBank';
import EditUser from './views/UserMaster/EditUser';
import EditDevice from './views/DeviceMaster/EditDevice';
import ProductList from './views/ProductMaster/ProductList';
import EditProduct from './views/ProductMaster/ProductEdit';
import EditUnit from './views/UnitMaster/EditUnit';
import EditRateChart from './views/RateChartMaster/EditRateChart';
import SocietyMaster from './views/SocietyMaster/SocietyMaster';
import SocietyList from './views/SocietyMaster/ListSociety';
import SupplierList from './views/SupplierMaster/SupplierList';
import EditSociety from './views/SocietyMaster/EditSociety';
import EditSupplier from './views/SupplierMaster/EditSupplier';
import CenterMaster from './views/CenterMaster/CenterMaster';
import CenterList from './views/CenterMaster/ListCenter';
import EditCenter from './views/CenterMaster/EditCenter';
import FarmerMaster from './views/FarmerMaster/FarmerMaster';
import FarmerList from './views/FarmerMaster/FarmerList';
import FarmerEdit from './views/FarmerMaster/EditFarmer';
import RateChartMaster from './views/RateChartMaster/RateChartMaster';
import RateChartMaster1 from './views/RateChartMaster/oldbackup';
import RateChartList from './views/RateChartMaster/ListRateMaster';
import RateMatrixList from './views/RateChartMaster/ListRateMatrix';
import StockInventory from './views/PurchaseRequisition/StockInventory';
import TransactionSettings from './views/Settings/TransactionSettings';
import TransactionSettings1 from './views/Settings/TransactionSettings1';
import Login from './views/Pages/Login/Login';
import SettingsList from './views/Settings/SettingsList';
import EditSettings from './views/Settings/EditSettings';
import CollectionTransaction from './views/CollectionTransaction/CollectionTransaction';
import DeductionTransaction from './views/CollectionTransaction/DeductionTransaction';
import PurchaseRequisition from './views/PurchaseRequisition/PurchaseRequisition';
import BillingMaster from './views/BillingMaster/BillingMaster';
import ShiftReport from './views/Reports/ShiftReport';
import PassbookReport from './views/Reports/PassbookReport';
import DeductionReport from './views/Reports/DeductionReport';
import CollectionHistoryReport from './views/Reports/CollectionHistoryReport';
import CollectionReport from './views/Reports/CollectionReport';
import DaysMilkReport from './views/Reports/DaysMilkReport';
import SocietyReport from './views/Reports/SocietyReport';
import CattleWiseReport from './views/Reports/CattleWiseReport';
import TruckSheetReport from './views/Reports/TruckSheetReport';
import ProductPurchaseReport from './views/Reports/ProductPurchaseReport';
import ProductSaleReport from './views/Reports/ProductSaleReport';
import ProducerBillReport from './views/Reports/ProducerBillReport';
import PendingBillReport from './views/Reports/PendingBillReport';
import GraphReport from './views/Reports/GraphReport';
import AnnualReport from './views/Reports/AnnualReport';
import AnalyticalReport from './views/Reports/AnalyticalReport';
import ConversionReport from './views/Reports/ConversionReport';
import StockReport from './views/Reports/StockReport';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact:'true',name: 'Home', component: DefaultLayout },
  { path: '/shiftreport',name: 'Shift End Report', component: ShiftReport },
  { path: '/memberreport',name: 'Member Passbook For Period', component: PassbookReport },
  { path: '/deductionreport',name: 'Deduction Report', component: DeductionReport },
  { path: '/collectionhistoryreport',name: 'Collection History Report', component: CollectionHistoryReport },
  { path: '/collectionreport',name: 'Collection Report', component: CollectionReport },
  { path: '/daysreport',name: 'Days Milk Report', component: DaysMilkReport },
  { path: '/societyreport',name: 'Society Report', component: SocietyReport },
  { path: '/cattlewisereport',name: 'Cattle Report', component: CattleWiseReport },
  { path: '/trucksheetreport',name: 'Truck Sheet Report', component: TruckSheetReport },
  { path: '/productpurchasereport',name: 'Product Purchase Report', component: ProductPurchaseReport },
  { path: '/productsalereport',name: 'Product Sale Report', component: ProductSaleReport },
  { path: '/producerbillreport',name: 'Producer Bill Report', component: ProducerBillReport },
  { path: '/pendingbillreport',name: 'Pending Bill Report', component: PendingBillReport },
  { path: '/graphreport',name: 'Graph Report', component: GraphReport },
  { path: '/annualreport',name: 'Annual Report', component: AnnualReport },
  { path: '/analyticalreport',name: 'Analytical Report', component: AnalyticalReport},
  { path: '/conversionreport',name: 'Conversion Report', component: ConversionReport},
  { path: '/login',name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },  
  { path: '/superdashboard', name: 'Admin Dashboard', component: SuperDashboard },  
  { path: '/collectiontransaction', name: 'Collection Transaction', component: CollectionTransaction },
  { path: '/deductiontransaction', name: 'Deduction Transaction', component: DeductionTransaction },
  { path: '/billingmaster', name: 'Billing Master', component: BillingMaster },
  { path: '/listusers/usermaster', name: 'User Master', component: UserMaster },
  { path: '/transactionsettings', name: 'Transaction Settings', component: TransactionSettings },
  { path: '/settingslist', name: 'Settings List', component: SettingsList },
  { path: '/transactionsettings1', name: 'Settings1', component: TransactionSettings1 },
  { path: '/listfarmers/farmermaster', name: 'Farmer Master', component: FarmerMaster },
  { path: '/listbanks/bankmaster', name: 'Bank Master', component: BankMaster },
  { path: '/listdevice/devicemaster', name: 'Device Master', component: DeviceMaster },
  { path: '/deductiontypemaster', name: 'Deduction Type Master', component: DeductionTypeMaster },
  { path: '/deductionlist', name: 'Deduction List', component: DeductionList },
  { path: '/listunit/unitmaster', name: ' Unit Master', component: UnitMaster },
  { path: '/listsupplier/suppliermaster', name: ' Supplier Master', component: SupplierMaster },
  {path: '/listsupplier', name: ' Supplier List', component: SupplierList },
  {path: '/listratechart', name: ' Rate Chart List', component: RateChartList },
  {path: '/listratematrix', name: ' Rate Matrix List', component: RateMatrixList },
  { path: '/listsociety/societymaster', name: ' Society Master', component: SocietyMaster },
  { path: '/editsociety/:id', name: ' Edit Society', component: EditSociety },
  { path: '/editratechart/:id', name: ' Edit Rate Chart', component: EditRateChart },
  { path: '/editfarmer/:id', name: ' Edit Farmer', component: FarmerEdit },
  { path: '/listcenter/centermaster', name: ' Center Master', component: CenterMaster },
  { path: '/listsociety', name: ' Society List', component: SocietyList },
  { path: '/listproduct/productmaster', name: ' Product Master', component: ProductMaster },
  { path: '/dairymaster', name: ' Dairy/HO Master', component: UnionMaster },
  { path: '/ratechartmaster', name: ' Rate Chart Master', component: RateChartMaster },
  { path: '/ratechartmaster1', name: ' Rate Chart Master1', component: RateChartMaster1 },
  { path: '/listusers', name: ' List User', component: ListUsers },
  { path: '/listbanks', name: ' List Bank', component: BankList },
  { path: '/listdevice', name: ' List Device', component: DeviceList },
  { path: '/listunit', name: ' List Device', component: UnitList },
  { path: '/listcenter', name: ' List Center', component: CenterList },
  { path: '/listfarmers', name: ' List Farmers', component: FarmerList },
  { path: '/editbank/:id', name: ' Edit Bank', component: EditBank },
  { path: '/edituser/:id', name: ' Edit User', component: EditUser },
  { path: '/editsupplier/:id', name: ' Edit Supplier', component: EditSupplier },
  { path: '/editdevice/:id', name: ' Edit Device', component: EditDevice },
  { path: '/editunit/:id', name: ' Edit Unit', component: EditUnit },
  { path: '/editcenter/:id', name: ' Edit Center', component: EditCenter },
  { path: '/listproduct', name: '  List Product', component: ProductList },
  { path: '/editproduct/:id', name: ' Edit Product', component: EditProduct },
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
  { path: '/editdeduction/:id', exact: true, name: 'EditDeduction', component: EditDeduction },
  { path: '/editsettings/:id', exact: true, name: 'EditSettings', component: EditSettings },
  { path: '/purchaserequisition', exact: true, name: 'List Requests', component: PurchaseRequisition },
  { path: '/stockinventory', exact: true, name: 'Stock Inventory', component: StockInventory },
  { path: '/stockreport', exact: true, name: 'Stock Report', component: StockReport },

];

export default routes;
