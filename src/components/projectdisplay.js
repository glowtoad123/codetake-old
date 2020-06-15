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
    const [chosenOne, setChosenOne] = useState("")

    function choseOne(event){

        const title = event.target.parentElement.parentElement
        //const name = event.target.parentElement.children[8].innerText
        setPage((current) => {return !current})
        //setChosenOne({project: title, creator: name})
        console.log(title)
        console.log(typeof event.target)
    }

    console.log(page)



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

export default Display