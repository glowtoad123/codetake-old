import React, {useState} from 'react'
import me from './me.jpg'
import faunadb, { query as q } from "faunadb"

function Display(){
//test to see if the project is broken or not
    const [projectArray, setProjectArray] =  useState("")
    const testArray = []
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });

    /*serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("projects"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
    ).then((ret, index) => {ret.data.map(one => {console.log(one.data); testArray.push(one.data)})}).then(
    //projectArray.map(info => console.log(info))
    console.log(testArray[4]))*/

    const [page, setPage] = useState(false)
    const [chosenOne, setChosenOne] = useState("nothing")

    function choseOne(event){
        serverClient.query(
            q.Get(
            q.Match(q.Index("Project_Title"), event.target.innerText)
        )).then((ret, index) => {console.log(ret); setChosenOne(ret.data)})
    }

    console.log(page)
    console.log(chosenOne)



    function Tag(props){
        return(
            <p style={{
                display: 'inline-block',
                backgroundColor: '#84a98c',
                color: "black",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                margin: '12px',
                border: 'none',
                borderRadius: '6px'}}><strong>{props.tag}</strong></p>
        )
    }


    /*function Displayprop(props){

        const tagList = ['crossplatform', 'desktop', 'react-based']

        return(
            <div className="display" style={{width: '300px'}}>
                <center></center>
                <h1 onClick={choseOne} className="displaytitle"><strong>{props.title}</strong></h1>
                <p><strong>{props.description}</strong></p>
                <br />
                <p style={{display: 'inline-block', margin: '5px'}}>{props.likes}</p>
                <p style={{display: 'inline-block', margin: '5px'}}>{props.participants}</p>
                <br />
                <img className="creatorpic" src={props.pic} />
                <p className="creatorname"><strong>{props.name}</strong></p>
                <br />
                <Tag tag={props.tag}/>
            </div>
        )
    }*/


    serverClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index("projects"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
    ).then((ret, index) => {ret.data.map(one => {console.log(one.data); testArray.push(one.data); localStorage.setItem('projects', JSON.stringify(testArray));})})

    var newTestArray = JSON.parse(localStorage.getItem('projects'))
    console.log(newTestArray)
    const [tagNames, settagNames] = useState([])

    const taggies = newTestArray.map(current => current.Categories)
    console.log(taggies)
    console.log(newTestArray.Categories)

    function Displayprop() {
        return(

            newTestArray.map((Current, index) => {const Categories = Current.Categories; return (<div className="display" style={{width: '300px'}}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{Current.Project_Title}</strong></h1>
                <p><strong>{Current.Description.slice(0, 99) + "..."}</strong></p>
                <br />
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <br />
                <img className="creatorpic" src={me} />
                <p className="creatorname"><strong>{Current.Creator}</strong></p>
                <br />
                {taggies[index].map(each => <Tag tag={each}/>)}
            </div>)})
        )
    }

    function Userdisplay(props){
        return(
            <div className="display" style={{width: '300px',}}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{props.Project_Title}</strong></h1>
                <p style={{backgroundColor: "#ffffff"}}><strong>{props.Description}</strong></p>
                <br />
                <h1 className="textHead"><strong>Roadmap</strong></h1>
                <p style={{backgroundColor: "#ffffff"}}><strong>{props.Roadmap}</strong></p>
                <br />
                <h1 className="textHead"><strong>Changes</strong></h1>
                <p style={{backgroundColor: "#ffffff"}}><strong>{props.Changes}</strong></p>
                <br />
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <p style={{display: 'inline-block', margin: '5px'}}>1</p>
                <br />
                <img className="creatorpic" src={me} />
                <p className="creatorname"><strong>{props.Creator}</strong></p>
                <br />
                {props.Categories.map(each => <Tag tag={each}/>)}
            </div>)
    }

    return(
        (chosenOne === "nothing") ? <Displayprop /> : <Userdisplay 
        Project_Title= {chosenOne.Project_Title}
        Description= {chosenOne.Description}
        Roadmap={chosenOne.Roadmap}
        Changes={chosenOne.Changes}
        Creator={chosenOne.Creator}
        Categories={chosenOne.Categories}
        />
         
    )
}

export default Display