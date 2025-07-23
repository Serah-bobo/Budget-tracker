import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaWallet, FaBullseye, FaArrowLeft } from "react-icons/fa";
import { useGroupDetails } from "../api/groups";

const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  const { data: group, isLoading, error } = useGroupDetails(groupId!);

  if (isLoading) return <p>Loading group details…</p>;
  if (error) return <p className="text-red-600">{(error as Error).message}</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 mb-4 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
      >
        <FaArrowLeft className="inline mr-1" /> Back
      </button>

      <div className="p-6 mb-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold">{group.name}</h1>
        <p className="text-gray-600">{group.description}</p>

        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
          <div className="p-4 rounded shadow bg-indigo-50">
            <h2 className="font-semibold">Budget Cap</h2>
            <p>${group.budgetCap}</p>
          </div>
          <div className="p-4 rounded shadow bg-green-50">
            <h2 className="font-semibold">Balance</h2>
            <p>${group.balance}</p>
          </div>
          <div className="p-4 rounded shadow bg-yellow-50">
            <h2 className="font-semibold">Invite Code</h2>
            <p>{group.inviteCode}</p>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="p-6 mb-6 bg-white rounded shadow">
        <h2 className="mb-4 text-xl font-bold">
          <FaUser className="inline mr-2" /> Members
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2 border-b">Name</th>
              <th className="py-2 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {group.members.map((m: any) => (
              <tr key={m._id}>
                <td className="py-1 border-b">{m.name}</td>
                <td className="py-1 border-b">{m.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expenses */}
      <div className="p-6 mb-6 bg-white rounded shadow">
        <h2 className="mb-4 text-xl font-bold">
          <FaWallet className="inline mr-2" /> Expenses
        </h2>
        {group.expenses.length === 0 ? (
          <p className="text-gray-500">No expenses recorded yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 border-b">Description</th>
                <th className="py-2 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {group.expenses.map((e: any) => (
                <tr key={e._id}>
                  <td className="py-1 border-b">{e.description}</td>
                  <td className="py-1 border-b">${e.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Goals */}
      <div className="p-6 bg-white rounded shadow">
        <h2 className="mb-4 text-xl font-bold">
          <FaBullseye className="inline mr-2" /> Goals
        </h2>
        {group.goals.length === 0 ? (
          <p className="text-gray-500">No goals set yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 border-b">Goal</th>
                <th className="py-2 border-b">Target</th>
              </tr>
            </thead>
            <tbody>
              {group.goals.map((g: any) => (
                <tr key={g._id}>
                  <td className="py-1 border-b">{g.name}</td>
                  <td className="py-1 border-b">${g.targetAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
