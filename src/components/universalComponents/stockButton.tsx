import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';
import React from 'react';
import s from './stockButton.module.css'; // Assuming you have a CSS module for StockButton

type StockButtonType = ButtonProps &{
    onClick : ()=> void
    title: string
    subscribe: string
    class?: string
}

const StockButton: React.FC<StockButtonType> = (props) => {
    return (
        <Button
            className={props.class ? props.class : s.stockButton}
            onClick={props.onClick}
            size={props.size}
            variant={props.variant}>
            <div className={s.content}>
                <div className={s.titleContainer}>
                    {props.startIcon}
                    <span className={s.title}>{props.title}</span>
                </div>
                <span className={s.subscribe}>{props.subscribe}</span>
            </div>
        </Button>
    );
};

export default StockButton;