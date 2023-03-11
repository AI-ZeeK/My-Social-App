import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
	Twitter,
	LinkedIn,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/widgets/UserImageWidget";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/widgets/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }: any) => {
	const [user, setUser] = useState({
		firstName: "green",
		lastName: "theo",
		location: "norway",
		occupation: "miner",
		viewedProfile: true,
		impressions: 6,
		friends: ["green"],
	});
	const { palette }: any = useTheme();
	const navigate = useNavigate();
	const token = useSelector((state: any) => state.token);
	const dark = palette.neutral.dark;
	const medium = palette.neutral.medium;
	const main = palette.neutral.main;

	// const getUser = async () => {
	// 	const response = await fetch(`http://localhost:5000/users/${userId}`, {
	// 		method: "GET",
	// 		headers: { Authorisation: `Bearer ${token}` },
	// 	});
	// 	const data = await response.json();
	// 	setUser(data);
	// };

	// useEffect(() => {
	// 	getUser();
	// }, []);

	if (!user) {
		return null;
	}

	const {
		firstName,
		lastName,
		location,
		occupation,
		viewedProfile,
		impressions,
		friends,
	} = user;

	return (
		<WidgetWrapper>
			{/* FIRST ROW */}
			<FlexBetween
				gap="0.5rem"
				pb="1.1rem"
				onClick={() => navigate(`/profile/${userId}`)}>
				<FlexBetween gap="1rem">
					<UserImage image={picturePath} />
					<Box>
						<Typography
							variant="h4"
							color={dark}
							fontWeight="500"
							sx={{
								"&hover": {
									color: palette.primary.light,
									cursor: "pointer",
								},
							}}>
							{firstName} {lastName}
						</Typography>
						<Typography color={medium}>{friends.length} friends </Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>
			<Divider />
			{/* SECOND ROW */}
			<Box p="1rem 0">
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<LocationOnOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{location} </Typography>
				</Box>
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{occupation} </Typography>
				</Box>
			</Box>

			{/* THIRD ROW */}
			<Box p="1rem 0">
				<FlexBetween mb="0.5rem">
					<Typography color={medium}>Who's viewed you profile </Typography>
					<Typography color={medium} fontWeight="500">
						{" "}
						{viewedProfile}{" "}
					</Typography>
				</FlexBetween>
				<FlexBetween mb="0.5rem">
					<Typography color={medium}>Impressions of your post</Typography>
					<Typography color={medium} fontWeight="500">
						{" "}
						{impressions}{" "}
					</Typography>
				</FlexBetween>

				{/* FOURTH BOX */}
				<Box p="1rem 0">
					<Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
						{" "}
						Social Profiles{" "}
					</Typography>
					<FlexBetween gap="1rem" mb="0.5rem">
						<FlexBetween gap="1rem">
							<Twitter />
							<Box>
								<Typography color={main} fontWeight="500">
									Twitter
								</Typography>
								<Typography color={medium}>Social Network</Typography>
							</Box>
						</FlexBetween>
						<EditOutlined sx={{ color: main }} />
					</FlexBetween>
					<FlexBetween gap="1rem">
						<FlexBetween gap="1rem">
							<LinkedIn />
							<Box>
								<Typography color={main} fontWeight="500">
									LinkedIn
								</Typography>
								<Typography color={medium}>Network Platform</Typography>
							</Box>
						</FlexBetween>
						<EditOutlined sx={{ color: main }} />
					</FlexBetween>
				</Box>
			</Box>
		</WidgetWrapper>
	);
};

export default UserWidget;
