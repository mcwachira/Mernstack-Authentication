import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = ({children}) => {

    const {userInfo} =  useSelector((state) => state.auth)
  return  userInfo ?<Outlet/> : <Navigate to='/login'/> //outlet shows whatever the route is
}

export default PrivateRoute