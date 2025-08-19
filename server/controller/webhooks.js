import { Webhook } from "svix";
import User from "../models/User.js"

export const clerkWebhooks = async (req, res) => {
    try {
        const payload = JSON.stringify(req.body);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // Verify the webhook signature - THIS IS CRITICAL
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const evt = wh.verify(payload, headers);
        const { data, type } = evt; // Use the verified event data

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.image_url,
                    enrolledCourses: [] // Added missing field
                };
                await User.create(userData);
                return res.status(200).json({ success: true });
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.image_url
                };
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                return res.status(200).json({ success: true });
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                return res.status(200).json({ success: true });
            }

            default:
                return res.status(200).json({ success: true, message: 'Event not handled' });
        }
    } catch (error) {
        console.error("Webhook error:", error);
        return res.status(400).json({
            success: false, 
            message: error.message
        });
    }
}