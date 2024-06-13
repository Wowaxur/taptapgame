import React, {useEffect} from 'react';
import './App.css';
import Coin from "./components/coin/Coin";
import {useDispatch, useSelector} from "react-redux";
import {
    decrementEnergy,
    incrementScore,
    recoverEnergy,
    RootState,
    upgradeMaxEnergyLevel,
    upgradeRecoveryLevel,
    upgradeTapLevel
} from "./store/store";
import EnergyBar from "./components/energyBar/energyBar";
import ScoreBar from "./components/scoreBar/ScoreBar";
import UpgradeBar from "./components/upgradeBar/UpgradeBar";
import {TapValue} from "./store/LvlSystem";

function App() {
    const {score, currentEnergy, currentMaxEnergy} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const tapLVL = useSelector((state: RootState) => state.tapLVL);
    const tapValue = TapValue[tapLVL];
    useEffect(() => {
        const worker = new Worker(`${process.env.PUBLIC_URL}/energyWorker.js`);

        worker.postMessage('start');

        worker.onmessage = function (event) {
            if (event.data === 'recoverEnergy') {
                dispatch(recoverEnergy());
            }
        };

        return () => {
            worker.postMessage('stop');
            worker.terminate();
        };
    }, [dispatch]);

    const coinClick = () => {
        if (currentEnergy >= tapValue) {
            dispatch(incrementScore());
            dispatch(decrementEnergy());
        } else {
            console.log("Not enough energy to click the coin.");
        }
    };

    const upgradeClickLVL = () => {
        dispatch(upgradeTapLevel());
    };
    const upgradeRecoveryLVL = () => {
        dispatch(upgradeRecoveryLevel());
    }
    const upgradeMaxEnergyLVL = () => {
        dispatch(upgradeMaxEnergyLevel());
    }

    return (
        <div className="App">
            <header className="App-header"></header>
            <div className={'container'}>
                <ScoreBar score={score}/>
                <Coin tapValue={tapValue} currentEnergy={currentEnergy} onClick={coinClick}/>
                <br/>
                <EnergyBar
                    maxEnergy={currentMaxEnergy}
                    currentEnergy={currentEnergy}
                />
                <UpgradeBar
                    upgradeMaxEnergyLevel={upgradeMaxEnergyLVL}
                    upgradeRecoveryLevel={upgradeRecoveryLVL}
                    upgradeClickLVL={upgradeClickLVL}
                />
            </div>
        </div>
    );
}

export default App;