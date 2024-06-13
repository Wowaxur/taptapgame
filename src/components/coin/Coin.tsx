import React, {useEffect, useRef} from 'react';
import coinImage from '../../assets/images/coin.png'
import s from './coin.module.css';

type CoinType = {
    onClick: () => void
    currentEnergy: number
    tapValue: number
}

const Coin = (props: CoinType) => {
    const coinRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const coin = coinRef.current;
        if (coin) {
            const handleClick = (event: MouseEvent) => {
                // Check if currentEnergy is greater than or equal to tapValue
                if (props.currentEnergy >= props.tapValue) {
                    const number = document.createElement('div');
                    number.textContent = `+ ${props.tapValue}`;
                    number.className = s.number;
                    // Adjust the position slightly up and to the left
                    const offsetX = -20; // Adjust this value as needed
                    const offsetY = -20; // Adjust this value as needed
                    number.style.left = `${event.clientX - coin.offsetLeft + offsetX}px`;
                    number.style.top = `${event.clientY - coin.offsetTop + offsetY}px`;

                    coin.appendChild(number);

                    number.style.display = 'block';

                    setTimeout(() => {
                        number.style.display = 'none';
                        coin.removeChild(number);
                    }, 500);
                }
            };

            coin.addEventListener('click', handleClick);

            // Cleanup function to remove the event listener when the component unmounts
            return () => {
                coin.removeEventListener('click', handleClick);
            };
        }
    }, [props.currentEnergy, props.tapValue]);

    const handleFlip = () => {
        props.onClick()
    };
    return (
        <div className={s.coin} ref={coinRef} onClick={handleFlip}>
            <div className={s.coinInner}>
                <div className={s.coinFront}>
                    <img className={s.coinImage} src={coinImage} alt={'CoinImage'}/>
                </div>
                <div className={s.coinEdge}></div>

            </div>
        </div>
    );
};

export default Coin;