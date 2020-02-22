import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { createControl, validate, validateForm } from '../../form/formFramework';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/quizCreatorActions';

const createOptionControl = num => {
    return createControl(
        {
            label: `Option ${num}`,
            errorMessage: 'This field can not be empty',
            id: num
        },
        { required: true }
    );
};

const createFormControls = () => {
    return {
        question: createControl(
            {
                label: 'Enter the question',
                errorMessage: 'This field can not be empty'
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    };
};

class QuizCreator extends Component {
    state = {
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    };

    addQuestionHandler = event => {
        event.preventDefault();
        const { question, option1, option2, option3, option4 } = this.state.formControls;
        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ]
        };

        this.props.createQuizQuestion(questionItem);

        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });
    };

    createQuizHandler = event => {
        event.preventDefault();
        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });
        this.props.finishCreateQuiz();
    };

    submitHandler = event => {
        event.preventDefault();
    };

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        });
    };

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            let control = this.state.formControls[controlName];
            return (
                <React.Fragment key={index}>
                    <Input
                        key={controlName + index}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => this.onChangeHandler(event, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </React.Fragment>
            );
        });
    };

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        });
    };

    render() {
        const select = (
            <Select
                label='Choose right answer'
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandler}
                options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 }
                ]}
            />
        );
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Quiz Creation</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        {select}

                        <Button type='primary' onClick={this.addQuestionHandler} disabled={!this.state.isFormValid}>
                            Add question
                        </Button>

                        <Button type='success' onClick={this.createQuizHandler} disabled={this.props.quiz.length === 0}>
                            Create quiz
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    };
}

function mapDicpatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    };
}

export default connect(mapStateToProps, mapDicpatchToProps)(QuizCreator);
