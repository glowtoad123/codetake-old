import React, {useState} from 'react'
import zeit from './bullet.ico'


function Navprop(props){


    function changePage(event){
        sessionStorage.setItem("page", event.target.innerText)
        var pageTest = sessionStorage.getItem("page")
        console.log("pageTest: " + pageTest)
    }

    return(
        <div onClick={changePage}>
            <img style={{width: '30%', height: '30%'}} className="navpic" src={props.pic} />
            <p style={{display: 'inline-block', fontSize: "16px", position: 'relative', bottom: '15px'}}><strong>{props.description}</strong></p>
        </div>
    )
}

function Navbar(){
    return(
        <div className="navbar">
            <Navprop pic={zeit} description="takes" />
            <Navprop pic={zeit} description="my account" />
            <Navprop pic={zeit} description="favorites" />
            <Navprop pic={zeit} description="updates" />
            <Navprop pic={zeit} description="settings" />
        </div>
    )
    
}

export default Navbar