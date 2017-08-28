import React from 'react'
import {Link} from 'react-router-dom'

const Header=(props)=>{
  const toggleIndex=()=>{
    props.toggleNav()
  }
  const hideIndex=()=>{
    props.hideNav()
    props.onShowHeader()
  }
  return(
    <header>
      <h1><Link onClick={hideIndex} className="link" to="/">Clyfford Still Museum Media Channel</Link></h1>
      <div className="index-nav"><div onClick={toggleIndex}
        className="link" >Video Index</div></div>
    </header>
  )
}
export default Header
