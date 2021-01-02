import React from 'react'
import App from '../App';

import { shallow } from 'enzyme';

describe('App', () => {

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

})
