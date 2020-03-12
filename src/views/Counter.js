import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../Actions.js';

const buttonStyle = {
    margin: '10px'
};

function Counter({caption, onIncrement, onDecrement, value}) {
    console.warn(' arg:',arguments)
    return (
        <div>
            <button style={buttonStyle} onClick={onIncrement}>+</button>
            <button style={buttonStyle} onClick={onDecrement}>-</button>
            <span>{caption} count: {value}</span>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    console.warn(' state:',state,state ===window.tt )
    return {
        value: state
        // value: state[ownProps.caption]
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onIncrement: () => {
            dispatch(Actions.increment(ownProps.caption));
        },
        onDecrement: () => {
            dispatch(Actions.decrement(ownProps.caption));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

