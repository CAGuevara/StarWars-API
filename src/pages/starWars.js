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
                        setShipInfo(responses)
                        // console.log(responses)

                        // responses.map((ship) => {

                        //         setShipInfo([...shipInfo,ship.data.results])
                        //         return (
                        //             <div>

                        //             </div>
                        //         )
                        //     }
                        // console.log(shipInfo)

                        // )


                    }))
        } catch (error) {
            console.error(error)

        } finally {
            shipInfo.forEach((ship)=>{
                const arrayShips=[]
                ship.data.results.forEach((oneship)=>{
                        console.log(oneship)
                        arrayShips.push(oneship)
                })
                console.log("Inside  the Finally",arrayShips)
                // setShipList([...shipList,ship.data.results])
            })
        }
    }
    useEffect(() => {
        getShip()
    }, [])
    console.log(shipList)
    return (

        <div className='main-container'>

            {/* {console.log(shipInfo)} */}
            <h1>STAR WARS STARSHIPS</h1>
            <div className='card-container'>
                {

                    shipInfo.map((ship) => {
                        ship.data.results.map((ship) => {
                            
                            // console.log(ship.name)
                            return (
                                <div>

                                    <div className='id-info' key={ship.name}>
                                        <h1>{ship.name} </h1>
                                        <h3> Model : {ship.model}</h3>
                                    </div>
                                </div>

                            )
                        })
                    })

                }
            </div>



        </div>
    );
}

export default Starwars;
