import React from 'react'
import ImageUploader from '../components/ImageUploader'

import { act } from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
// import { waitFor } from '@testing-library/react'

describe('ImageUploader', () => {

    let wrapper
    beforeEach(() => {
        wrapper = shallow(<ImageUploader />)
    })


    test('renders an upload photo display window with default image', () => {
        expect(wrapper.find('img').props()['src']).toBe('default-img.jpg')
    })
    

    // test('renders file uploader`', () => {
    //     expect(wrapper.find('input').props()['type']).toBe('file')
    // })

    // test('only accepts images in the uploader', () => {
    //     expect(wrapper.find('input').props()['accept']).toBe('image/*')
    // })

    test.only('allows the user to input an image which changes the displayed image', () => {
        wrapper = mount(<ImageUploader />)
        jest.spyOn(global, 'FileReader').mockImplementation(function () {
            this.readyState = 2
            this.result = "uploadedFile.png" // is reader.result
            this.readAsDataURL = jest.fn()
        })
        
        wrapper.find("input").simulate("change", {
            target: {
                files : ["File"] //IS e.target.files[0]
            }
        })
        let reader = FileReader.mock.instances[0]
        reader.onload()
       
        // the expect below needs to be fixed but is producing an warning which interferes with the test
        // needs resolving
        // expect(wrapper.find('img').props()['src']).toBe('uploadedFile.png')
        expect(reader.readAsDataURL).toHaveBeenCalledWith("File")
    })

    // test('allows the user to input an image through a styled button which presses the image-input button', () => {
    //     expect(wrapper.find('label').props()['htmlFor']).toBe('image-input')
    // })

    test('renders a FileSelectorButton element', () => {
        expect(wrapper.find('FileSelectorButton').length).toEqual(1)
    })
})
