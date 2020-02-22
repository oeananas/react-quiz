import React from 'react';
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'


const Answerslist = props => (
    <ul className={classes.Answerslist}>
        {props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    key={index}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answer.id] : null}
                />
            )
        })}
    </ul>
)

export default Answerslist