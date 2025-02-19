import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";

const Home = () => {
  const [assets,setAssets] = useState([])
  const onHandleNewUpload = asset =>{
    setAssets(prev=>[asset,...prev])
  }
  const [searchTerm,setSearchTerm] = useState("")
  const getData = async()=>{
    try {
      console.log('escribiendo',searchTerm)
      const options = {method: 'GET', headers: {Authorization: 'Basic Og=='}};
      if(searchTerm.length>0)
        {

          options.headers= {
            Authorization: `Basic ${btoa(`${import.meta.env.VITE_KEY}:${import.meta.env.VITE_SECRET}`)}`
          }
          const res = await fetch(
            `/api/v1_1/${import.meta.env.VITE_CLOUD_NAME}/resources/search?expression=${searchTerm}* OR tags=${searchTerm} OR resource_type:any&created_at:desc&max_results=5`,
           options
          );
          const media = await res.json()
          console.log({resources:media})
               setAssets(media)//only works if you have a backend....fuck haha
        }
        else{
          const res = await fetch('https://res.cloudinary.com/dwhhp3szw/any/list/image.json', options)//aqui modificale para las mamadas del searchTerm checate en la documentacion donde dice lo del resources porque no tenemos backend entonces hay que hacer mamadas....
          const media = await res.json()
          console.log(media)
               setAssets(media)

        }
    } catch (error) {
console.log(error)
    }
  }
  useEffect(()=>{getData()},[searchTerm])
  return (<>
    <Header />
    <div className="main-container">
      <SideBar onHandleNewUpload={onHandleNewUpload}/>
      <Dashboard assets={assets} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
  </>)
}
export default Home;