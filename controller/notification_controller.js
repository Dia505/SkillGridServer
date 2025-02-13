const Notification = require("../model/Notification");

const getNotificationsByClientId = async (req, res) => {
    try {
        const {client_id} = req.params;
        const notifications = await Notification.find({
            client_id,
            read: false
        }).sort({ notification_date: -1 });

        res.status(200).json(notifications);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

const getNotificationsByFreelancerId = async (req, res) => {
    try {
        const {freelancer_id} = req.params;
        const notifications = await Notification.find({
            freelancer_id,
            read: false
        }).sort({ notification_date: -1 });

        res.status(200).json(notifications);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

const markNotificationAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        await Notification.findByIdAndUpdate(notificationId, { read: true });

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getNotificationsByClientId,
    getNotificationsByFreelancerId,
    markNotificationAsRead
}