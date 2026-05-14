import Notification from "../models/Notification.js";

export const listNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).populate("actor", "name avatar").sort({ createdAt: -1 }).limit(30);
    res.json({ notifications });
  } catch (error) {
    next(error);
  }
};

export const markRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ user: req.user._id }, { read: true });
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    next(error);
  }
};
