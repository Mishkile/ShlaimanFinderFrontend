import React from 'react'
import { useSelector } from 'react-redux'
import Stage from '../Components/Stage'
import { useState } from 'react';
import "../../public/styles/Shows.css"
import BasicSelect from '../Components/Select';
import { Pagination } from '@mui/material';
import MyPagination from '../Components/MyPagination';

export default function Shows() {
    const shows = useSelector(state => state.showsData)
    const stages = useSelector(state => Object.keys(state.showsData))
    const [days, setDays] = useState(["first", "second", "third", "fourth"])
    const [selectedDay, setSelectedDay] = useState("first")


    return (
        <div className='shows-container'>
            <h1>Shows</h1>
            {/* <button onClick={() => handleSelectedDay("first")}>27 June (first)</button>
            <button onClick={() => handleSelectedDay("second")}>28 June (second)</button>
            <button onClick={() => handleSelectedDay("third")}>29 June (third)</button>
            <button onClick={() => handleSelectedDay("fourth")}>30 June (fourth)</button> */}
            <div> <br />
            <div className='pagination-container'>

                    <MyPagination setSelectedDay={setSelectedDay} />

            </div>
                {/* <BasicSelect days={days} setSelectedDay={setSelectedDay} /> */}
                <main className='stages-container'>
                    {stages.map((stage) => {
                        return <Stage key={stage} stageName={stage} shows={shows[stage][selectedDay] } day={selectedDay} />
                    })}
                </main>



            </div>
        </div>
    )
}
