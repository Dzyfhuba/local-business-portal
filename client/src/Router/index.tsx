import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from '../Config/Auth';
import {
  ControlAdminPostApproval,
  ControlAdminUserManagement,
  ControlStallCreate,
  ControlStallEdit,
  ControlStallHome,
  ControlStallProfile,
  Home,
  Login,
  Page404,
  Post,
  PostItem,
  Register,
  Stall,
  StallItem
} from '../Pages';

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

          <Route path='/control' element={<Navigate replace to={`/control/${Auth.getRole()}`} />} />
          <Route path='/control/superadmin' element={<Navigate replace to={`/control/admin`} />} />

          <Route path='/control/stall' element={Auth.getRole() === 'stall' ? <ControlStallHome /> : <Page404 />} />
          <Route path='/control/stall/profile' element={Auth.getRole() === 'stall' ? <ControlStallProfile /> : <Page404 />} />
          <Route path='/control/stall/create' element={Auth.getRole() === 'stall' ? <ControlStallCreate /> : <Page404 />} />
          <Route path='/control/stall/:id/edit' element={Auth.getRole() === 'stall' ? <ControlStallEdit /> : <Page404 />} />

          <Route path='/control/admin' element={Auth.getRole() === 'admin' || Auth.getRole() === 'superadmin' ? <Navigate replace to={`/control/admin/post-approval`} /> : <Page404 />} />
          <Route path='/control/admin/post-approval' element={Auth.getRole() === 'admin' || Auth.getRole() === 'superadmin' ? <ControlAdminPostApproval /> : <Page404 />} />
          <Route path='/control/admin/user-management' element={Auth.getRole() === 'admin' || Auth.getRole() === 'superadmin' ? <ControlAdminUserManagement /> : <Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router