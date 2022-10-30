import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveAs } from 'file-saver';

import './Style.css';


const MemeGenerated = ()=>{

    const navigate = useNavigate();
    const location=useLocation();

    const url = new URLSearchParams(location.search).get('url')
    const [Downloaded , setDownloaded]=useState(false);
    const DownloadMeme =()=>{
        saveAs(url,'Meme.jpg');
        setDownloaded(true);
    };


    return (
        <div>
            {/* this means if url is exist then show img otherwise show the error  */}
            {url && <img className='meme_img' alt='meme' src={url}/>}
            <button onClick={DownloadMeme} className='button btn_download'>
               {
                Downloaded ? 'Saved !':'Download'
               }
            </button> 
            <button onClick={()=> navigate('/')} className="button btn_create">More</button>
        </div>
    );
}

export default MemeGenerated;