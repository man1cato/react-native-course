import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import placesReducer from './reducers/places'
import uiReducer from './reducers/ui'
import authReducer from './reducers/auth'



const rootReducer = combineReducers({
   places: placesReducer,
   ui: uiReducer,
   auth: authReducer
})

let composeEnhancers

if (__DEV__) {
   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

export default () => createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk))
)