import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Profile } from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import EditUser from './pages/EditUser'
import Header from './components/Header'
import AdminHeader from './components/AdminHeader'
import { User } from './pages/User'
import { AdminLogin } from './pages/AdminLogin'
import DummyPage from './pages/DummyPage'
import AdminPrivateRoute from './components/AdminPrivateRoute'

const App = () => {
  return( 
  <>
    <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Route>
          
          <Route path='/adminsign' element={<AdminLogin />} />

          <Route element={<AdminHeader />}>
            <Route element={<AdminPrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/users' element={<User />} />
              <Route path='/editpage/:id' element={<EditUser />} />
              <Route path='/gotodummy' element={<DummyPage />} />
            </Route>
          </Route>
          
        </Routes>
    </BrowserRouter>
  </>
  )
}

export default App