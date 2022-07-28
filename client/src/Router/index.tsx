import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ControlAdminHome, ControlStallCreate, ControlStallHome, Home, Login, Post, Register, Stall } from '../Pages';

type Props = {}

const Router = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home auth={''} />} />
          <Route path='/post' element={<Post />} />
          <Route path='/stall' element={<Stall />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/control/stall' element={<ControlStallHome />} />
          <Route path='/control/stall/create' element={<ControlStallCreate />} />

          <Route path='/control/admin' element={<ControlAdminHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router