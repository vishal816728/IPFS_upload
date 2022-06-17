import logo from './logo.svg';
import './App.css';
import Web3 from "web3"
import {useState} from "react"
import {create as ipfsHttpClient} from "ipfs-http-client"

const client=ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")

function App() {

  const [file,setFile]=useState()
  const [path,setPath]=useState()

  async function changefileHandler(e){
    e.preventDefault()
      const fl=e.target.files[0]
      setFile(fl)
  }
  async function clickHandler(){
    if(file){
      console.log("yes")
      const result=await client.add(file)
      console.log(result)
      console.log(`https://ipfs.infura.io/ipfs/${result.path}`)
      setPath(`https://ipfs.infura.io/ipfs/${result.path}`)
    }else{
      console.log("nothing found")
    }
  }
  return (
    <div className="App">
      <h1 className='topheading' style={{color:"white"}}>Welcome to the Ipfs <br /><span>Cloud Web3 Storage</span></h1>
      <form>
         
      <label for="file-upload" class="custom-file-upload">
    Custom Upload
</label>
<input id="file-upload" type="file" 
  onChange={changefileHandler}
/>
      </form>
      <button className='btn' onClick={clickHandler} >Upload</button>
      <br/>
      <br/>
      <h2><a href={path} target="_blank" style={{color:"black"}}>{path}</a></h2>
    </div>
  );
}

export default App;
