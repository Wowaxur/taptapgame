import React from 'react';
import s from './EnergyBar.module.css'; // Import the CSS file

type EnergyBarType = {
    maxEnergy: number;
    currentEnergy: number;
}

const EnergyBar = (props: EnergyBarType) => {
    const { maxEnergy, currentEnergy } = props;

    // Handle edge cases where maxEnergy might be zero
    const filledWidth = maxEnergy > 0 ? (currentEnergy / maxEnergy) * 100 : 0;
    const remainingWidth = 100 - filledWidth;

    return (
        <div className={s.energyBarContainer}>
            <div className={s.filledEnergy} style={{ width: `${filledWidth}%` }}></div>
            <div className={s.remainingEnergy} style={{ width: `${remainingWidth}%` }}></div>
            <div className={s.energyText}>
                {currentEnergy} / {maxEnergy}
            </div>
        </div>
    );
};

export default EnergyBar;