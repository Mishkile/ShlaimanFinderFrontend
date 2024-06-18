import React, { useEffect } from 'react'
import Show from './Show'
import "../../public/styles/Stage.css"
export default function Stage({ stageName, shows, day }) {
    useEffect(() => {
        const container = document.querySelector('.shows-container');
        if (container) {
            container.scrollLeft = 0; // Scroll to the leftmost position
        }
    }, []);
    return (
        <div className='stage'>
            <h3>{stageName}</h3>

            <div className='shows-container'>
                {shows.map((show, index) => {
                    return <Show key={index} day={day} showData={show} />
                })}

                </div>
        </div>
    )
}
