import React, {useState} from 'react'
import me from './me.jpg'
import faunadb, { query as q } from "faunadb"

function Newproject(){
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    const [projectData, setProjectData] = useState({
        Project_Title: "",
        Version_num: "",
        Participant_num: "",
        Description: "",
        Categories: "",
        Changes: "",
        Roadmap: "",
    })

    const {Project_Title, Version_num, Participant_num, Description, Categories, Changes, Roadmap} = projectData

    function settingData(event){
        const name = event.target.name
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
            <textarea onChange={settingData} name="Project_Title" value={Project_Title} placeholder="Project Title"></textarea>
            <textarea onChange={settingData} name="Version_num" value={Version_num} placeholder="Version_num"></textarea>
            <textarea onChange={settingData} name="Participant_num" value={Participant_num} placeholder="Participant_num"></textarea>
            <textarea onChange={settingData} name="Description" value={Description} placeholder="Description"></textarea>
            <textarea onChange={settingData} name="Categories" value={Categories} placeholder="Categories"></textarea>
            <textarea onChange={settingData} name="Changes" value={Changes} placeholder="Changes"></textarea>
            <textarea onChange={settingData} name="Roadmap" value={Roadmap} placeholder="Roadmap"></textarea>
            <button type="submit">Save</button>
        </form></div>
    )
}

export default Newproject