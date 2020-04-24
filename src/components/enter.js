import React, {useState} from 'react'
import faunadb, { query as q } from "faunadb"
import './enter.css'

const thea = {}

function Login(){

  var adminClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
  var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
  adminClient.query(
      q.CreateKey({
        database: q.Database('Codentake'),
        role: 'server',
      })
    )
    .then((ret) => console.log(ret))

    serverClient.query(
      q.CreateIndex({
        name: 'account_name',
        source: q.Collection('Accounts'),
        terms: [{ field: ['data', '"account"'] }],
      })
    )
    .then((ret) => console.log(ret))

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


  function readAccount(event){
    serverClient.query(
      q.Get(
        q.Match(q.Index('account_name'), username)
      )
    )
    .then((ret) => console.log(ret))
}




  return(
    <div>
      <center>
          <form onSubmit={readAccount}>
              <input onChange={readingProgress} className="signfield" value={username} type="text"    name="username" id="username"  placeholder="username" />
              <input onChange={readingProgress} className="signfield" value={password}    type="password" name="password"    id="password" placeholder="password" />
              <button class="submit"  type="submit">Login</button>
          </form>
      </center>
    </div>
  )
}


function Signup() {

    var adminClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    var serverClient = new faunadb.Client({ secret: 'fnADpgTNT1ACEiUC4G_M5eNjnIPvv_eL99-n5nhe' });
    adminClient.query(
        q.CreateKey({
          database: q.Database('Codentake'),
          role: 'server',
        })
      )
      .then((ret) => console.log(ret))

      serverClient.query(
        q.CreateIndex({
          name: 'account_name',
          source: q.Collection('Accounts'),
          terms: [{ field: ['data', '"account"'] }],
        })
      )
      .then((ret) => console.log(ret))

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

    function addAccount(event){
        serverClient.query(
            q.Create(
              q.Collection('Accounts'),
              { data: { account: account } },
            )
          )
          .then((ret) => console.log(ret))

          delete account['email']

        serverClinet.query(
          q.Create(
            q.Collection('short_account_name'),
            {data: {short_account: account}}
          )
        )
    }

    const {email, password, username} = account


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