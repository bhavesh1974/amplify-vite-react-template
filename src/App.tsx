import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { useEffect } from "react";
import { Hub } from 'aws-amplify/utils';

//const client = generateClient<Schema>();

function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  // function deleteTodo(id: string) {
  //   client.models.Todo.delete({ id })
  // }

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    // const { username, userId, signInDetails } = await getCurrentUser();

    // console.log("username", username);
    // console.log("user id", userId);
    // console.log("sign-in details", signInDetails);    

    const session = await fetchAuthSession();
    console.log("session", session);
    // console.log("id token", session.tokens.idToken)
    // console.log("access token", session.tokens.accessToken)    

    const attributes = await fetchUserAttributes();
    console.log("attributes", attributes);
  }

  Hub.listen('auth', ({ payload }) => {
    switch (payload.event) {
      case 'signedIn':
        console.log('user have been signedIn successfully.');
        break;
      case 'signedOut':
        console.log('user have been signedOut successfully.');
        break;
      case 'tokenRefresh':
        console.log('auth tokens have been refreshed.');
        break;
      case 'tokenRefresh_failure':
        console.log('failure while refreshing auth tokens.');
        break;
      case 'signInWithRedirect':
        console.log('signInWithRedirect API has successfully been resolved.');
        break;
      case 'signInWithRedirect_failure':
        console.log('failure while trying to resolve signInWithRedirect API.');
        break;
      case 'customOAuthState':
        console.info('custom state returned from CognitoHosted UI');
        break;
    }
  });

  return (
    <Authenticator hideSignUp  signUpAttributes={[
      'name'
    ]}>
      {({ signOut, user }) => (

    <main>
      <h1>Hello {user?.username}</h1>
      {/* <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
        ))}
      </ul> */}
      <div>
        🥳 SUCCESSFULLY LOGIN...
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>      
    </main>
  )}
  </Authenticator>    
  );
}

export default App;
