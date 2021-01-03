import React, { useState } from 'react'
import defaultImage from '../images/default-img.jpg'
import '../css/ImageUploader.css'
import FileSelectorButton from './FileSelectorButton'
import axios from 'axios'


function ImageUploader() {
    const [image, setImage] = useState(defaultImage)
    const [displayInfo, setDisplayInfo] = useState(false)
    const [informationText, setInformationText] = useState("")
    const [file, setFile] = useState("")

    const handleChange = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2) {
                setImage(reader.result)
                setDisplayInfo(false)
            }
        }
        reader.readAsDataURL(e.target.files[0])
        setFile(e.target.files[0])
    }

    const handleClick = async() => {
        let informationText
        if (image !== defaultImage) {
            try {
                const formData= new FormData()
                formData.append(process.env.REACT_APP_BACKEND_URL, file)
                const result = await axios.post(formData)
                const resultText = `The image is ${result.isFake === true ? "fake": "real"} and scored ${result.percentageFake}% on the fakeometer`
                informationText = resultText
            } catch(e) {
                informationText = "Failed to upload your image. This is our bad."
            }
        } else {
            informationText = "Please select your own image"
        }
        setInformationText(informationText)
        setDisplayInfo(true)
        
    }

    return (
        <div className="container">
            <img className="uploaded-img" id="uploaded-img" src={image} alt=""/>

            <FileSelectorButton handleChange={handleChange}/>

            <button onClick={handleClick}>Upload</button>

            {displayInfo === false ? null: 
            <h1 id="information">{informationText}</h1>}
            
        </div>
        
    )
}

export default ImageUploader
