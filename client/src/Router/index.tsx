import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from '../Config/Auth';
import { ControlAdminHome, ControlStallCreate, ControlStallHome, ControlStallProfile, Home, Login, Post, PostItem, Register, Stall, StallItem } from '../Pages';

type Props = {}

const Router = (props: Props) => {
  // const [auth, setAuth] = React.useState({role: ''})

  // React.useEffect(() => {
  //   setAuth()
  // }, [])

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home auth={''} />} />
          <Route path='/post' element={<Post />} />
          <Route path='/stall' element={<Stall />} />
          <Route path='/stall/:stall' element={<StallItem />} />
          <Route path='/login' element={<Login />} />
          <Route path='/post/:stall/:slug' element={<PostItem />} />
          <Route path='/register' element={<Register />} />

          <Route path='/control' element={<Navigate replace to="/control/stall" />}  />
          <Route path='/control/stall' element={Auth.getRole() === 'stall' ? <ControlStallHome /> : <>Page is not found</>}  />
          <Route path='/control/stall/profile' element={Auth.getRole() === 'stall' ? <ControlStallProfile /> : <>Page is not found</>}  />
          <Route path='/control/stall/create' element={Auth.getRole() === 'stall' ? <ControlStallCreate /> : <>Page is not found</>} />

          <Route path='/control/admin' element={Auth.getRole() === 'admin' ? <ControlAdminHome /> : <>Page is not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router