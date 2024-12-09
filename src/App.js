import  {useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingWrapper from './LoadingWrapper';
import { ROUTE_CONSTANTS } from './util/constants';
import { Login, Register} from './pages/auth';
import Spender from './pages/spender';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileInfo } from './state/userProfile';
import './App.css';

function App() {
    const dispatch = useDispatch();
    const {loading,authUserInfo:{isAuth}} = useSelector(store=>store.userProfile);
    
    useEffect(()=>{
      dispatch(fetchUserProfileInfo());
    },[dispatch])
   
    return (
        <LoadingWrapper loading={loading}>
            <Router> 
                <Routes>
                    <Route
                        path='/'
                        element= {<Navigate to={ROUTE_CONSTANTS.REGISTER} />}
                    />
                    <Route
                        path={ROUTE_CONSTANTS.LOGIN}
                        element={isAuth ? <Navigate to={ROUTE_CONSTANTS.SPENDER} /> : <Login />}
                    />
                    <Route
                        path={ROUTE_CONSTANTS.REGISTER}
                        element={isAuth ? <Navigate to={ROUTE_CONSTANTS.SPENDER} /> : <Register />}
                    />
                    <Route
                        path={ROUTE_CONSTANTS.SPENDER}
                        element={isAuth ? <Spender />: <Navigate to={ROUTE_CONSTANTS.LOGIN} />}
                    />
                </Routes>
            </Router>
        </LoadingWrapper>
    );
}

export default App;
