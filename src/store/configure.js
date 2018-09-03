// import thunk from 'redux-thunk'
import { rootReducer } from 'reducers/'
import { applyMiddleware, createStore, compose } from 'redux'
import { controllerMiddleware } from 'controller'

export const configureStore = (initialState) => {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(controllerMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
        )
    )
}
