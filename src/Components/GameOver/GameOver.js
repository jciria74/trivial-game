import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import "./GameOver.scss";
import MyContext from "../../context";
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import caratula from "../../img/openTrivia.png";
import confetti from '../../confetti';

function GameOver() {
    //Contexto
    const valueFromContext = useContext(MyContext);
    //Icono de Fontawesome
    const gamepad = <FontAwesomeIcon icon={faGamepad} size="2x" color="#4B4D80" /> //Gamepad Icon

    // const confettiParty = () => {
    //     confetti.start()
    //         setTimeout(() => {
    //             confetti.stop()
    //         }, 5000)
    // }

    // confettiParty()

    return (
        <div className="GameOver">
            <div className="container-fluid">
                <div className="row justifyCenter">
                    <div className="main-image ">
                        <img src={caratula} alt="caratula" className="title-image" />
                    </div>
                </div>
                <div className="row justifyCenter alignCenter">
                    <div className="resume_card justifyCenter alignCenter">
                        <div className=" col-12 justifyCenter alignCenter">
                            <h5>GAME OVER</h5>
                        </div>
                        <div className=" col-12 final_points  justifyCenter alignCenter">
                            <h3 className="points_style">{`${valueFromContext.hooksState.points} POINTS`}</h3>
                        </div>
                        <Link to='/'><div className=" col-12 initialize justifyCenter alignCenter">
                            <p>PLAY AGAIN</p>{gamepad}
                        </div></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameOver;
