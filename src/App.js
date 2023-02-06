import MainPage from './components/MainPage';
import React from 'react';
import {Route, Routes, Link, useNavigate} from 'react-router-dom';
import ProductPage from './components/ProductPage';
import UploadPage from './components/UploadPage';
import { Button } from "antd";
import {UploadOutlined} from '@ant-design/icons';


function App() {
  let navigate=useNavigate();
  return (
    <div className="App">
        <div id="header">
            <div id="header-area">
                <Link to='/'><img src="./images/icons/logo.png" alt="logo" /></Link>
                <Button size='large' icon={<UploadOutlined />} onClick={() => {navigate('/UploadPage')}}>상품 업로드</Button>
            </div>
        </div>
        <div id="body"> 
            <Routes>
                <Route path='/' element={<MainPage />}></Route>
                <Route path='/ProductPage/:id' element={<ProductPage/>}></Route>
                <Route path='/UploadPage' element={<UploadPage/>}></Route>
            </Routes>
        </div>
        <div id="footer">
              <Link to='/about'>회사소개</Link>
              <Link to='/policy'>이용약관</Link>
              <Link to='/sales'>통신판매업 : 123-1234</Link>
              <Link to='/license'>사업자등록번호 : 456-56-789213</Link>
        </div>
    </div>
  );
}

export default App;
