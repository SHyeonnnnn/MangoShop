import React, { useState } from 'react';
import { Button, Checkbox, Upload, message, InputNumber, Form, Input, Divider } from 'antd';
import './UploadPage.scss'
import {useNavigate} from "react-router-dom"
import axios from 'axios';


const UploadPge = () => {
    // const [imageUrl, setImageUrl] = useState(null);
    const history=useNavigate();
    const onSubmit = (values) => {
        axios.post('',{
            name: values.name,
            description: values.description,
            seller: values.seller,
            price: values.price,
            // imageUrl: imageUrl
        })
        .then((result)=>{
            console.log(result);
            history('/',{replace:true})
        })
        .catch((error)=>{
            console.log(error);
            message.error(`에러가 발생했습니다. ${error.message}`);
        });
      };
      const onChangeImage = (info) => {
        /* if(){
            return;
        }
        if(){
            setImageUrl(imageUrl)
        } */
      }
    return (
        <div id="upload-container">
            <Form name='uploadform' onFinish={onSubmit}>
                <Form.Item name="upload" label={<div className='upload-label'>상품사진</div>}>
                    <div id='upload-img' onChange={onChangeImage}>
                        <img src="/images/icons/camera.png" alt="" />
                        <span>이미지를 업로드 해주세요</span>
                    </div>
                </Form.Item>
                <Divider></Divider>
                <Form.Item label={<span className='upload-label'>상품명 </span>} name='name'
                    rules={[
                        {
                        required: true,
                        message: '상품명은 필수 입력 사항입니다.',
                        },
                    ]}>
                    <Input className='upload-name' placeholder='상품명을 입력해주세요' size='large'/>
                </Form.Item>
                <Divider></Divider>
                <Form.Item label={<span className='upload-label'>판매자명 </span>} name='seller'
                    rules={[
                        {
                        required: true,
                        message: '판매자명을 입력해주세요.',
                        },
                    ]}>
                    <Input className='upload-name' placeholder='이름을 입력해주세요' size='large'/>
                </Form.Item>
                <Divider></Divider>
                <Form.Item label={<span className='upload-label'>판매가 </span>} name='price'
                    rules={[
                        {
                        required: true,
                        message: '판매가를 입력해주세요.',
                        },
                    ]}>
                    <InputNumber className='upload-price' min={0} placeholder='판매가를 입력해주세요' size='large'/>
                </Form.Item>
                <Divider></Divider>
                <Form.Item label={<span className='upload-label'>상품설명 </span>} name='decription'
                    rules={[
                        {
                        required: true,
                        message: '상품설명을 입력해주세요.',
                        },
                    ]}>
                    <Input.TextArea size='large' id='product-description' showCount maxLength={300} placeholder='상품설명을 작성해주세요.'/>
                </Form.Item>
                <Divider></Divider>
                <Form.Item>
                    <button id='submit-button' size='large' htmlType='submit'>상품등록하기</button>
                </Form.Item>
                <Divider></Divider>
            </Form>
        </div>
    );
};

export default UploadPge;