import React, { useEffect, useState } from 'react'
import defaultImage from '../images/default-img.jpg'
import '../css/ImageUploader.css'
import FileSelectorButton from './FileSelectorButton'
import axios from 'axios'


function ImageUploader() {
    const [image, setImage] = useState(defaultImage)
    const [displayInfo, setDisplayInfo] = useState(false)

    const handleChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setImage(reader.result)
                setDisplayInfo(false)
                console.log(displayInfo)
                console.log(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleClick = async() => {
        
        if (image !== defaultImage) {
            try {
                await axios.post('url', 'date')
                console.log("get successss")
            } catch(e) {
                // need to add test for error section
                // has been added to prevent browswer warnings
                console.log("error")
            }
        } else {
            setDisplayInfo(true)
            console.log(displayInfo)
        }
        
    }

    return (
        <div className="container">
            <img className="uploaded-img" id="uploaded-img" src={image} alt="user-image" />

            <FileSelectorButton handleChange={handleChange}/>

            <button onClick={handleClick}>Upload</button>

            {displayInfo === false ? null: 
            <h1 id="information">Please select your own image</h1>}
            
        </div>
        
    )
}

export default ImageUploader
