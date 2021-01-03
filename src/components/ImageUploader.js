import React, { useState } from 'react'
import defaultImage from '../images/default-img.jpg'
import '../css/ImageUploader.css'
import FileSelectorButton from './FileSelectorButton'
import imageUtils from '../utils/imageUtils'


function ImageUploader() {
    const [image, setImage] = useState(defaultImage)
    const [displayInfo, setDisplayInformationText] = useState(false)
    const [informationText, setInformationText] = useState("")
    const [file, setFile] = useState("")

    const handleChange = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2) {
                setImage(reader.result)
                setDisplayInformationText(false)
            }
        }
        reader.readAsDataURL(e.target.files[0])
        setFile(e.target.files[0])
    }

    const handleClick = async() => {
        let informationText
        if (image !== defaultImage) {
            try {
                const response = await imageUtils.sendImageToServer(file) 
                const resultText = `The image is ${response.isFake === true ? "fake": "real"} and scored ${response.percentageFake}% on the fakeometer`
                informationText = resultText
            } catch(e) {
                informationText = "Failed to upload your image. This is our bad."
            }
        } else {
            informationText = "Please select your own image"
        }
        setInformationText(informationText)
        setDisplayInformationText(true)
        
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
