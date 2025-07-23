//useQuery is used to fetch data from the server and cache it for efficient access(GET)
//queryKey is used to uniquely identify the query
//queryFn is the function that fetches the data
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
const API_URL = "http://localhost:5000/api/groups";

interface CreateGroupPayload {
  name: string;
  budgetCap?: number;
  description?: string;
}
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
//get group by id
export const useGroupDetails = (groupId: string) => {
    return useQuery({
        queryKey: ['groupDetails', groupId],
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                throw new Error("No access token found");
            }
            const res = await fetch(`${API_URL}/${groupId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            if (!res.ok) {
                throw new Error("Failed to fetch group details");
            }
            return res.json();
        }
    });
}
//create a group
//useQueryClient is a hook used to access the query client instance for managing cache
//useMutation is used to perform create, update or delete operations
//useQueryClient does the following:It allows you to invalidate or refetch queries after a mutation
//useMutation you need to provide a mutationFn which is the function that performs the mutation
export const useCreateGroup = () => {
const queryClient = useQueryClient();
    return useMutation({
        mutationFn:async(data: CreateGroupPayload) => {
         const res= await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(data),
         })
            if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create group");
      }

      return res.json();

        },
    onSuccess: () => {
            // Invalidate the userGroups query to refetch the updated list
            //inavalidateQueries is used to refetch the data for the query with the given queryKey
            queryClient.invalidateQueries({ queryKey: ['userGroups'] });
        }
    })
}