import React, {useState} from 'react'
import me from './me.jpg'
import faunadb, { query as q } from "faunadb"
import "./newProject.css"

function Newproject(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    
    const username = sessionStorage.getItem("username")
    console.log(username)
    
    const [projectData, setProjectData] = useState({
        Project_Title: "",
        Version_num: "",
        Description: "",
        Categories: [],
        Changes: "",
        Roadmap: "",
        type: "project",
        Creator: username,
    })

    const {Project_Title, Version_num, Description, Categories, Changes, Roadmap} = projectData
    const [tagName, settagName] = useState("")
    const [tagList, settagList] = useState([])

    function settingData(event){
        const name = event.target.name
        console.log(event.target.name)
        const value = event.target.value
        setProjectData((current) => ({...current, [name]: value}))
        
    }

    function settingtagName(event){
        settagName(event.target.value)
    }

    function settingtagList(event){
        settagList(current => {return [...current, tagName]})
        settagName("")
        event.preventDefault()
    }

    function saveData(event){
        projectData.Categories = tagList
        console.log(Categories)
        serverClient.query(
            q.Create(
              q.Collection('Projects'),
              { data: projectData },
            )
          ).then(ret => console.log(ret.data))
        //event.preventDefault()
    }

    return(
        <div><form id="npform" onSubmit={saveData}>
            <input type="text" className="newProjectItem" onChange={settingData} name="Project_Title"     value={Project_Title}   placeholder=" Project Title"   id="Project_Title"    ></input>
            <input className="newProjectItem" onChange={settingData} name="Version_num"       value={Version_num}     placeholder=" Version_num"     id="Version_num"      ></input>
            <textarea className="newProjectItem" onChange={settingData} name="Description"       value={Description}     placeholder=" Description"     id="Description"      ></textarea>
            <input type="text" className="newProjectItem" onChange={settingtagName} name="Categories"        value={tagName}      placeholder=" Categories"      id="Categories"       ></input>
                <button onClick={settingtagList} id="addCategory" type="submit">Add Category</button>
                <div>{tagList.map(current => <p className="tags" style={{
                display: 'inline-block',
                backgroundColor: '#84a98c',
                color: "black",
                margin: '12px',
                border: 'none',
                borderRadius: '6px'}}><strong>{current}</strong></p>)}</div>
            <textarea className="newProjectItem" onChange={settingData} name="Changes"           value={Changes}         placeholder=" Changes"         id="Changes"          ></textarea>
            <textarea className="newProjectItem" onChange={settingData} name="Roadmap"           value={Roadmap}         placeholder=" Roadmap"         id="Roadmap"          ></textarea>
            <button id="submit" type="submit">Save</button>
        </form></div>
    )
}

export default Newproject