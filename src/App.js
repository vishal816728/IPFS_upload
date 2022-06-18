import logo from './logo.svg';
import './App.css';
import Web3 from "web3"
import {useState,useEffect} from "react"
import contractAbi from "../src/contracts/DStorage.json"
import {create as ipfsHttpClient} from "ipfs-http-client"

const client=ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")

const contractAddress="0x334dAbd1b4Ff854f2c331288eD57840D567daFef"

function App() {

  const [file,setFile]=useState()
  const [path,setPath]=useState()
  const [filetype,setFiletype]=useState()
  const [fileName,setFileName]=useState()
  const [fileDes,setFileDes]=useState()
  const [ipfsContract,setIpfsContract]=useState()
  const [account,setAccount]=useState()

  useEffect(()=>{
        loadWeb()
        loadBlockChainData()
  },[])

  async function loadWeb(){
         console.log(window.web3)
         console.log(window.ethereum)
       if(window.web3 && window.ethereum){
         try{
         window.web3=new Web3(window.ethereum)
         window.ethereum.enable()
         }catch(err){
           console.log(err)
         }
       }

  }
  
  async function loadBlockChainData(){
        //  loading the contract
        if(window.web3){
        const contract=new window.web3.eth.Contract(contractAbi.abi,contractAddress)
      
        console.log(contract)
        setIpfsContract(contract)
        }

        const accounts=await window.web3.eth.getAccounts()
        setAccount(accounts[0])

  }

  async function changefileHandler(e){
    e.preventDefault()
      const fl=e.target.files[0]
      setFile(fl)
  }

  async function filetypeinputhandler(e){
        const filet=e.target.value
        setFiletype(filet)
        console.log(filet)
  }

  async function filenameinputhandler(e){
         const fileN=e.target.value
         setFileName(fileN)
         console.log(fileN)
  }

  async function filedescriptioninputhandler(e){
        const fileD=e.target.value
         setFileDes(fileD)
         console.log(fileD)
  }

  async function clickHandler(){
    var result;
    if(file){
      console.log("yes")
      result=await client.add(file)
      // console.log(result)
      // console.log(`https://ipfs.infura.io/ipfs/${result.path}`)
      // setPath(`https://ipfs.infura.io/ipfs/${result.path}`)
    }else{
      console.log("nothing found")
    }

    if(result && filetype && fileName && fileDes && ipfsContract && account){
      try{
       const v=await ipfsContract.methods.uploadFiles(result.path,filetype,fileName,fileDes).send({from:account})
       console.log(v.events.FileEvent.returnValues)
       setPath(`https://ipfs.infura.io/ipfs/${result.path}`)
      }catch(err){
        console.log(err)
      }
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
    <input type="text" className='inputimg1' placeholder='File_Type' onChange={filetypeinputhandler}/>
    <input type="text" className='inputimg2' placeholder='File_Name' onChange={filenameinputhandler}/>
    <input type="text" className='inputimg3' placeholder='File_Description' onChange={filedescriptioninputhandler}/>

      </form>
      <button className='btn' onClick={clickHandler} >Upload</button>
      <br/>
      <br/>
      <h2><a href={path} target="_blank" style={{color:"white"}}>{path}</a></h2>
    </div>
  );
}

export default App;



