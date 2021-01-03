import React from 'react'
import ImageUploader from '../components/ImageUploader'

import { shallow, mount } from 'enzyme'
import axios from 'axios'
import { waitFor} from '@testing-library/react'
import sinon from 'sinon'
import imageUtils from '../utils/imageUtils'

describe('ImageUploader', () => {

    let wrapper
    beforeEach(() => {
        jest.clearAllMocks()
        jest.resetModules()
        process.env.REACT_APP_BACKEND_URL = "testUrl"
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


    test('when upload button is clicked without the user changing the image from the default, information is displayed to the user', async () => {
        await waitFor(() => wrapper.find('button').simulate('click')) 

        expect(wrapper.find('#information').text()).toContain("Please select your own image")
    })

    test('when user tries to upload the default, but then corrects it to their own image, the information is then removed from display', (done) => {
        wrapper = mount(<ImageUploader />)

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

            expect(wrapper.find('#information').length).toEqual(0)
            done()
        })

    })

    test('if upload button has not been clicked, the information section is not visible', async () => {
        expect(wrapper.find('#information').length).toEqual(0)
    })

    
    test('when upload button is clicked without the user changing the image from the default, the sendImageToServer function is not called', async () => {
        imageUtils.sendImageToServer = jest.fn()

        wrapper = shallow(<ImageUploader />)
        await waitFor(() => wrapper.find('button').simulate('click')) 

        expect(imageUtils.sendImageToServer).not.toHaveBeenCalled()
    })

    test('if there is an error uploading the photo, returns an error message to the user', (done) => {
        sinon.stub(imageUtils, 'sendImageToServer').throws(new Error("some fake error"))
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
        wrapper.find('button').simulate('click')

        setImmediate(() => {
            wrapper.update()

            expect(wrapper.find('#information').text()).toContain("Failed to upload your image. This is our bad.")
            done()
        })
    })

    test("if there is an error uploading the photo, but then the user tries again and succeeds, the info message disappears", (done) => {
        sinon.stub(imageUtils, 'sendImageToServer').throws(new Error("some fake error"))
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
        wrapper.find('button').simulate('click')
        sinon.restore()
        sinon.stub(imageUtils, 'sendImageToServer').returns("successful request")
        wrapper.find('button').simulate('click')

        setImmediate(() => {
            wrapper.update()

            expect(wrapper.find('#information').text()).not.toContain("Failed to upload your image. This is our bad.")
            done()
        })
    })

    test('when upload button is clicked when the user has changed the image, the sendImageToServer function is called with formparams', async () => {
        imageUtils.sendImageToServer = jest.fn()
        const formData= new FormData()
        formData.append("testUrl", "testFile")
        wrapper = mount(<ImageUploader />)
        jest.spyOn(global, 'FileReader').mockImplementation(function () {
            this.readyState = 2
            this.result = "uploadedFile.png" // is reader.result
            this.readAsDataURL = jest.fn()
        })
        
        wrapper.find("input").simulate("change", {
            target: {
                files : ["testFile"] //IS e.target.files[0]
            }
        })
        let reader = FileReader.mock.instances[0]
        reader.onload()
        await waitFor(() => wrapper.find('button').simulate('click')) 

        expect(imageUtils.sendImageToServer).toBeCalledWith("testFile")
    })

    test('when api sends successful response with fake image, the user is displayed info on if the image is fake and the percentage of fake in the image', (done) => {
        sinon.stub(imageUtils, 'sendImageToServer').returns({isFake: true, percentageFake: "testPercentage"})
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
        wrapper.find('button').simulate('click')
        
        setImmediate(() => {
            wrapper.update()

            expect(wrapper.find('#information').text()).toContain("The image is fake and scored testPercentage% on the fakeometer")
            done()
        })

    })

    afterEach(() => {
        sinon.restore()
    })
    
})
