import { ReqRes } from "../interface.js";
import User from "../models/User.js";

// READ
export const getUser: ReqRes = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFriends: ReqRes = async (req, res) => {
  try {
    const { id } = req.params;
    const user: any = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id: any) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE //
export const addRemoveFriend: ReqRes = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user: any = await User.findById(id);
    const friend: any = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id: any) => id !== friendId);
      friend.friends = friend.friends.filter((fid: any) => fid !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id: any) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
