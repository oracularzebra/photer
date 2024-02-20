import { useEffect, useState } from "react";
import InsertImage from "./InsertImage";
import { uploadImage } from "../../firebase/firebase-config";
import { checkAuth } from "../../firebase/firebase-config";
export default function InsertImages(){

    checkAuth;

    const [images, setImages] = useState(Array.from({length:10}));
    
    
    function uploadImages(){
        const time=new Date().getTime();
        console.log('clicked upload')
        //TODO: Add images in database
        images.forEach((image)=>{
            console.log(image);
            if(image != null || image != undefined) uploadImage(image, time);
        })
        //TODO: Add Entry in file 
    }
    return (
        <>
            {Array.from({length:10}).map((_, i)=>{
                return (
                    <InsertImage setImages={setImages} index={i} key={i}/>
                )
            })}
            <button onClick={uploadImages}>Upload All</button>
        </>
    )
}