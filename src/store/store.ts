import {createStore, Reducer} from "redux";
import {
    IncrementMaxEnergy,
    IncrementRecoveryLVL,
    IncrementTapLVL,
    MaxEnergy,
    RecoverySpeed,
    TapValue
} from "./LvlSystem";


interface State {
    score: number;
    tapLVL: number;
    recoveryLVL: number;
    maxEnergyLVL: number;
    currentMaxEnergy: number;
    currentEnergy: number;


}
let initialState: State = {
    score: 500,
    tapLVL: 1,
    recoveryLVL: 1,
    maxEnergyLVL: 1,
    currentMaxEnergy: 500,
    currentEnergy: 500,
};
const setStorage = (state: State) => {
    localStorage.setItem('initialState', JSON.stringify(state));
};
const loadStorage = (): State => {
    const storageState = localStorage.getItem('initialState');
    const lastRecoveryTime = localStorage.getItem('lastRecoveryTime');
    const state = storageState ? JSON.parse(storageState) : initialState;

    if (lastRecoveryTime) {
        const now = Date.now();
        const elapsedTime = now - parseInt(lastRecoveryTime, 10);
        const recoveryAmount = Math.floor(elapsedTime / 5000) * RecoverySpeed[state.recoveryLVL];
        state.currentEnergy = Math.min(state.currentEnergy + recoveryAmount, state.currentMaxEnergy);
    }

    return state;
};

const INCREMENT_SCORE = 'INCREMENT_SCORE';
const DECREMENT_ENERGY = 'DECREMENT_ENERGY';
const RECOVER_ENERGY = 'RECOVER_ENERGY';
const UPGRADE_TAP_LEVEL = 'UPGRADE_TAP_LEVEL';
const UPGRADE_RECOVERY_LEVEL = 'UPGRADE_RECOVERY_LEVEL';
const UPGRADE_MAX_ENERGY_LEVEL = 'UPGRADE_MAX_ENERGY_LEVEL';

export const incrementScore = () => ({type: INCREMENT_SCORE} as const);
export const decrementEnergy = () => ({type: DECREMENT_ENERGY} as const);
export const recoverEnergy = () => ({type: RECOVER_ENERGY} as const);
export const upgradeTapLevel = () => ({type: UPGRADE_TAP_LEVEL} as const);
export const upgradeRecoveryLevel = () => ({type: UPGRADE_RECOVERY_LEVEL} as const);
export const upgradeMaxEnergyLevel = () => ({type: UPGRADE_MAX_ENERGY_LEVEL} as const);

export type ActionType =
    | ReturnType<typeof incrementScore>
    | ReturnType<typeof decrementEnergy>
    | ReturnType<typeof recoverEnergy>
    | ReturnType<typeof upgradeTapLevel>
    | ReturnType<typeof upgradeRecoveryLevel>
    | ReturnType<typeof upgradeMaxEnergyLevel>;

const scoreReducer: Reducer<State, ActionType> = (state = loadStorage(), action) => {
    switch (action.type) {
        case INCREMENT_SCORE: {
            const newState = {
                ...state,
                score: state.score + TapValue[state.tapLVL],
            };
            // console.log("INCREMENT_SCORE New State:", newState);
            setStorage(newState);
            return newState;
        }
        case DECREMENT_ENERGY: {
            const newEnergy = state.currentEnergy - TapValue[state.tapLVL];
            const newState = {
                ...state,
                currentEnergy: newEnergy < 0 ? 0 : newEnergy,
            };
            setStorage(newState);
            return newState;
        }
        case RECOVER_ENERGY: {
            const now = Date.now();
            const newState = {
                ...state,
                currentEnergy: Math.min(state.currentEnergy + RecoverySpeed[state.recoveryLVL], state.currentMaxEnergy),
            };
            setStorage(newState);
            localStorage.setItem('lastRecoveryTime', now.toString());
            return newState;
        }
        case UPGRADE_TAP_LEVEL: {
            const nextTapLVL = state.tapLVL + 1;
            if (TapValue.hasOwnProperty(nextTapLVL)) {
                const upgradeCost = IncrementTapLVL[nextTapLVL];
                // console.log(`Current Score: ${state.score}, Upgrade Cost: ${upgradeCost}`);
                if (state.score >= upgradeCost) {
                    const newState = {
                        ...state,
                        tapLVL: nextTapLVL,
                        score: state.score - upgradeCost,
                    };
                    setStorage(newState);
                    return newState;
                }
            }
            return state;
        }
        case UPGRADE_RECOVERY_LEVEL: {
            const nextRecoveryLVL = state.recoveryLVL + 1;
            if (RecoverySpeed.hasOwnProperty(nextRecoveryLVL)) {
                const upgradeCost = IncrementRecoveryLVL[nextRecoveryLVL];
                if (state.score >= upgradeCost) {
                    const newState = {
                        ...state,
                        recoveryLVL: nextRecoveryLVL,
                        score: state.score - upgradeCost,
                    };
                    setStorage(newState);
                    return newState;
                }
            }
            return state;
        }
        case UPGRADE_MAX_ENERGY_LEVEL: {
            const nextMaxEnergyLVL = state.maxEnergyLVL + 1;
            if (MaxEnergy.hasOwnProperty(nextMaxEnergyLVL)) {
                const upgradeCost = IncrementMaxEnergy[nextMaxEnergyLVL];
                if (state.score >= upgradeCost) {
                    const newMaxEnergy = MaxEnergy[nextMaxEnergyLVL];
                    const newState = {
                        ...state,
                        maxEnergyLVL: nextMaxEnergyLVL,
                        currentMaxEnergy: newMaxEnergy,
                        score: state.score - upgradeCost,
                    };
                    setStorage(newState);
                    return newState;
                }
            }
            return state;
        }
        default:
            return state;
    }
};

export type RootState = ReturnType<typeof store.getState>;

const store = createStore(scoreReducer);
export default store;