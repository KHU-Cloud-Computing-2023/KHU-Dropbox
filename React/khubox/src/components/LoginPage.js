import '../App.css';

function Form(){
  return <div className ="App">
  <input type ="form" placeholder="ID"></input>
  <input type ="form" placeholder="Password"></input>
  <input type="form" placeholder="Name"></input>
  <input type="form" placeholder="Work"></input>
  <input type="form" placeholder="Education"></input>
  <input type="form" placeholder="Email"></input>
  <input type="form" placeholder="Mobile"></input>
  </div>
}

function LoginPage() {
  return (
  <div className="App">
      <div className="title">
        KHUBox
      </div>
      <Form></Form>
      <button type ="signup">signup</button>
  </div>
  );
}

export default LoginPage;