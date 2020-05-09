import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../../context';
import './Quizz.scss';
import { shuffle } from '../../Functions/SharedFunctions'
import confetti from '../../confetti';
import GameOver from '../GameOver/GameOver'


function Quizz() {

    //Contexto
    const valueFromContext = useContext(MyContext);
    //Pasamos las preguntas al estado
    const [question, setQuestion] = useState(valueFromContext.hooksState.dataAPI.results)
    //Elementos del estado de Qizz
    const [counterQ, setCounterQ] = useState(0)
    const [answers, setAnswers] = useState([])
    const [points, setPoints] = useState(valueFromContext.hooksState.points)
    const [validator, setValidator] = useState(false)
    const [fail, setFail] = useState(false)

    //Recoge
    useEffect(() => {
        displayAnswers()
    }, [])

    useEffect(() => {
        valueFromContext.setHooksState({ ...valueFromContext.hooksState, points: points })
    }, [points])

    //Función para recoger todas las respuestas
    const displayAnswers = () => {
        let allAnswers = [];
        let allAnswersShuffled = [];
        //Recogemos todas las respuestas en un array
        question.forEach((item) => {
            allAnswers = [...allAnswers, [...item.incorrect_answers, item.correct_answer]];
        })
        //Barajamos las respuestas
        allAnswers.forEach((item) => {
            allAnswersShuffled = [...allAnswersShuffled, shuffle(item)];
        })
        //Guardamos las respuestas en el estado
        setAnswers(allAnswersShuffled);
    }

    //Función para comprobar si es correcto
    const check = (checkedItem, index) => {
        if (checkedItem === question[counterQ].correct_answer) {
            setValidator(index)
        }
        if (checkedItem === question[counterQ].correct_answer) {
            setTimeout(() => {
                setCounterQ(counterQ + 1)
                setValidator(false)
            }, 2000)
            setPoints(points + 10)
            confetti.start()
            setTimeout(() => {
                confetti.stop()
                setValidator(false)
            }, 2000)
        } else {
            setFail(true)
            if (points !== 0) {
                setPoints(points - 5);
            }
            setTimeout(() => {
                setCounterQ(counterQ + 1)
                setFail(false)
            }, 2000)
        }
    }

    return (
        <div className="Quizz">
            {
                (counterQ < answers.length)

                    ?
                    <div className="container">
                        <div className="row header_game">
                            <div className="col-12 info_header">
                                <div className="col-12 col-md-6 counter_question">
                                    <div className="col-6  counter_question_letters">
                                        <p>{`QUESTION`}</p>
                                    </div>
                                    <div className="col-6 ">
                                        <div className="col-12  counter_question_numbers">
                                            <p>{`${counterQ + 1} / ${question.length}`}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 points">
                                    <div className="col-6  points_letter">
                                        <p>{`POINTS`}</p>
                                    </div>
                                    <div className="col-6 ">
                                        <div className="points_number">
                                            <p>{points}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10 progress_bar">
                            </div>
                            <div className="col-2 timer">
                            </div>
                        </div>
                        <div className="row justifyCenter">
                            <div className={fail
                                ? "question_fail"
                                : "question"}>
                                {<p>{question[counterQ].question}</p>}
                            </div>
                        </div>
                        <div className="row">
                            {
                                answers[counterQ] && answers[counterQ].map((item, index) =>
                                    <div className="col-6 col-md-6 ">
                                        <div className={
                                            validator === index
                                                ? "correct_answer"
                                                : "answer"
                                        }
                                            key={index} onClick={() => check(item, index)}>
                                            <p>{item}</p>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>

                    : <div>
                        <GameOver />
                    </div>
            }

        </div>
    )
}

export default Quizz;