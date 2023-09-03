import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../server/src/config/fireBase.config";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser, user} = useContext(UserContext)
  const navigate = useNavigate()
  const handleSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user.uid)
      console.log("Successfully signed in:", user);
      navigate('/')
      // Add your navigation or state update logic here after successful signin
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle errors or display error messages
    }
  };
  console.log(user)
  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignin}>Sign In</button>
    </div>
  );
}
export default SignIn;







