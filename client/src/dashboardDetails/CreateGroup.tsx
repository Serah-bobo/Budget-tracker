import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGroupSchema,
  CreateGroupSchemaType,
} from "../schemas/CreateGroupSchema";
import { useCreateGroup } from "../api/groups";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateGroup = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateGroup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGroupSchemaType>({
    resolver: zodResolver(createGroupSchema),
  });

  const onSubmit = (data: CreateGroupSchemaType) => {
    mutate(data, {
      onSuccess: (response) => {
        reset();
        toast.success("✅ Group created successfully!");
        navigate(`/dashboard/groups/${response.group._id}`);
      },
      onError: (err) => {
        toast.error(
          (err as Error).message || "❌ Failed to create group. Please try again."
        );
      },
    });
  };

  return (
    <div className="max-w-lg p-8 mx-auto mt-10 bg-white rounded shadow">
      <h1 className="mb-6 text-3xl font-bold text-center text-indigo-700">
        Create a New Group
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium">
            Group Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="e.g., Family Budget"
            {...register("name")}
            className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Optional description of the group"
            {...register("description")}
            rows={3}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="budgetCap" className="block mb-1 text-sm font-medium">
            Budget Cap
          </label>
          <input
            type="number"
            id="budgetCap"
            placeholder="e.g., 5000"
            {...register("budgetCap")}
            className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 ${
              errors.budgetCap ? "border-red-500" : ""
            }`}
          />
          {errors.budgetCap && (
            <p className="mt-1 text-xs text-red-600">
              {errors.budgetCap.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 font-semibold text-white rounded ${
            isPending
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isPending ? "Creating..." : "Create Group"}
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
