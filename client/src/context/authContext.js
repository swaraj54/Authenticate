import { createContext, useEffect, useReducer } from "react";
import api from "./../helper/AxiosConfig.js";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        default:
            return state;
    }
}
const initialState = { user: null }

const ParentAuthContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const Login = (token, data) => {
        if (token) {
            JSON.stringify(localStorage.setItem("my-token", token))
        }
        dispatch({ type: "LOGIN", payload: data })
    }
    const Logout = () => {
        localStorage.removeItem("my-token")
        dispatch({ type: "LOGOUT" })
        toast.success("Logout successfull.")
    }
    useEffect(() => {
        async function getCurrentUser() {
            try {
                const response = await api.post('/user/get-current-user', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.data.success) {
                    Login("", response.data.user)
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        const token = localStorage.getItem("my-token")
        if (token) {
            getCurrentUser()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ state, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default ParentAuthContext;