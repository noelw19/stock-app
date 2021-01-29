import React from "react";

import style from './Info.module.css';

class Info extends React.Component {
    //want to show the highest the stock reached within the 100 days
    //lowest in the past 100 days


    render() {

        return (
            <div className={style.container}>
                <div className={style.content}>
                    <h4 className={style.header}>{this.props.name}</h4>
                    <h5>Lowest and Highest</h5>
                    <div>
                        <p>Highest value in the past 100 days:</p>
                        <p><strong>${this.props.highValues}</strong></p>
                        <p>Lowest value in the past 100 days:</p>
                        <p><strong>${this.props.lowValues}</strong></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Info;