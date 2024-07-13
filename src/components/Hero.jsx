import { useState } from 'react'
import './Hero.css'
import { useEffect } from 'react'
import { response } from 'express'
import clock from '../assets/clock.png'

const Hero = () => {
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const fetchData = async() =>{
            const getData = await fetch('https://api9.parentune.com/content/v2/dailyfocus', {
                method: 'GET',
                headers: {
                  'accept': 'application/json, text/plain, /',
                  'accept-language': 'en-US,en;q=0.9',
                  'authtoken': '9467c5b4e290227a2a270f4a1ec2a37643b4a5dfd90a993b4e6ceb61ea0d5b5a',
                  'instanceid': 'c4b50b993092ab3ed5f35ad684f82b4e6d081a4ed65c49902d80dde82183057a',
                  'lang': 'en',
                  'origin': 'https://www.parentune.com',
                  'priority': 'u=1, i',
                  'referer': 'https://www.parentune.com/',
                  'sec-fetch-dest': 'empty',
                  'sec-fetch-mode': 'cors',
                  'sec-fetch-site': 'same-site',
                  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
                  'userid': '3781928'
                }
              })
                .then(response => response.json())
                .then(data => console.log(data))
                .then(setDetails(response))
                .then(setLoading(true))
                .catch(error => console.error('Error:', error));
        }
        fetchData();
    },[setDetails])
    
  return (
    <div>
        <h1 style={{fontWeight:'500', fontSize:'18px'}}>Today`s Focus</h1>
        {loading?"Data is loading":
            details.map((index, res) => {
        <div key={index}>
            <img src={res.thumb}/>
            <div>
            <h1>{res.title}</h1>
            <img src={clock}/>
            <p>{res.duration}</p>
            </div>
            <p>{res.summary}</p>
        </div>
            })
        }
    </div>
  )
}

export {Hero}