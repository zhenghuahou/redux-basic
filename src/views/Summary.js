// import React, { Component, PropTypes } from 'react';
//
// class Summary extends Component {
//     render() {
//         const sum = this.props.sum;
//         return (
//             <div>Total Count: {sum}</div>
//         );
//     }
// }
//
// class SummaryContainer extends Component {
//     constructor(props, context) {
//         super(props, context);
//
//         this.onChange = this.onChange.bind(this);
//
//         this.state = this.getOwnState();
//     }
//
//     onChange() {
//         this.setState(this.getOwnState());
//     }
//
//     getOwnState() {
//         const state = this.context.store.getState();
//         let sum = 0;
//         for (const key in state) {
//             if (state.hasOwnProperty(key)) {
//                 sum += state[key];
//             }
//         }
//
//         return { sum: sum };
//     }
//
//     shouldComponentUpdate(nextProps, nextState) {
//         return nextState.sum !== this.state.sum;
//     }
//
//     componentDidMount() {
//         this.context.store.subscribe(this.onChange);
//     }
//
//     componentWillUnmount() {
//         this.context.store.unsubscribe(this.onChange);
//     }
//
//     render() {
//         const sum = this.state.sum;
//         return (
//             <Summary sum={sum} />
//         );
//     }
// }
//
//
//
// export default SummaryContainer;
//

import React from 'react';
import { connect } from 'react-redux';

function Summary({value}) {
    return (
        <div>Total Count: {value}</div>
    );
}


function mapStateToProps(state) {
    let sum = 0;
    for (const key in state) {
        if (state.hasOwnProperty(key)) {
            sum += state[key];
        }
    }
    return {value: sum};
}


export default connect(mapStateToProps)(Summary);


