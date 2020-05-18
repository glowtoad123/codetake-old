import React, {useState} from 'react'
import faunadb, { query as q } from "faunadb"
import crypto from 'crypto'
import './enter.css'
const hash = crypto.createHash('sha256')

function Enter(props){  

  const [hasLoggedIn, setHasLoggedIn] = useState(true)

  function Login(){

    //var adminClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    /*adminClient.query(
        q.CreateKey({
          database: q.Database('Codentake'),
          role: 'server',
        })
      )
      .then((ret) => console.log(ret))*/

      const [account, setAccount] = useState({
          password: "",
          username: ""
      })

    function readingProgress(event){
        var name = event.target.name
        var value = event.target.value
        setAccount(current => ({...current, [name]: value}))
    }  

    const {username, password} = account

    const [enhancedPassword, setEnhancedPassword] = useState("")

    const [info, setInfo] = useState("")

    function readAccount(event){  

      hash.update(password)
      const hashedPassword = hash.digest("hex")
      console.log("hashedPassword: " + hashedPassword)
      hash.update(username)
      const hashedUsername = hash.digest("hex")
      console.log("hashedUsername: " + hashedUsername)
      const alphaPassword = hashedPassword + hashedUsername
      console.log("alphaPassword: " + alphaPassword)
    
    
      /*crypto.pbkdf2(alphaPassword, 'salt', 1, 64, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        setEnhancedPassword(derivedKey.toString('hex'))
      })*/
      
      
      serverClient.query(
        q.Get(
          q.Match(q.Index('account'), alphaPassword, username)
        )
      )
      .then((ret) => (console.log(ret.data.username), setInfo(ret.data.username), sessionStorage.setItem("yourWorks", ret.data.password), sessionStorage.setItem("username", ret.data.username), setHasLoggedIn((current) => {return !current})))
    }

    console.log("enhancedPassword: " + enhancedPassword);
    console.log(info)
    console.log(hasLoggedIn)

    return(
      <div name={hasLoggedIn} className="signbox">
        <center>
            <div>
              <input onChange={readingProgress} className="signfield" value={username} type="text"    name="username" id="username"  placeholder="username" />
              <input onChange={readingProgress} className="signfield" value={password}    type="password" name="password"    id="password" placeholder="password" />
              <button class="submit" onClick={readAccount}>Login</button>
            </div>
        </center>
      </div>
    )
  }




  function Or(){
    return(
      <div className="or"><center>OR</center></div>
    )
  }




  function Signup() {

      //var adminClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
      var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
      /*adminClient.query(
          q.CreateKey({
            database: q.Database('Codentake'),
            role: 'server',
          })
        )
        .then((ret) => console.log(ret))*/

        const [account, setAccount] = useState({
            email: "",
            password: "",
            username: ""
        })

      function readingProgress(event){
          var name = event.target.name
          var value = event.target.value
          setAccount(current => ({...current, [name]: value}))
      }  

      const {email, password, username} = account

      const [enteredEmail, setenteredEmail] = useState("")

      const [enhancedPassword, setEnhancedPassword] = useState("")

      const theenteredEmail = enteredEmail

      const [info, setInfo] = useState("")



      /*crypto.pbkdf2(alphaPassword, 'salt', 10, 64, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        setEnhancedPassword(derivedKey.toString('hex'))
        console.log(enhancedPassword);
      })*/





      

      function addAccount(event){

        hash.update(password)
        const hashedPassword = hash.digest("hex")
        console.log("hashedPassword: " + hashedPassword)
        hash.update(username)
        const hashedUsername = hash.digest("hex")
        console.log("hasedUsername: " + hashedUsername)
    
        const alphaPassword = hashedPassword + hashedUsername
        console.log("alphaPassword: " + alphaPassword)


        console.log(account)

        /*crypto.pbkdf2(alphaPassword, 'salt', 1, 64, 'sha512', (err, derivedKey) => {
          if (err) throw err;
          setEnhancedPassword(derivedKey.toString('hex'))
          console.log(enhancedPassword);
        })*/

        account.password = alphaPassword

        

        serverClient.query(
          q.Get(
            q.Match(q.Index('dublicateEmail'), email)
          )
        )
        .then((ret) => {console.log(ret.data.email); alert("sorry, but this email has already been taken")}, (err) => {
          serverClient.query(
            q.Get(
              q.Match(q.Index('dublicateUsername'), username)
            )
          )
          .then((ret) => {console.log(ret.data.username); alert("Sorry, but this username has alread been taken")}, (err) => {
            serverClient.query(
              q.Create(
                q.Collection('Accounts'),
                { data: account },
              )
            )
            .then((ret) => (console.log(ret), setInfo(ret), sessionStorage.setItem("yourWorks", ret.data.password), sessionStorage.setItem("username", ret.data.username), setHasLoggedIn((current) => {return !current})))
          })
        })


        
        

      /*console.log("theenteredEmail: " + theenteredEmail)

      if(theenteredEmail !== ""){
        alert("sorry, please choose a new email. This one is taken.")
      } else {
        serverClient.query(
          q.Create(
            q.Collection('Accounts'),
            { data: account },
          )
        )
        .then((ret) => (console.log(ret), setInfo(ret)))
      }*/


        event.preventDefault()
      }

      console.log(account.password)
      console.log(info)

      return (
          <div onSubmit={addAccount}>
              <center className="signbox">
                
                <div>
                  <form>
                    <input onChange={readingProgress} className="signfield" value={email} type="email"   name="email" id="email"   placeholder="email" />
                    <input onChange={readingProgress} className="signfield" value={password}    type="password" name="password"    id="password" placeholder="password" />
                    <input onChange={readingProgress} className="signfield" value={username} type="text"    name="username" id="username"  placeholder="username" />
                    <button className="submit"  type="submit">Register</button>
                  </form>
                </div>

              </center>

          </div>
      )
  }

  function Getin(){
    return (
      <div>
        <Login />
        <Signup />
      </div>
    )
  }

  return(
    <div>
    {hasLoggedIn && <Getin />}
    </div>
  )

}




export default Enter
/*export default Signup
export {Or, Login}*/