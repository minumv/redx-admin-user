import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Profile } from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import EditUser from './pages/EditUser'

const App = () => {
  return( 
  <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editpage' element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App