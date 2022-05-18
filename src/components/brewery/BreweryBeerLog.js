import { useState, useEffect } from "react"

function BreweryBeerLog(props) {

    const [beerLog, setBeerLog] = useState([])

    function getBeerLog() {
        fetch(`http://localhost:4000/logs/my-list/${props.username}/${props.thisBrewery.name}`)
            .then(response => response.json())
            .then(data => setBeerLog(data))
    }

    useEffect(() => {getBeerLog()}, [])

    function loaded() {
        return(
            <section>
                {beerLog.map(beer => (
                    <div key={beer.id}>
                        <p>
                            <b>{beer.name}</b><br />
                            <i>Style:</i> {beer.style}<br />
                            <i>Your Rating:</i> {beer.rating}
                        </p>
                    </div>
                ))}
            </section>
        )
    }

    return(
        <>
        <h3 className='mb-4'>Beers Logged</h3>
        {beerLog ? loaded() : <p>Loading...</p>}
        </>
    )
}

export default BreweryBeerLog