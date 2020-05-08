import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context";
import "./Home.scss";
import caratula from "../../img/openTrivia.png";
import {
    levelButtons,
    numberButtons,
} from "../../constants/constants";

function Home() {
    //Contexto
    const valueFromContext = useContext(MyContext);

    //Estado con las categorías que te da la API
    const [categories, setCategories] = useState();
    //Estado de Home con la información seleccionada para llamar a la API
    const [choices, setChoices] = useState({
        level: "",
        categoryNumber: "",
        numberQuestions: "",
    });

    //Llamada a la API para obtener las categorías
    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then((data) => data.json())
            .then((dataJSON) => {
                setCategories(
                    dataJSON.trivia_categories.filter(
                        (category) =>
                            !category.name.includes("Art") && !category.name.includes(":")
                    )
                );
            });
    }, []);

    //Función para llamar a la API
    useEffect(()=>{
        if (
            choices.level !== "" &&
            choices.categoryNumber !== "" &&
            choices.numberQuestions !== ""
        ) {
            fetch(
                `https://opentdb.com/api.php?amount=${choices.numberQuestions}&category=${choices.categoryNumber}&difficulty=${choices.level}&type=multiple`
            )
                .then((data) => data.json())
                .then((dataJSON) => {
                    valueFromContext.setHooksState({
                        ...valueFromContext.hooksState,
                        dataAPI: dataJSON,
                        isloaded: true,
                    });
                });
        }
    
    },[choices])
    

    return (
        <div className="Home">
            <div className="container">
                {/* Imagen */}
                <div className="row justifyCenter">
                    <div className="main-image ">
                        <img src={caratula} alt="caratula" className="title-image" />
                    </div>
                </div>
                {/* Categorías */}
                <div className="row">
                    <div className="col-12  title-selection">
                        <h5>SELECT YOUR CATEGORY</h5>
                    </div>
                </div>
                <div className="row col-12 justifyCenter alignCenter rowCategories">
                    <div className="button-row-categories col-12">
                        {categories &&
                            categories.map((item, index) => (
                                <div
                                    className={
                                        choices.categoryNumber === item.id
                                            ? "level-buttons-selected"
                                            : "level-buttons"
                                    }
                                    key={index}
                                    onClick={() =>
                                        setChoices({ ...choices, categoryNumber: item.id })
                                    }
                                >
                                    {item.name}
                                </div>
                            ))}
                    </div>
                </div>

                {/* NIVEL */}
                <div className="row col-12 justifyCenter alignCenter rowItems">
                    <h5>LEVEL</h5>

                    <div className="button-row col-4">
                        {levelButtons.map((item, index) => (
                            <div
                                className={
                                    choices.level === item.difficulty.toLowerCase()
                                        ? "level-buttons-selected"
                                        : "level-buttons"
                                }
                                key={index}
                                onClick={() =>
                                    setChoices({
                                        ...choices,
                                        level: item.difficulty.toLowerCase(),
                                    })
                                }
                            >
                                {item.difficulty}
                            </div>
                        ))}
                    </div>

                    {/* Nº PREGUNTAS */}
                    <h5>QUESTIONS</h5>
                    <div className="button-row col-4">
                        {numberButtons.map((item, index) => (
                            <div
                                className={
                                    choices.numberQuestions === item.numberQuestions
                                        ? "level-buttons-selected"
                                        : "level-buttons"
                                }
                                key={index}
                                onClick={() =>
                                    setChoices({
                                        ...choices,
                                        numberQuestions: item.numberQuestions,
                                    })
                                }
                            >
                                {item.numberQuestions}
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTON START */}
                <div className="start justifyCenter alignCenter">
                    {/*Llammos a la API si todos los campos del estado han sido seleccionados*/}
                    <Link to="/quizz">
                        <div
                            className={
                                choices.level !== "" &&
                                    choices.categoryNumber !== "" &&
                                    choices.numberQuestions !== ""
                                    ? "start-button"
                                    : "start-button-off"
                            }
                            
                        >
                            <p>START</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
