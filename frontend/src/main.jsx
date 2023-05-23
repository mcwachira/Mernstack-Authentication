import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import store from './redux/store'
import {Provider} from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import { createBrowserRouter,RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx'
import PrivateRoute from './utils/PrivateRoute.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

<Route index element={<HomeScreen/>}/>
<Route path='/login' element={<LoginScreen />} /> 
<Route path='/register' element={<RegisterScreen />} />
<Route path="" element={<PrivateRoute/>}>
<Route path='/profile' element={<ProfileScreen />} />
</Route>


      </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router}>

    <App />

    </RouterProvider>

  </React.StrictMode>
  </Provider>
)


