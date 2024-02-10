import { Navigate, useRoutes,useParams } from 'react-router-dom';
import { useContext } from 'react';
import {ProfilePage} from './pages/ProfilePage';


// layouts
// import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

//

import BlogPage from './pages/BlogPage';
import UserPage from './pages/po/Purchase';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import { Ledger } from './pages/Ledger';
import { Delivery } from './pages/Delivery';
import { Subpurchase } from './pages/po/Subpurchase';
import { useAuthContext } from './pages/AuthProvider';
import { Drnlist } from './pages/createDrn'
import { Newdrn } from './pages/Newdrn';
import { Footer } from './pages/Footer';
 import { CompanySelection } from './pages/Companyselection';
import { Drndetail } from './pages/po/drndetail';
import { Calender } from './pages/po/calender';
import { Drnconcern } from './pages/po/drnConcern';
import { Weeklycalender } from './pages/po/weeklycalender';



// ----------------------------------------------------------------------

export default function Router() {
  // const {purchaseId}=useAuthContext()
  // const IdPurchase=localStorage.getItem('purchaseid')
  //  console.log(purchaseId)
  //  console.log(IdPurchase)
 // const id=purchaseId
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout /> ,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        // { path: `user/${purchaseId}`, element: <UserPage /> },
        { path: 'purchase/open', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'ledger', element: <Ledger /> },
        { path: 'delivery', element: <Delivery /> },
        { path: `purchase/product/`, element: <Subpurchase /> },
        { path: `purchase/schedule/monthly`, element: <Calender /> },
        { path: `purchase/schedule/weekly`, element: <Weeklycalender /> },
        { path: `drnconcern`, element: <Drnconcern /> },
        
        // {
        //   path: 'purchase/schedule',
        //   element: <Navigate to="/dashboard/purchase/schedule/monthly" />,
        //   children: [
        //     {
        //       path: 'monthly/:index',
        //       element: <Calender />,
        //     },
        //     {
        //       path: 'week/:index',
        //       element: <Calender />,
        //     },
        //   ],
        // },
        
        {
          path: 'purchase/schedule',
          element: <Navigate to="/dashboard/purchase/schedule/monthly" />,
          // children: [
          //   {
          //     path: 'monthly/:index',
          //     element: <Calender />,
          //   },
          //   {
          //     path: 'weekly/:index',
          //     element: <Calender />,
          //   },
          // ],
        },
      
        
        
        
        
         { path: `profile/DRN/create/`, element: <Drnlist/> },
        { path: `subpurchase/drnlist/drn-detail`, element: <Drndetail /> },
        
      

        
        
      ],
    },
   // <Route path="/dashboard/subpurchase/:purchaseId" component={Subpurchase} />

    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: 'companyselection', element: <CompanySelection /> },
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
   
  ]);

  return routes;
}
