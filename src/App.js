
import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {getDocs,onSnapshot } from 'firebase/firestore';

import { coll,auth } from "./fire"
import {BasicModal} from './BasicModal';
import ImageUpload from './ImageUpload';

function App() {
  const [posts, setPosts] = useState([])
 


// returns the data from firebase
  async function getPosts() {
    const citySnapshot = await getDocs(coll);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  }


  useEffect(() => {
    onSnapshot(coll, (data) => {
 //setPosts(data)
      getPosts().then((data) => {
        setPosts(data)
      })
    })


  }, [])
  return (
    <div className="app">
      <ImageUpload ></ImageUpload>

      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"></img>
      <BasicModal></BasicModal>
      </div>
      {posts.map((ele, index) => {

        return <Post username={ele.username} key={index} caption={ele.caption} imageUrl={ele.imageUrl}></Post>
      })}


    </div>
  )
}

export default App;
