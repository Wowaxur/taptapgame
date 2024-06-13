import React from 'react';
import s from './upgradeBar.module.css'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {IncrementMaxEnergy, IncrementRecoveryLVL, IncrementTapLVL} from "../../store/LvlSystem";

type UpgradeBarProps = {
    upgradeClickLVL: () => void;
    upgradeRecoveryLevel: () => void;
    upgradeMaxEnergyLevel: () => void;
}

const UpgradeBar = (props: UpgradeBarProps) => {
    const currentTapLVL = useSelector((state: RootState) => state.tapLVL);
    const currentRecoveryLVL = useSelector((state: RootState) => state.recoveryLVL);
    const currentMaxEnergyLVL = useSelector((state: RootState) => state.maxEnergyLVL);

    const costReturnHandler = (value: any, currentLVL: number) => {
        if (value.hasOwnProperty(currentLVL + 1)) {
            return value[currentLVL + 1]
        } else {
            return 'Max LVL'
        }
    }

    return (
        <div className={s.upgradeBar}>
            <h3 className={s.upgradeBarTitle}>Boosters</h3>
            <div className={s.buttonContainer}>
                <button onClick={props.upgradeClickLVL}>
                   <div> Multitap</div>
                    <div>{costReturnHandler(IncrementTapLVL, currentTapLVL)} | LVL : {currentTapLVL} </div>
                </button>
                <button onClick={props.upgradeMaxEnergyLevel}>
                   <div>Max Energy</div>
                    <div>{costReturnHandler(IncrementMaxEnergy, currentMaxEnergyLVL)} | LVL : {currentMaxEnergyLVL}</div>
                </button>
                <button onClick={props.upgradeRecoveryLevel}>
                   <div>Recovery speed</div>
                    <div> {costReturnHandler(IncrementRecoveryLVL, currentRecoveryLVL)} | LVL : {currentRecoveryLVL}</div>
                </button>
            </div>
        </div>
    );
};

export default UpgradeBar;