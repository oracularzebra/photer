import { useState } from "react"

export default function InsertImage({setImages, index}){

    const [image, setImage] = useState(null);

    return (
        <div>
            <input type="file" onChange={(e)=>{
                const image=e.currentTarget.files[0];
                setImage(image)
                //TODO: Check if image already exists in the list (search by name)
                setImages(images=>images.map((oldImage, i)=>i==index?image:oldImage))
            }}/>
            <img src={image?URL.createObjectURL(image):"#"} width={500} height={500}/>
        </div>
    )
}