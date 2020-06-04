import React, {useState} from 'react'
import me from './me.jpg'
import faunadb, { query as q } from "faunadb"
import "./newProject.css"

function Newproject(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    const [projectData, setProjectData] = useState({
        Project_Title: "",
        Version_num: "",
        Description: "",
        Categories: "",
        Changes: "",
        Roadmap: "",
        type: "project",
    })

    const {Project_Title, Version_num, Description, Categories, Changes, Roadmap} = projectData

    function settingData(event){
        const name = event.target.name
        console.log(event.target.name)
        const value = event.target.value
        setProjectData((current) => ({...current, [name]: value}))
    }

    function saveData(event){
        serverClient.query(
            q.Create(
              q.Collection('Projects'),
              { data: projectData },
            )
          ).then(ret => console.log(ret.data))
        event.preventDefault()
    }

    return(
        <div><form onSubmit={saveData}>
            <div id="Project_Header">
                <input className="newProjectItem" onChange={settingData} name="Project_Title"    value={Project_Title}   placeholder=" Project Title"   id="Project_Title"    />
                <input className="newProjectItem" onChange={settingData} name="Version_num"      value={Version_num}     placeholder=" Version_num"     id="Version_num"      />
            </div> 

            <textarea className="newProjectItem" onChange={settingData} name="Description"       value={Description}     placeholder=" Description"     id="Description"      ></textarea>
            <textarea className="newProjectItem" onChange={settingData} name="Categories"        value={Categories}      placeholder=" Categories"      id="Categories"       ></textarea>
            <textarea className="newProjectItem" onChange={settingData} name="Changes"           value={Changes}         placeholder=" Changes"         id="Changes"          ></textarea>
            <textarea className="newProjectItem" onChange={settingData} name="Roadmap"           value={Roadmap}         placeholder=" Roadmap"         id="Roadmap"          ></textarea>
            <button type="submit">Save</button>
        </form></div>
    )
}

export default Newproject