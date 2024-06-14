import React, {useEffect, useRef} from 'react';
import coinImage from '../../assets/images/coin.png';
import s from './coin.module.css';

type CoinType = {
    onClick: () => void;
    currentEnergy: number;
    tapValue: number;
};

const Coin = (props: CoinType) => {
    const coinRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const coin = coinRef.current;

        const handleEvent = (clientX: number, clientY: number) => {
            if (coin && props.currentEnergy >= props.tapValue) {
                const number = document.createElement('div');
                number.textContent = `+ ${props.tapValue}`;
                number.className = s.number;

                const offsetX = -20;
                const offsetY = -20;

                // Calculate position and constrain within the coin container
                let left = clientX - coin.offsetLeft + offsetX;
                let top = clientY - coin.offsetTop + offsetY;

                // Ensure the number does not go beyond the left and top boundaries
                left = Math.max(0, left);
                top = Math.max(0, top);

                // Ensure the number does not go beyond the right and bottom boundaries
                left = Math.min(coin.clientWidth - number.clientWidth, left);
                top = Math.min(coin.clientHeight - number.clientHeight, top);

                number.style.left = `${left}px`;
                number.style.top = `${top}px`;

                coin.appendChild(number);

                number.style.display = 'block';

                setTimeout(() => {
                    number.style.opacity = '0'; // Fade out effect
                    setTimeout(() => {
                        if (coin) {
                            coin.removeChild(number);
                        }
                    }, 500); // Wait for the fade-out transition
                }, 500);
            }
        };

        const handleTouchStart = (event: TouchEvent) => {
            for (let i = 0; i < event.touches.length; i++) {
                const touch = event.touches[i];
                handleEvent(touch.clientX, touch.clientY);
            }
        };

        const handleClick = (event: MouseEvent) => {
            handleEvent(event.clientX, event.clientY);
        };

        if (coin) {
            coin.addEventListener('touchstart', handleTouchStart);
            coin.addEventListener('click', handleClick);

            return () => {
                coin.removeEventListener('touchstart', handleTouchStart);
                coin.removeEventListener('click', handleClick);
            };
        }
    }, [props.currentEnergy, props.tapValue]);

    const handleFlip = () => {
        props.onClick();
    };

    return (
        <div className={s.coin} ref={coinRef} onClick={handleFlip}>
            <img className={s.coinImage} src={coinImage} alt={'CoinImage'}/>
            <div className={s.coinEdge}></div>
        </div>
    );
};

export default Coin;