import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../components/widgets/WidgetWrapper";
import Friend from "../../components/Friend";
import { setFriends } from "../../state/AppSlice";
import { getFriends } from "../../state/ApiSlice";

const FriendListWidget = ({ userId }: any) => {
  const dispatch = useDispatch();
  const { palette }: any = useTheme();
  const token = useSelector((state: any) => state.token);
  const friends = useSelector((state: any) => state.user.friends);

  // const getFriends = async () => {
  // 	const response = await fetch(
  // 	// 	`https://my-social-app-gqkj.onrender.com/users/${userId}/friends`,
  // 	// 	{
  // 	// 		method: "GET",
  // 	// 		headers: { Authorization: `Bearer ${token}` },
  // 	// 	}
  // 	);
  // 	const data = await response.json();
  // 	dispatch(setFriends({ friends: data }));
  // };

  useEffect(() => {
    getFriends();
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}>
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend: any) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
