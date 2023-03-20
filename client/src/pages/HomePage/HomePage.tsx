import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import UserWidget from "../widget/UserWidget";
import MyPostWidget from "../widget/MyPostWidget";
import PostsWidget from "../widget/PostsWidget";
import AdvertWidget from "../widget/AdvertWidget";
import FriendListWidget from "../widget/FriendListWidget";

import {
	Box,
	Button,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
	const { _id, picturePath } = useSelector((state: any) => state.user);

	return (
		<Box>
			<NavBar />
			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreens ? "flex" : "block"}
				gap="0.5rem"
				justifyContent="space-between">
				<Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
					<UserWidget userId={_id} picturePath={picturePath} />
				</Box>
				<Box
					flexBasis={isNonMobileScreens ? "42%" : undefined}
					mt={isNonMobileScreens ? undefined : "2rem"}>
					<MyPostWidget picturePath={picturePath} />
					<PostsWidget userId={_id} />
				</Box>
				{isNonMobileScreens && (
					<Box flexBasis="26%">
						<AdvertWidget />
						<Box m="2rem 0" />
						<FriendListWidget userId={_id} />
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default HomePage;
