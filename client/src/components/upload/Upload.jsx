import React, { useRef } from 'react'


import { IKContext, IKImage, IKUpload } from 'imagekitio-react';

const urlEndpoint = 'https://ik.imagekit.io/n88jmkqz9';
const publicKey = 'public_Ge9cSoreIXVkKfRV4ae5fcyY5d0='; 
const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:5000/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};


const Upload = ({setImg}) => {
    const ikUploadRef=useRef(null)
    const onError = err => {
        console.log("Error", err);
      };
      
      const onSuccess = res => {
        console.log("Success", res);
        setImg(prev=>({...prev,isLoading:false,dbData:res}))
      };
      
      const onUploadProgress = progress => {
        console.log("Progress", progress);
      };
      
      const onUploadStart = evt => {
        const file= evt.target.files[0];
        const reader=new FileReader();
        reader.onloadend=()=>{
            setImg(prev=>({...prev,isLoading:true,aiData:{
                inlineData:{
                    data:reader.result.split(",")[1],
                    mimeType:file.type,
                }
            }}))

        };
        reader.readAsDataURL(file);
      };
  return (
    <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          style={{display:"none"}}
          ref={ikUploadRef}
        />
        <label onClick={()=>ikUploadRef.current.click()}><img src='/arrow.png' alt=''/></label>
      </IKContext>
  )
}

export default Upload