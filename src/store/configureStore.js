import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import placesReducer from './reducers/places'


const rootReducer = combineReducers({
   places: placesReducer
})

let composeEnhancers

if (__DEV__) {
   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

export default () => createStore(
   rootReducer,
   composeEnhancers()
)