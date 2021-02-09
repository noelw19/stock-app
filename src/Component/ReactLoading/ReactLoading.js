import React from 'react';
import ReactLoading from 'react-loading';

import style from './Loader.module.css';

const Loader = ({ type, color }) => (
    <div className={style.container}>
        <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
    </div>
)

export default Loader;