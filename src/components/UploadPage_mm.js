import React, {useState} from 'react';
import { Button, Upload, message, InputNumber, Form, Input, Divider } from 'antd';
import "./UploadPage.scss";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { API_URL } from '../config/constants';



export default function UploadPage() {
    const [imageUrl, setImageUrl] = useState(null); 
    const history=useNavigate();
    const onSubmit = (values) => {
        axios.post(`${API_URL}`,{
            name: values.name,
            description: values.description,
            seller: values.seller,
            price: parseInt(values.price),
            imageUrl: imageUrl, 
        }).then((result) => {
            console.log(result);
            history('/', {replace:true});
        }).catch((error) =>{
            console.log(error);
            message.error(`에러가 발생했습니다 ${error.message}`);
        });

    };
    const onChangeImage = (info) => {
        if(info.file.status==='uploading'){
            return;
        }
        if(info.file.status==="done"){
           const response=info.file.response;
           const imageUrl=response.imageUrl;

           setImageUrl(imageUrl);
        } 
    }

  return (
    <div id="upload-container">
        <Form name="uploadFrom" onFinish={onSubmit} initialValues={{price:0}}>
            <Form.Item name="upload" label={<div className='upload-label'>상품 사진</div>}>
                <Upload name="image" action={`${API_URL}/image`} listType='picture' showUploadList={false} onChange={onChangeImage}>
                    { imageUrl ? (<img id="upload-img" src={`${API_URL}/${imageUrl}` } alt="이미지 왜 안나와" />
                    ):(
                        <div id="upload-img" >
                            <img src="/images/icons/camera.png" alt="" />
                            <span>이미지를 업로드 해주세요</span>
                        </div>
                    )}
                </Upload>
            </Form.Item>
            <Divider />
            <Form.Item label={<span className='upload-label'>판매자명</span>}  name="seller" rules={[ { required: true, message: '판매자명을 입력해주세요' }]}>
                <Input  className='upload-name' placeholder='이름을 입력해주세요' size="large" />
            </Form.Item>
            <Divider />
            <Form.Item label={<span className='upload-label'>상품명</span>}  name="name" rules={[ { required: true, message: '상품명은 필수 입력사항입니다' }]}>
                <Input  className='upload-name' placeholder='상품명을 입력해주세요' size="large" />
            </Form.Item>
            <Divider />
            <Form.Item label={<span className='upload-label'>판매가</span>}  name="price" rules={[ { required: true, message: '판매가를 입력해주세요' }]}>
                <InputNumber  className='upload-price' min={0} size="large" />
            </Form.Item>
            <Divider />
            <Form.Item label={<span className='upload-label'>상품설명</span>}  name="description" rules={[ { required: true, message: '상품설명을 입력해주세요' }]}>
                <Input.TextArea  size="large" id="product-description" showCount maxLength={300} placeholder="상품설명을 작생해주세요" />
            </Form.Item>
            <Divider />
            <Form.Item>
                <Button id="submit-button" size='large' htmlType='submit'>상품등록하기</Button>
            </Form.Item>
            
        </Form>
    </div>
  )
}
