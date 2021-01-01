import React, { useState } from 'react'
import Image from '../images/default-img.jpg'
import '../css/ImageUploader.css'
import FileSelectorButton from './FileSelectorButton'


function ImageUploader() {
    const [image, setImage] = useState(Image)

    const handleChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <div className="container">
            <img className="uploaded-img" id="uploaded-img" src={image} alt="user-image" />

            <FileSelectorButton handleChange={handleChange}/>

            {/* <button onClick={fileUploadHandler}>Upload</button> */}
        </div>
        
    )
}

export default ImageUploader
