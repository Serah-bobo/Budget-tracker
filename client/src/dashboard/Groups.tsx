import { useUserGroups } from "../api/groups";
import { Link } from "react-router-dom";

const Groups = () => {
  const { data: groups, isLoading, error } = useUserGroups();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 animate-pulse">Loading groups...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-600">
        {(error as Error).message}
      </div>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-2 text-3xl font-bold">Your Groups</h1>
        <p className="text-gray-600">You haven’t joined or created any groups yet.</p>
        <Link
          to="dashboard/groups/create"
          className="inline-block px-4 py-2 mt-4 text-white bg-indigo-600 rounded shadow hover:bg-indigo-700"
        >
          + Create Group
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Groups</h1>
        <Link
          to="/dashboard/groups/create"
          className="px-4 py-2 text-white bg-indigo-600 rounded shadow hover:bg-indigo-700"
        >
          + Create Group
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g: any) => (
          <Link
            to={`/dashboard/groups/${g._id}`}
            key={g._id}
            className="transition duration-300 bg-white border rounded-lg shadow hover:shadow-lg hover:border-indigo-500"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-indigo-700 truncate">
                {g.name}
              </h2>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {g.description || "No description provided."}
              </p>
              <div className="flex flex-col gap-1 mt-4 text-sm text-gray-500">
                <span>💰 Budget Cap: <strong>{g.budgetCap ?? 0}</strong></span>
                <span>👥 Members: {g.members?.length}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Groups;

