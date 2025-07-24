import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useJoinGroup } from "../api/groups";

// 1. Define Zod schema
const joinGroupSchema = z.object({
  groupCode: z.string().min(5, "Group code must be at least 5 characters"),
});

// 2. Infer type
type JoinGroupSchemaType = z.infer<typeof joinGroupSchema>;

const JoinGroup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinGroupSchemaType>({
    resolver: zodResolver(joinGroupSchema),
  });

  const { mutate, isPending } = useJoinGroup();

  const onSubmit = (data: JoinGroupSchemaType) => {
    mutate(data.groupCode, {
      onSuccess: (response) => {
        toast.success("Joined group successfully!");
        navigate(`/dashboard/groups/${response.group._id}`);
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Failed to join group."
        );
      },
    });
  };

  return (
    <div className="max-w-md p-4 mx-auto bg-white shadow rounded-xl">
      <h2 className="mb-4 text-xl font-bold">Join a Group</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="groupCode" className="block font-medium">
            Group Code
          </label>
          <input
            type="text"
            id="groupCode"
            {...register("groupCode")}
            className="w-full px-3 py-2 mt-1 border rounded"
            placeholder="Enter group code"
          />
          {errors.groupCode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.groupCode.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          disabled={isPending}
        >
          {isPending ? "Joining..." : "Join Group"}
        </button>
      </form>
    </div>
  );
};

export default JoinGroup;
