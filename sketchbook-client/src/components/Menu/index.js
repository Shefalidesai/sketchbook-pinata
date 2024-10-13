import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';

import { menuItemClick, actionItemClick } from '@/slice/menuSlice';

import { CANVAS_TOOLS } from '@/constants';
import React, { useRef } from 'react';

const JWT = process.env.PINATA_JWT;

const Menu = () => {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

    const handleMenuClick = (itemName) => {
        dispatch(menuItemClick(itemName));
    };

    const handleItemClick = async (itemName) => {
            dispatch(actionItemClick(itemName)); 
    };


    return (
        <div className={styles.menuContainer}>
            <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === CANVAS_TOOLS.PENCIL })} onClick={() => handleMenuClick(CANVAS_TOOLS.PENCIL)}>
                <FontAwesomeIcon icon={faPencil} className={styles.icon} />
            </div>
            <div className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === CANVAS_TOOLS.ERASER })} onClick={() => handleMenuClick(CANVAS_TOOLS.ERASER)}>
                <FontAwesomeIcon icon={faEraser} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={() => handleItemClick(CANVAS_TOOLS.UNDO)}>
                <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={() => handleItemClick(CANVAS_TOOLS.REDO)}>
                <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={() => handleItemClick(CANVAS_TOOLS.DOWNLOAD)}>
                <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
            </div>
           
        </div>
    );
};

export default Menu;
