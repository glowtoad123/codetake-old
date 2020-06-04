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

    var NavbarStyle = {
        backgroundColor: "#5f9ea0",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 3.2px 7.2px 0 rgba(0, 0, 0, .132), 0 .6px 1.8px 0 rgba(0, 0, 0, .108)",
        position: "fixed",
        left: "0",
        top: "0",
        zIndex: "2",
        display: "inline-block",
    }

    var prevScrollPos = window.pageYOffset;
    const [currentScrollPos, setCurrentScrollPos] = useState("")
    const [hasMoved, setHasMoved] = useState(false)
    window.onscroll = function() {
      /*var currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        setHasMoved(current => !current);
      } else {
        setHasMoved(false)
      }
      prevScrollPos = currentScrollPos;*/
      setHasMoved(current => !current)
    } 

    hasMoved && (NavbarStyle.display = "none")
    !hasMoved && (NavbarStyle.display = "inline-block")

    return(
        <div className="navbar" style={NavbarStyle}>
            <Navprop pic={zeit} description="takes" />
            <Navprop pic={zeit} description="my account" />
            <Navprop pic={zeit} description="favorites" />
            <Navprop pic={zeit} description="updates" />
            <Navprop pic={zeit} description="settings" />
        </div>
    )
    
}

export default Navbar