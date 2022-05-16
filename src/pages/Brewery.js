import { useParams } from "react-router-dom"

function Brewery(props) {

    const id = useParams().id
    console.log(id)
    const brewery = props.breweries.find(element => element.id === id)

    return(
        <>
            <h2 className='mb-4'>{brewery.name}</h2>

            <section>
                <p>{brewery.street}</p>
                <p>{brewery.city}, {brewery.state}</p>
                <p><a href={brewery.website_url} target='_blank' rel='noreferrer'>Website</a></p>
            </section>
        </>
    )
}

export default Brewery