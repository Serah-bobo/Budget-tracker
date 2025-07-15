import { Router } from "express";
import { createGroup } from "../controller/GroupController";
import {authMiddleware} from '../middleware/authMiddleware';
import { getUserGroups } from "../controller/GroupController";
import { getGroupById } from "../controller/GroupController";
import { joinGroup } from "../controller/GroupController";
const router = Router();
// Create a new group
router.post("/create",authMiddleware, createGroup);
// Get all groups for the authenticated user
router.get("/", authMiddleware, getUserGroups);
// Get a group by ID
router.get("/:groupId", authMiddleware, getGroupById);
// Join a group using invite code
router.post("/join", authMiddleware, joinGroup);

export default router;