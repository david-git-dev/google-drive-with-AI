import { Cloudinary } from '@cloudinary/url-gen';
import { backgroundRemoval, grayscale, generativeBackgroundReplace, removeBackground  } from "@cloudinary/url-gen/actions/effect";

import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { useState } from "react";
import {saveAs  } from "file-saver";
const ImageCard =({asset})=>{
  const {public_id,display_name}=asset
  const[removeBackground,setRemoveBackground]= useState(false)
  const[isGrayScale,setGrayScale]= useState(false)
  const[prompt,setPrompt]= useState('')
  const downloadImage=()=>{
    const imgSrc = document.getElementById(public_id).src
    saveAs(imgSrc,public_id)
  }
  return(<>
  <article className="card">
    <div className="title-container"></div>
    <h4><span className='emoji'>♾️</span>{public_id}</h4>
      <h4>⫶</h4>
      <CldImage
      public_id={public_id}
      w={300}
      h={300}
      id={public_id}
      alt={public_id}
      removeBackground={removeBackground}
      isGrayScale={isGrayScale}
        prompt={prompt}
      />
      <div className="controls-container">
        <div className="control-container">
          <input type="checkbox" name="background" id="background" onChange={()=>setRemoveBackground(!removeBackground)}/>
          <label htmlFor="background">no background</label>
          </div>
          <div className="control-container">
          <input type="checkbox" name="greyscale" id="greyscale" onChange={()=>setGrayScale(!isGrayScale)}/>
          <label htmlFor="greyscale">grayscale</label>
          </div>
          <button onClick={downloadImage}>⤓ download</button>
      </div>
      <input type="text" value={prompt} placeholder='Start typing to change image' onChange={(e)=>{
        return setPrompt(e.target.value)}}/>
  </article>
    </>)

}
const CldImage = ({public_id,w,h,removeBackground,isGrayScale,prompt,id,alt}) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dwhhp3szw' } });
  const img = cld
        .image(public_id)
        if(removeBackground)
        img.effect(backgroundRemoval())
        if(isGrayScale)
          img.effect(grayscale())
        if(prompt.length>0)//agrega un spinner porque esto tarda
          img.effect(generativeBackgroundReplace().prompt(prompt)); // Transform the image: auto-crop to square aspect_ratio
        img.format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(w).height(h));

  return (<AdvancedImage cldImg={img} id={id} alt={alt}/>);
};
export default ImageCard