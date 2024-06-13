import React from 'react';
import s from './upgradeBar.module.css'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {IncrementMaxEnergy, IncrementRecoveryLVL, IncrementTapLVL} from "../../store/LvlSystem";
import StockButton from "../universalComponents/stockButton";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import BatterySaverIcon from '@mui/icons-material/BatterySaver';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';

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
                <StockButton
                    startIcon={<PanToolAltIcon />}
                    title='Multitap'
                    variant='contained'
                    size='medium'
                    onClick={props.upgradeClickLVL}
                    subscribe={`${costReturnHandler(IncrementTapLVL, currentTapLVL)} | LVL : ${currentTapLVL}`}
                     />

                <StockButton
                    startIcon={<BatterySaverIcon/>}
                    title={'Max Energy'}
                    variant={'contained'}
                    size={'medium'}
                    onClick={props.upgradeMaxEnergyLevel}
                    subscribe={`${costReturnHandler(IncrementMaxEnergy, currentMaxEnergyLVL)} | LVL : ${currentMaxEnergyLVL}`}
                />
                <StockButton
                    startIcon={<BatteryCharging60Icon/>}
                    title={'Recovery speed'}
                    variant={'contained'}
                    size={'medium'}
                    onClick={props.upgradeRecoveryLevel}
                    subscribe={`${costReturnHandler(IncrementRecoveryLVL, currentRecoveryLVL)} | LVL : ${currentRecoveryLVL}`}
                />

            </div>
        </div>
    );
};

export default UpgradeBar;