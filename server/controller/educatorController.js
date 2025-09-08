import { clerkClient } from "@clerk/express";

export const updateRoleToEducator = async (req, res) => {
    console.log("1. Reached updateRoleToEducator function."); // DEBUG
    try {
        const { userId } = req.auth; 
        console.log(`2. Got userId: ${userId}`); // DEBUG

        if (!userId) {
            console.log("3. Unauthorized, no userId found."); // DEBUG
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        console.log("4. About to call Clerk to update metadata..."); // DEBUG
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: { role: 'educator' }
        });
        console.log("5. Successfully updated metadata in Clerk."); // DEBUG

        res.json({ 
            success: true, 
            message: 'You can now publish courses as an educator.'
        });

    } catch (error) {
        console.error("!!! ERROR in updateRoleToEducator:", error); // DEBUG
        res.status(500).json({ 
            success: false, 
            message: error.message || "An internal server error occurred."
        });
    }
};
