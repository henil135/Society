import React from 'react'
import config from './Constant';

export default function Constant() {
    const backendApiUrl = config.BACKEND_API_URL;
  return (
    <div>
      <h1>Backend API URL</h1>
      <p>{backendApiUrl}</p>
    </div>
  )
  
}
