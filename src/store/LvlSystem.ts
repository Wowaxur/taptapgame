 const TapValue: Record<number, number> = {
    1: 1,
    2: 2,
    3: 4,
    4: 8,
    5: 16,
};
 const IncrementTapLVL: Record<number, number> = {
    2: 100,
    3: 500,
    4: 1000,
    5: 3000,
};

const IncrementRecoveryLVL: Record<number, number> = {
    2: 100,
    3: 300,
    4: 600,
    5: 1200,
};
const RecoverySpeed = [1, 1, 3, 6, 10,15]
 const MaxEnergy = [0, 500, 1000, 2000, 4000, 6000]; // Example values
 const IncrementMaxEnergy: Record<number, number> = {
     2: 600,
     3: 1200,
     4: 2400,
     5: 5000,
 };
export {
    TapValue,
    IncrementTapLVL,
    RecoverySpeed,
    IncrementRecoveryLVL,
    IncrementMaxEnergy,
    MaxEnergy
}