import axios from 'axios'

import { backend, openBrewery } from '../apis'
import { FETCH_BREWERY, FETCH_BREWERIES, SEARCH_BREWERIES, ADD_BREWERY, DELETE_BREWERY} from './types'

export const fetchBrewery = id => async dispatch => {
    const response = await openBrewery.get(id)
    dispatch({ type: FETCH_BREWERY, payload: response.data })
}

export const addBrewery = () => async (dispatch, getState) => {
    const user = getState().auth.user
    const brewery = getState().breweries.selectedBrewery
    let newBrewery = {
        user,
        breweryId: brewery.breweryId,
        name: brewery.name,
        location: `${brewery.city}, ${brewery.state}`,
        street: brewery.street,
        url: brewery.website_url
    }
    const response = await backend.post('breweries/', newBrewery)
    if (response.data.success) {
        dispatch({ type: ADD_BREWERY })
    }
}

export const fetchBreweries = () => async (dispatch, getState) => {
    const user = getState().auth.user
    const response = await backend.get(`breweries/${user}`)
    if (response.data.success) {
        dispatch({ type: FETCH_BREWERIES, payload: response.data.data })
    }
}

export const deleteBrewery = () => async (dispatch, getState) => {
    const user = getState().auth.user
    const id = getState().breweries.selectedBrewery.breweryId
    const response = await backend.delete(`breweries/${user}/${id}`)
    if (response.data.success) {
        dispatch({ type: DELETE_BREWERY })
    }
}

export const searchBreweries = location => async dispatch => {
    const response = await axios.get('https://api.openbrewerydb.org/breweries/', {
        params: {
            by_city: location.city,
            by_state: location.state,
            per_page: 50
        }})
    dispatch({ type: SEARCH_BREWERIES, payload: response.data })
}