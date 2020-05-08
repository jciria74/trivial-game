import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../../context';
import './Quizz.scss';
import { shuffle } from '../../Functions/SharedFunctions'
import confetti from '../../confetti';


function Quizz() {

    const [fakeQ, setfakeQ] = useState([{
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "Which company did Valve cooperate with in the creation of the Vive?",
        correct_answer: "HTC",
        incorrect_answers: ["Oculus", "Google", "Razer"]
    },
    {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx?",
        correct_answer: "aaa",
        incorrect_answers: ["bbb", "ccc", "ddd"]
    },
    {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "Which company did Valve cooperate with in the creation of the Vive?",
        correct_answer: "HTC",
        incorrect_answers: ["Oculus", "Google", "Razer"]
    }]
    )

    //Contexto
    const valueFromContext = useContext(MyContext);
    //Pasamos las preguntas al estado
    const [question, setQuestion] = useState(valueFromContext.hooksState.dataAPI.results)
    const [isLoaded, setIsLoaded] = useState(valueFromContext.hooksState.isloaded)
    const [counterQ, setCounterQ] = useState(0)
    const [answers, setAnswers] = useState([])
    const [points, setPoints] = useState(0)
    const [validator, setValidator] = useState(false)
    const [fail, setFail] = useState(false)

    useEffect(() => {
        displayAnswers()
    }, [])

    //Función para recoger todas las respuestas
    let allAnswers = []
    let allAnswersShuffled = []
    const displayAnswers = () => {
        question.forEach((item) => {
            allAnswers = [...allAnswers, [...item.incorrect_answers, item.correct_answer]];
        })
        allAnswers.forEach((item)=>{
            allAnswersShuffled = [...allAnswersShuffled, shuffle(item)]
        })
        setAnswers(allAnswersShuffled);
    }

    //Función para comprobar si es correcto
    const check = (checkedItem) => {
        if (checkedItem === question[counterQ].correct_answer) {
            setValidator(true)
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
            setPoints(points - 10)
            setTimeout(() => {
                setCounterQ(counterQ + 1)
                setFail(false)
            }, 2000)
        }
    }

    return (
        <div className="Quizz">
            <div className="container">
                <div className="row">
                    <div className="col-12 info_header">
                        <div className="col-6 counter_question">
                            <p>{`QUESTION ${counterQ + 1} / ${question.length}`}</p>
                        </div>
                        <div className="col-6 points">
                            <p>{`POINTS: ${points}`}</p>
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
                        <div className={validator 
                            ? "correct_answer"
                            : "answer"
                            } 
                        
                        key={index} onClick={() => check(item)}>
                            <p>{item}</p>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default Quizz;