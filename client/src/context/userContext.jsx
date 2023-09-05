import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../../../server/src/config/fireBase.config';
// Create the UserContext
export const UserContext = createContext();
// Create a UserProvider component to manage the user state
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
