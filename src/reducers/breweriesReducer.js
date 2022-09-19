import { FETCH_BREWERY, FETCH_BREWERY_LOG, FETCH_BREWERIES, SEARCH_BREWERIES, ADD_BREWERY, DELETE_BREWERY } from '../actions/types'

let breweriesDefault = {
    myList: [],
    searchResults: [],
    breweryLog: [],
    selectedBrewery: {},
    fetchCount: 0
}

function breweriesReducer(breweries = breweriesDefault, action) {
    let newFetchCount = breweries.fetchCount + 1
    switch (action.type) {
        case SEARCH_BREWERIES:
            return { ...breweries, searchResults: action.payload, fetchCount: newFetchCount }
        case FETCH_BREWERY:
            return { ...breweries, selectedBrewery: action.payload, fetchCount: newFetchCount }
        case ADD_BREWERY:
            return { ...breweries, fetchCount: newFetchCount }
        case DELETE_BREWERY:
            return { ...breweries, fetchCount: newFetchCount }
        case FETCH_BREWERIES:
            return { ...breweries, myList: action.payload, fetchCount: newFetchCount }
        case FETCH_BREWERY_LOG:
            return { ...breweries, breweryLog: action.payload, fetchCount: newFetchCount}
    }
    return breweries
}

export default breweriesReducer