import React from 'react'

export function DownActive(props){
  return(
    <div className="scroll-button" onClick={props.scrollDown}>
      <svg viewBox="0 0 68 68"><title>down-active</title><path className="cls-3" d="M67.9,34A33.9,33.9,0,1,1,34,.1,33.9,33.9,0,0,1,67.9,34"/><polygon className="cls-1" points="34 45.06 18 28.32 19.45 26.94 34 42.16 48.55 26.94 50 28.32 34 45.06"/></svg>
    </div>
  )
}
export function DownInactive(props){
  return(
    <div className="scroll-button" onClick={props.scrollDown}>
      <svg viewBox="0 0 68 68"><title>down-active</title><path className="cls-3" d="M67.9,34A33.9,33.9,0,1,1,34,.1,33.9,33.9,0,0,1,67.9,34"/><polygon className="cls-4" points="34 45.06 18 28.32 19.45 26.94 34 42.16 48.55 26.94 50 28.32 34 45.06"/></svg>
    </div>
  )
}
export function UpActive(props){
  return(
    <div className="scroll-button" onClick={props.scrollUp}>
      <svg viewBox="0 0 68 68"><title>up-active</title><path className="cls-3" d="M67.9,34A33.9,33.9,0,1,1,34,.1,33.9,33.9,0,0,1,67.9,34"/><polygon className="cls-1" points="34 22.94 50 39.67 48.55 41.06 34 25.84 19.45 41.06 18 39.67 34 22.94"/></svg>
    </div>
  )
}
export function UpInactive(props){
  return(
    <div className="scroll-button" onClick={props.scrollUp}>
      <svg viewBox="0 0 68 68"><title>up-active</title><path className="cls-3" d="M67.9,34A33.9,33.9,0,1,1,34,.1,33.9,33.9,0,0,1,67.9,34"/><polygon className="cls-4" points="34 22.94 50 39.67 48.55 41.06 34 25.84 19.45 41.06 18 39.67 34 22.94"/></svg>
    </div>
  )
}

export function CC(props){
  return(
    <div className='cc-icon' onClick={props.addCaptions}>
      <svg viewBox="0 0 48 32"><title>cc</title><path className="cls-1" d="M22.86,11.39l-2,1.95a6.34,6.34,0,0,0-4.69-2.21,5.14,5.14,0,0,0-5.21,5.21,5.49,5.49,0,0,0,.67,2.73,4.78,4.78,0,0,0,1.89,1.87,5.48,5.48,0,0,0,2.71.68,5.6,5.6,0,0,0,2.33-.47,8.38,8.38,0,0,0,2.32-1.73l2,2.07a10.86,10.86,0,0,1-3.22,2.3,8.78,8.78,0,0,1-3.46.64,8,8,0,0,1-5.86-2.27A7.86,7.86,0,0,1,8,16.34a8,8,0,0,1,1-4.08,7.71,7.71,0,0,1,3-2.87A8.38,8.38,0,0,1,16.17,8.3a8.86,8.86,0,0,1,6.69,3.08Z"/><path className="cls-1" d="M39.53,11.39l-2,1.95a6.34,6.34,0,0,0-4.69-2.21,5.14,5.14,0,0,0-5.21,5.21,5.49,5.49,0,0,0,.67,2.73,4.78,4.78,0,0,0,1.89,1.87,5.48,5.48,0,0,0,2.71.68,5.6,5.6,0,0,0,2.33-.47,8.38,8.38,0,0,0,2.32-1.73l2,2.07a10.86,10.86,0,0,1-3.22,2.3,8.78,8.78,0,0,1-3.46.64,8,8,0,0,1-5.86-2.27,7.86,7.86,0,0,1-2.28-5.82,8,8,0,0,1,1-4.08,7.71,7.71,0,0,1,3-2.87A8.38,8.38,0,0,1,32.84,8.3a8.86,8.86,0,0,1,6.69,3.08Z"/><path className="cls-1" d="M47.74,31.53H.26V.47H47.74ZM1.77,30H46.23V2H1.77Z"/></svg>
    </div>
  )
}

export function PlayBtn(props){
  return (
    <div onClick={props.play}>
      <svg viewBox="0 0 151 151"><title>play</title><path className="cls-2" d="M150.9,75.5A75.4,75.4,0,1,1,75.5.1a75.4,75.4,0,0,1,75.4,75.4"/><path className="cls-1" d="M54.21,109.81l-.05-68.61,59.7,34.28Zm1.95-65.16,0,61.7,53.63-30.87Z"/></svg>
    </div>
  )
}

export function PauseBtn(props){
  return (
    <div
      onClick={props.pause}>
      <svg viewBox="0 0 151 151"><title>pause</title><path className="cls-2" d="M150.9,75.5A75.4,75.4,0,1,1,75.5.1a75.4,75.4,0,0,1,75.4,75.4"/><path className="cls-1" d="M67.67,107.87H47.82V43.13H67.67Zm-17.85-2H65.67V45.13H49.82Z"/><path className="cls-1" d="M99.86,107.87H80V43.13H99.86Zm-17.85-2H97.86V45.13H82Z"/></svg>
    </div>
  )
}

export function Volume(props){
  return(
    <div className="volume-icon" onClick={props.showVolume}>
      <svg viewBox="0 0 41 30"><title>volume</title><path className="cls-1" d="M25.63,30V27.5a12.5,12.5,0,1,0,0-25V0a15,15,0,1,1,0,30Z"/><path className="cls-1" d="M25.63,21.93v-2.5a4.43,4.43,0,1,0,0-8.86V8.07a6.93,6.93,0,1,1,0,13.86Z"/><polygon className="cls-1" points="17.09 1.21 7.9 9.85 0.37 9.85 0.37 20.06 7.81 20.06 17.09 28.79 17.09 1.21"/></svg>
    </div>
  )
}

export function Prev(props){
  return(
    <div className="prev-next-icon " onClick={props.prevVid}>
      <svg viewBox="0 0 10 16"><title>notch-left</title><polygon className="cls-1" points="8.84 16 0.47 8 8.84 0 9.53 0.72 1.92 8 9.53 15.28 8.84 16"/></svg>
    </div>
  )
}

export function Next(props){
  return(
    <div className="prev-next-icon" onClick={props.nextVid}>
      <svg viewBox="0 0 10 16"><title>notch-right</title><polygon className="cls-1" points="1.16 16 0.47 15.28 8.08 8 0.47 0.72 1.16 0 9.53 8 1.16 16"/></svg>
    </div>
  )
}

export function Down(props){
  return(
    <div className="down-icon">
      <svg viewBox="0 0 21 14"><title>notch-down</title><polygon className="cls-1" points="10.5 13.73 0.24 1.32 1.51 0.27 10.5 11.13 19.49 0.27 20.76 1.32 10.5 13.73"/></svg>
    </div>
  )
}
