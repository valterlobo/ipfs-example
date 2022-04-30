import logo from './logo.svg';
import './App.css';

import { useState } from 'react'
import { create } from 'ipfs-http-client'

const client = create('https://ipfs.infura.io:5001/api/v0')

function App() {
  const [fileUrl, updateFileUrl] = useState(``)
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      console.log(added);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>IPFS Example</h1>
        <input
          type="file"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img src={fileUrl} width="600px" />
          )
        }

        <h6>{fileUrl}</h6>

      </header>

    </div>
  );
}

export default App;
