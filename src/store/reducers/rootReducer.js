import {combineReducers} from 'redux'
import quizReducer from './quizReducer'
import quizCreatorReducer from './quizCreatorReducer'
import authReducer from './authReducer'


export default combineReducers({
    quiz: quizReducer,
    create: quizCreatorReducer,
    auth: authReducer,
})