import React, { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Style.css';

const Meme =()=>{

    const [memes,setMemes]=useState([]);
    const [memeIndex, setMemeIndex]=useState(0);
    const [captions, setCaptions]=useState([]);
    

    const navigate=useNavigate();

    // a function to shuffle memes display order everytime we reloud the page
    const shuffleMeme =(array)=>{
        for(let i=array.length-1; i>0;i--){
            const j = Math.floor(Math.random()*i);
            const aux=array[i];
            array[i]=array[j];
            array[j]=aux;
        }
    };


    const GenerateMeme =()=>{
        const current_meme=memes[memeIndex];
        const formData =new FormData();

        formData.append('username','HamzaSamaiy');
        formData.append('password','qlskdfjlsqj');
        formData.append('template_id',current_meme.id);
        captions.forEach((c,i)=> formData.append(`boxes[${i}][text]`,c));

        fetch('https://api.imgflip.com/caption_image',{
            method:'POST',
            body:formData,
        }).then(res => {
            res.json().then(res => {
                navigate(`/generated?url=${res.data.url}`)
            });
        });

    };


    const updateCaption =(e, index)=>{
        const value=e.target.value || '';
        setCaptions(
            captions.map((c,i)=>{
                if(index===i){
                    return value;
                }else{
                    return c;
                }
            })
        );
  
    };

    // This useEfeect is to set the number of fields in the caption state and put empty strings in per field in the array
    useEffect(()=>{
        if(memes.length){
           setCaptions(Array(memes[memeIndex].box_count).fill('')) 
        }
    },[memeIndex, memes]);
    
    useEffect(()=>{
        console.log(captions)
    },[captions])

    // Here i used useEffect to fetch memes from imgfilp api only when the page louds
    useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes').then(res=>{
        res.json().then(res=>{
            const _meme=res.data.memes;
            shuffleMeme(_meme)
            setMemes(_meme)
        });
        });
    }, []);



    return(
        memes.length ?
        <div className="container">
            
            <img src={memes[memeIndex].url} alt='meme' className='meme_img' />
            {
                captions.map((c,index)=>(
                    <input onChange={(e)=>updateCaption(e,index)} className="input" key={index}/>
                ))
            }
            <button onClick={GenerateMeme} className="button btn_create">Create</button>
            <button onClick={()=>setMemeIndex(memeIndex+1)} className="button btn_skip">Skip</button>
        </div>
         
         
         :<></>
    
        
    );
}

export default Meme;