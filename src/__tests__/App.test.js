import React from 'react'
import { render, screen } from '@testing-library/react';
import App from '../App';
import user from '@testing-library/user-event'

// setup file
import { shallow, mount } from 'enzyme';

describe.skip('App', () => {

  let wrapper 
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  test('renders the title of the page', () => {
    expect(wrapper.find('h1').text()).toContain("Is my photo fake?")
  })

  test('renders the upload image component', () => {
    expect(wrapper.find('ImageUploader').length).toEqual(1)
  })

  test('renders the submit button component', () => {
    expect(wrapper.find('SubmitButton').length).toEqual(1)
  })

  test.skip('displays user image when they successfully upload a file', ()=> {
    wrapper = mount(<App />)
    console.log(wrapper.debug())
    const file = new File(["hello"], "hello.png", { type: "image/png" })
    const input = screen.getByRole('button')
    // const input = screen.getByTestId("#upload-btn")
    // screen.getByRole('button', {name: /username/i})

    user.upload(input, file)

    expect(wrapper.find('img').prop('src')).toEqual('hello.png')
    // expect(input.files[0]).toStrictEqual(file)
    // expect(input.files).toHaveLength(1)
  })

})

