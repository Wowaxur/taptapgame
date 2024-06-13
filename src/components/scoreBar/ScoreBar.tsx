import React from 'react';
import s from './scoreBar.module.css'

type ScoreBarType = {
    score : number
}
const ScoreBar = (props : ScoreBarType) => {

    return (
        <div className={s.scoreBar}>
            <h1>Coins : {props.score}</h1>
        </div>
    );
};

export default ScoreBar;