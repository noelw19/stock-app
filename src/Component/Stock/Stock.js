import Plot from 'react-plotly.js';
import React from 'react';

import Loader from '../ReactLoading/ReactLoading';

import style from './Stock.module.css';

import Info from '../Info/Info.js';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            stockSymbol: 'TSLA',
            stockType: 'Tesla',
            isLoading: true

        }
    }

    componentDidMount(){
        this.fetchStock();
    }

    fetchStock() {
        const pointerToThis = this;
        const API_KEY = 'FIWL5FKDW3ZNLO04';
        let stockSymbol = this.state.stockSymbol;
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];


        fetch(API_CALL)
            .then(
                
                function(response) {
                    pointerToThis.setState({
                        isLoading: true
                    })
                    return response.json();
                }
            )
            .then(
                function(data) {
                    // console.log(data);

                    for( var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                    }

                    // console.log(stockChartXValuesFunction)
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,
                        isLoading: false
                    })
                }
            )
    }

    teslaView = () => {
        const pointerToThis = this;
        pointerToThis.setState({
            stockSymbol: 'TSLA',
            stockType: 'Tesla',
            isLoading: true
        }) 
        this.fetchStock()
    }

    amazonView = () => {
        const pointerToThis = this;
        pointerToThis.setState({
            stockSymbol: 'AMZN',
            stockType: 'Amazon',
            isLoading: true
        })
        this.fetchStock()
    }

    itroView = () => {
        const pointerToThis = this;
        pointerToThis.setState({
            stockSymbol: 'ITRO',
            stockType: 'Itronics Inc',
            isLoading: true
        })
        this.fetchStock()
    }

    gmeView = () => {
        const pointerToThis = this;
        pointerToThis.setState({
            stockSymbol: 'GME',
            stockType: 'Gamestop (EB Games)',
            isLoading: true
        })
        this.fetchStock()
    }

    render() {
        const name = this.state.stockType;

        const stockPrices = this.state.stockChartYValues;
        let highVal = '';
        let lowVal = '';

        // console.log(this.state.stockChartYValues);
        // console.log(stockPrices);

        function getMaxVal(stockPrices){
            const high = Math.max.apply(Math, stockPrices);
            highVal = high;

        }

        function getMinVal(stockPrices){
            const low = Math.min.apply(Math, stockPrices);
            lowVal = low;

        }

        getMaxVal(stockPrices);
        getMinVal(stockPrices);



        return (
            <div>
                <h2>Stock Tracker</h2>
                <h3>Current Stock: {this.state.stockType}</h3>
                {this.state.isLoading && <Loader type='bubbles' color='#ffff' />}
                {!this.state.isLoading && <div className={style.data}>
                <Plot
                    data={[
                    {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    }
                    ]}
                    layout={ {width: 720, height: 440, title: 'Past 100 Days'} }
                />
                <Info 
                    name={name}
                    highValues={highVal}
                    lowValues={lowVal}/>
                </div>}
                <div className={style.buttons}>
                    <button onClick={this.teslaView}>Tesla</button>
                    <button onClick={this.amazonView}>Amazon</button>
                    <button onClick={this.itroView}>ITRO</button>
                    <button onClick={this.gmeView}>Game Stop</button>
                </div>
            </div>
        )
    }
}

//next thing to do is to possibly call all 3 views individually and add them in the componentdidmount so that
// when the buttons are pressed the data shows quicker

export default Stock;