//useQuery is used to fetch data from the server and cache it for efficient access
import { useQuery } from "@tanstack/react-query";
;const API_URL = "http://localhost:5000/api/groups";
export const useUserGroups = () => {
    return useQuery({
        queryKey:['userGroups'],
        queryFn:async ()=>{
            const token= localStorage.getItem("accessToken");
            if(!token){
                throw new Error("No access token found");
            }
            const res= await fetch(`${API_URL}/`,{
                headers:{
                    authorization:`Bearer ${token}`,
                }
            })
            if(!res.ok){
                throw new Error("Failed to fetch user groups");
            }
            return res.json();
        }
    });
}