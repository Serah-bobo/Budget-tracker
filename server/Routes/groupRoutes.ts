import { Router } from "express";
import { createGroup } from "../controller/GroupController";
import {authMiddleware} from '../middleware/authMiddleware';
import { getUserGroups } from "../controller/GroupController";
import { getGroupById } from "../controller/GroupController";
import { joinGroup } from "../controller/GroupController";
import { leaveGroup } from "../controller/GroupController";
import { updateGroup } from "../controller/GroupController";
import { deleteGroup } from "../controller/GroupController";
const router = Router();
// Create a new group
router.post("/create",authMiddleware, createGroup);
// Get all groups for the authenticated user
router.get("/", authMiddleware, getUserGroups);
// Get a group by ID
router.get("/:groupId", authMiddleware, getGroupById);
// Join a group using invite code
router.post("/join", authMiddleware, joinGroup);
// Leave a group
router.post("/leave/:groupId", authMiddleware, leaveGroup);
// Update a group
router.put("/:groupId", authMiddleware, updateGroup);
// Delete a group
router.delete("/:groupId", authMiddleware, deleteGroup);

export default router;