import React from 'react';
import classes from './ActiveQuize.module.css'
import Answerslist from './AnswersList/AnswersList';


const ActiveQuize = props => (
    <div className={classes.ActiveQuize}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.answerNumber} from {props.quizLength}</small>
        </p>
        <Answerslist
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
)

export default ActiveQuize