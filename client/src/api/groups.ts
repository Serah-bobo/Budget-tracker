//useQuery is used to fetch data from the server and cache it for efficient access(GET)
//queryKey is used to uniquely identify the query
//queryFn is the function that fetches the data
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import refreshToken from '../api/refreshToken'
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
            const res= await refreshToken(API_URL)
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
            const res = await refreshToken(`${API_URL}/${groupId}`);
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
         const res= await refreshToken(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

//join group
export const useJoinGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inviteCode: string) => {
      console.log("Joining group with invite code:", inviteCode);

      const res = await refreshToken(`${API_URL}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inviteCode }), // not groupId
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to join group");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
    },
  });
};

//useLeaveGroup 
export const useLeaveGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (groupId: string) => {
      const res = await refreshToken(`${API_URL}/leave/${groupId}`, {
        method: 'POST',
        
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to leave group");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
//useUpdateGroup
export const useUpdateGroup = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateGroupPayload) => {
      const res = await refreshToken(`${API_URL}/${groupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update group");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      queryClient.invalidateQueries({ queryKey: ['groupDetails', groupId] });
    },
  });
};
//useDeleteGroup
export const useDeleteGroup = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await refreshToken(`${API_URL}/${groupId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to delete group");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      queryClient.invalidateQueries({ queryKey: ['groupDetails', groupId] });
    },
  });
};
