import React from 'react'
import ImageUploader from '../components/ImageUploader'

import { shallow, mount } from 'enzyme'
import axios from 'axios'
import { waitFor, cleanup } from '@testing-library/react'

describe('ImageUploader', () => {

    let wrapper
    beforeEach(() => {
        wrapper = shallow(<ImageUploader />)
    })


    test('renders an upload photo display window with default image', () => {
        expect(wrapper.find('img').props()['src']).toBe('default-img.jpg')
    })

    test('allows the user to input an image which changes the displayed image', (done) => {
        wrapper = mount(<ImageUploader />)
        jest.spyOn(global, 'FileReader').mockImplementation(function () {
            this.readyState = 2
            this.result = "uploadedFile.png" // is reader.result
            this.readAsDataURL = jest.fn()
        })

        console.log(wrapper.debug())
        
        wrapper.find("input").simulate("change", {
            target: {
                files : ["File"] //IS e.target.files[0]
            }
        })
        let reader = FileReader.mock.instances[0]
        reader.onload()
    
        setImmediate(() => {
            wrapper.update()
            console.log(wrapper.debug())

            expect(wrapper.find('img').props()['src']).toBe('uploadedFile.png')
            expect(reader.readAsDataURL).toHaveBeenCalledWith("File")
            done()
        })
    })

    test('renders a FileSelectorButton element', () => {
        expect(wrapper.find('FileSelectorButton').length).toEqual(1)
    })

    test('renders an upload button', () => {
        expect(wrapper.find('button').length).toEqual(1)
    })

    test('when upload button is clicked without the user changing the image from the default, the axios post function is not called', async () => {
        axios.post = jest.fn()

        wrapper = shallow(<ImageUploader />)
        await waitFor(() => wrapper.find('button').simulate('click')) 

        expect(axios.post).not.toHaveBeenCalled()
    })

    test('when upload button is clicked without the user changing the image from the default, information is displayed to the user', async () => {
        await waitFor(() => wrapper.find('button').simulate('click')) 

        expect(wrapper.find('#information').text()).toContain("Please select your own image")
    })

    test('when user tries to upload the default, but then corrects it to their own image, the information is then removed from display', (done) => {
        wrapper = mount(<ImageUploader />)

        console.log(wrapper.debug())
        wrapper.find('button').simulate('click')

        expect(wrapper.find('#information').text()).toContain("Please select your own image")

        
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


        setImmediate(() => {
            wrapper.update()
            console.log(wrapper.debug())

            expect(wrapper.find('#information').length).toEqual(0)
            done()
        })

    })

    test('if upload button has not been clicked, the information section is not visible', async () => {
        expect(wrapper.find('#information').length).toEqual(0)
    })

    test('when upload button is clicked when the user has changed the image, the axios post function is called', async () => {
        axios.post = jest.fn()
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
        await waitFor(() => wrapper.find('button').simulate('click')) 

        expect(axios.post).toHaveBeenCalled()
    })

    
})
