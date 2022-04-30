import { useSession, signIn, signOut } from "next-auth/react"
// import { signIn } from "next-auth/react"

import {useState} from "react"
export default function Component() {
  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const handle = e => {
    setState({...state, [e.target.name]: e.target.value})
  }
  const { data: session, status } = useSession()
  console.log('status: ', status)
  console.log('session', session)
  if(status === 'loading') {
    return <h1>Loading....</h1>
  }
  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <h1>{session?.user?.name}</h1>
      <div>
        <img src={session?.user?.image} alt="user" />
      </div>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  const submit = async e => {
    e.preventDefault();
    const result = await signIn('credentials', { redirect: false, email:state.email, password: state.password })
    console.log(result);

  }
  return <>
    <form onSubmit={submit}>
      <input type="email" name="email" placeholder="email" onChange={handle} value={state.email} /><br />
      <input type="password" name="password" placeholder="password" onChange={handle} value={state.password} />
      <br />
      <input type="submit" value="login"  />
    </form>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </>
}