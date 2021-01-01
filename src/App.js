import React from 'react'
import './css/App.css';
import ImageUploader from './components/ImageUploader.js'
import SubmitButton from './components/SubmitButton.js'
// import { useState, useEffect } from 'react';


function App() {

  return (
    <div className="app">
      <div className="container">
        <h1 className="heading">Is my photo fake?</h1>
        <ImageUploader />
        {/* <SubmitButton /> */}
      </div>
      
    </div>
  );
}

export default App
