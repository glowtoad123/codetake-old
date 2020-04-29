import React, {useState} from 'react'
import me from './me.jpg'
import { nanoid } from 'nanoid'

function Display(){

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
                backgroundColor: 'white',
                margin: '12px',
                border: 'none',
                borderRadius: '6px'}}><strong>{props.tag}</strong></p>
        )
    }


    function Displayprop(props){

        const tagList = ['crossplatform', 'desktop', 'react-based']

        return(
            <div className="display" style={{width: '300px'}}>
                <h1 onClick={choseOne} className="displaytitle"><strong>{props.title}</strong></h1>
                <p><strong>{props.description}</strong></p>
                <br />
                <p style={{display: 'inline-block', margin: '5px'}}>{props.likes}</p>
                <p style={{display: 'inline-block', margin: '5px'}}>{props.participants}</p>
                <br />
                <img className="creatorpic" src={props.pic} />
                <p className="creatorname"><strong>{props.name}</strong></p>
                <br />
                {tagList.map((hashtag) => {return <Tag tag={hashtag}/>})}
            </div>
        )
    }





    return(
        <div>
            <Displayprop pic={me} name="Alonzo" likes="125 likes" participants="14 participants"  title="Codetake" description="this is a pwa that allows anyone to show their take on a concept or solution and get feedback from others as they review and test your take"/>
            <Displayprop pic={me} name="Alonzo" likes="125 likes" participants="14 participants"  title="Codetake" description="this is a pwa that allows anyone to show their take on a concept or solution and get feedback from others as they review and test your take"/>
            <Displayprop pic={me} name="Alonzo" likes="125 likes" participants="14 participants"  title="Codetake" description="this is a pwa that allows anyone to show their take on a concept or solution and get feedback from others as they review and test your take"/>
            <Displayprop pic={me} name="Alonzo" likes="125 likes" participants="14 participants"  title="Codetake" description="this is a pwa that allows anyone to show their take on a concept or solution and get feedback from others as they review and test your take"/>
        </div>
    )
}

export default Display