import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';

const Starwars = () => {
    const [shipInfo, setShipInfo] = useState([])
    const [shipList,setShipList] = useState([])

    const getShip = async () => {

        try {
            // const response = await axios.get('http://swapi.dev/api/starships/')
            // setShipInfo(response.data.results)
            // page # 2 -->  "https://swapi.dev/api/starships/?page=2"

            let one =
                "http://swapi.dev/api/starships/";
            let two =
                "https://swapi.dev/api/starships/?page=2";
            let three =
                "https://swapi.dev/api/starships/?page=3";
            let four =
                "https://swapi.dev/api/starships/?page=4";


            const requestOne = axios.get(one);
            const requestTwo = axios.get(two);
            const requestThree = axios.get(three);
            const requestFour = axios.get(four);

            axios
                .all([requestOne, requestTwo, requestThree, requestFour])
                .then(
                    axios.spread((...responses) => {
                      const arrayShips=[]
                        responses.forEach((ship)=> {
                            // console.log(ship.data.next)
                            arrayShips.push(ship.data.results)
                        })
                        setShipInfo(arrayShips.flat())    
                        console.log(arrayShips)                  

                    }))
        } catch (error) {
            console.error(error)

        } 
    }
    useEffect(() => {
        getShip()
    }, [])
    return (
        <div className='main-container'>
            <h1 className="hw-title">STAR WARS STARSHIPS</h1>
            <div className='card-container'>
                {
                   shipInfo.map((ship) => {
                    
                            return (
                                    <div className='id-info' key={ship.name}>
                                        <h1>{ship.name} </h1>
                                        <h2>Model</h2>
                                        <h3>{ship.model}</h3>
                                        <h2>Manufacturer</h2>
                                        <h3>{ship.manufacturer}</h3>
                                        
                                    </div>
                            )        
                    })

                }
            </div>



        </div>
    );
}

export default Starwars;
