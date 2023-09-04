// import React,{Component} from "react";

// export default class Timer extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             elapsed:0
//         }
//     }


//     componentDidMount(){
//         this.interval = setInterval(() =>{
//             this.setState({
//                 elapsed:Math.floor(
//                     (new Date().getTime() - this.props.start.getTime()) / 1000
//                 )
//             });
//         });
//     }

//     componentDidUnmount(){
//         delete this.interval;
//     }

//     render(){
//         const {elapsed} = this.state;
//         return <span>Time : {elapsed} </span>
//     }


// }

// import React, { useState } from 'react';

// function Timer() {
//   const [seconds, setSeconds] = useState(0);

//   const resetTimer = () => {
//     setSeconds(0);
//   };

// }
//   export default Timer;