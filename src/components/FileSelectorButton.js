import React from 'react'
import '../css/FileSelectorButton.css'

function FileSelectorButton(props) {
    return (
        <div>
            <input className='file-selector' id='image-input' type='file'  onChange={props.handleChange} accept='image/*'/>
            <label htmlFor='image-input' className='image-uploader'>
                <i className='material-icons'>add_photo</i>
                Choose a photo to check
            </label>
        </div>
    )
   
}

export default FileSelectorButton
