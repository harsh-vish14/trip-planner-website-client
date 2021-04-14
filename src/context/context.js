import { createContext,useState } from 'react';
export const UserContext = createContext();
export const UserContextProvider = (props) => {
    const [userPresent, setuserPresent] = useState(true);
    return (
        <UserContext.Provider value={{ user: [userPresent, setuserPresent] }}>
            {props.children}
        </UserContext.Provider>
    )
};