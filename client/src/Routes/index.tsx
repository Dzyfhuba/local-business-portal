import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Post, Stall } from '../Pages';

export default class RouteController extends React.Component{
  public render() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home auth={''} />} />
            <Route path='/post' element={<Post />} />
            <Route path='/stall' element={<Stall />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
