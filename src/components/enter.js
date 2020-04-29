import React, {useState} from 'react'
import faunadb, { query as q } from "faunadb"
import crypto from 'crypto'
import './enter.css'
const hash = crypto.createHash('sha256')

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

  hash.update(password)
    const hashedPassword = hash.digest("hex")
    console.log()
  	hash.update(username)
  	const hashedUsername = hash.digest("hex")
  	const alphaPassword = hashedPassword + hashedUsername





  function readAccount(event){  	

    console.log(enhancedPassword);
    crypto.pbkdf2(alphaPassword, 'salt', 1, 64, 'sha512', (err, derivedKey) => {
      if (err) throw err;
       setEnhancedPassword(derivedKey.toString('hex'))
     }).then(
      serverClient.query(
        q.Get(
          q.Match(q.Index('account'), enhancedPassword, username)
        )
      )
      .then((ret) => console.log(ret))
     )

	}




  return(
    <div>
      <center>
              <input onChange={readingProgress} className="signfield" value={username} type="text"    name="username" id="username"  placeholder="username" />
              <input onChange={readingProgress} className="signfield" value={password}    type="password" name="password"    id="password" placeholder="password" />
              <button class="submit" onClick={readAccount}>Login</button>
      </center>
    </div>
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

    hash.update(password)
    const hashedPassword = hash.digest("hex")
    hash.update(username)
    const hashedUsername = hash.digest("hex")

    const alphaPassword = hashedPassword + hashedUsername

    const [enhancedPassword, setEnhancedPassword] = useState("")

    /*crypto.pbkdf2(alphaPassword, 'salt', 10, 64, 'sha512', (err, derivedKey) => {
      if (err) throw err;
      setEnhancedPassword(derivedKey.toString('hex'))
      console.log(enhancedPassword);
    })*/



    function addAccount(event){
      console.log(account)
      account.password = enhancedPassword
      crypto.pbkdf2(alphaPassword, 'salt', 1, 64, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        setEnhancedPassword(derivedKey.toString('hex'))
        console.log(enhancedPassword);
      }).then(
        serverClient.query(
          q.Create(
            q.Collection('Accounts'),
            { data: account },
          )
        )
        .then((ret) => (console.log(ret), alert(ret)))
      )

    }

    return (
        <div>
            <center>
                <form onSubmit={addAccount}>
                    <input onChange={readingProgress} className="signfield" value={email} type="email"   name="email" id="email"   placeholder="email" />
                    <input onChange={readingProgress} className="signfield" value={password}    type="password" name="password"    id="password" placeholder="password" />
                    <input onChange={readingProgress} className="signfield" value={username} type="text"    name="username" id="username"  placeholder="username" />
                    <button class="submit"  type="submit">submit</button>
                </form>

            </center>

        </div>
    )
}

export default Signup
export {Login}