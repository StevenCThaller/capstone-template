import { useState, useContext } from 'react';
import './App.css';
import CreateUser from './pages/CreateUser/CreateUser';
import SignIn from './pages/SignIn/SignIn';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './context/userContext';
import { Navigate } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail/MovieDetail';

function App() {
	const { user } = useContext(UserContext);
	const ProtectedRoute = ({ user, children }) => {
		if (!user) {
			return <Navigate to='/signin' replace />;
		}
		return children;
	};

	return (
		<Router>
			<>
				<Routes>
					<Route path='/signup' element={<CreateUser />} />
					<Route path='/signin' element={<SignIn />} />
					<Route path='/' element={<HomePage />}/>
					<Route path='/movieDetail/:id' element={<MovieDetail/>}/>
					{/* <Route
						path='/'
						element={
							<ProtectedRoute user={user}>
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/movieDetail/:id'
						element={
							<ProtectedRoute user={user}>
								<MovieDetail />
							</ProtectedRoute>
						}
					/> */}
				</Routes>
			</>
		</Router>
	);
}

export default App;
