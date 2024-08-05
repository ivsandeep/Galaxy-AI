import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import DashboardPage from './routes/dashboardPage/DashboardPage';
import ChatPage from './routes/chatPage/ChatPage';
import HomePage from './routes/homePage/HomePage';
import RootLayout from './layouts/rootLayout/RootLayout'
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import { SignIn, SignUp } from '@clerk/clerk-react';
import SignInPage from './routes/signInPage/SignInPage';
import SignUpPage from './routes/signUpPage/SignUpPage';



const router = createBrowserRouter([

  {
    element: <RootLayout/>,
    children:[
      {
        path:"/",
        element:<HomePage/>,
      },
      {
        path:"/sign-in/*",
        element:<SignInPage/>,
      },
      {
        path:"/sign-up/*",
        element:<SignUpPage/>,
      },
      {
        element:<DashboardLayout/>,
        children:[
          {
            path:"/dashboard",
            element:<DashboardPage/>
          },
          {
            path:"/dashboard/chats/:id",
            element:<ChatPage/>
          }
        
        ]
      }
    ]
  }
  // {
  //   path: "/",
  //   element:<HomePage/>
  // },
  // {
  //   path: "/dashboard",
    
  //   children:[
  //     {
  //       path:"dashboard",
  //       element:<DashboardPage/>,
  //     },
  //     {
  //       path:"/dashboard/chats/:id",
  //       element:<ChatPage/>
  //     }
  //   ]
  // },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
