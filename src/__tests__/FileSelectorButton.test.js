import React from 'react'

import { shallow } from 'enzyme'
import FileSelectorButton from '../components/FileSelectorButton'

describe('FileSelectorButton', () => {

    let wrapper
    beforeEach(() => {
        wrapper = shallow(<FileSelectorButton handleChange="handleChangeStub"/>)
    })

    test('renders file uploader`', () => {
        expect(wrapper.find('input').props()['type']).toBe('file')
    })

    test('only accepts images in the uploader', () => {
        expect(wrapper.find('input').props()['accept']).toBe('image/*')
    })

    test('allows the user to input an image through a styled button which presses the image-input button', () => {
        expect(wrapper.find('label').props()['htmlFor']).toBe('image-input')
    })
})
