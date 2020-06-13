import React, {useState} from 'react'
import zeit from './bullet.ico'
import takes from './book.svg'
import user from './user.svg'
import favorites from './favorite.svg'
import updates from './notification.svg'
import settings from './settings.svg'


function Navprop(props){

    function changePage(event){
        sessionStorage.setItem("page", event.target.innerText)
        var pageTest = sessionStorage.getItem("page")
        console.log("pageTest: " + pageTest)
    }

    return(
        <div onClick={changePage}>
            <img style={{
                width: '48px', 
                height: '48px',
                marginRight: '20px',
                }} className="navpic" src={props.pic} />
            <p style={{
                display: 'inline-block',
                fontSize: "16px",
                position: 'relative',
                bottom: '15px',
                backgroundColor: "#2f3e46",
                borderRadius: "6px",
                color: "white"
                }}><strong>{props.description}</strong></p>
        </div>
    )
}

function Navbar(){

    var NavbarStyle = {
        backgroundColor: "#cad2c5",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "fixed",
        right: "0",
        top: "0",
        zIndex: "2",
        display: "inline-block",
    }

    var prevScrollPos = window.pageYOffset;
    const [currentScrollPos, setCurrentScrollPos] = useState("")
    const [hasMoved, setHasMoved] = useState(true)
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        setHasMoved(current => false);
      } else {
        setHasMoved(true)
      }
      prevScrollPos = currentScrollPos;
    } 

    hasMoved && (NavbarStyle.display = "none")
    !hasMoved && (NavbarStyle.display = "inline-block")

    return(
        <div className="navbar" style={NavbarStyle}>
            <Navprop pic={takes} description="takes" />
            <Navprop pic={user} description="my account" />
            <Navprop pic={favorites} description="favorites" />
            <Navprop pic={updates} description="updates" />
            <Navprop pic={settings} description="settings" />
        </div>
    )
    
}

export default Navbar