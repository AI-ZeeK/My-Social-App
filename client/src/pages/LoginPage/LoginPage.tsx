import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Form from "./Form";

type Props = {};

const LoginPage = (props: Props) => {
	const theme = useTheme();
	const isNonMobileScreens = useMediaQuery("(min-width : 1000px)");

	return (
		<Box>
			<Box
			component="div"
				width="100%"
				bgcolor={theme.palette.background?.alt}
				p="1rem 6%"
				textAlign={"center"}>
				<Typography fontWeight="bold" fontSize="32px" color="primary">
					Sociopedia
				</Typography>
			</Box>
			<Box
			 component="div"
				width={isNonMobileScreens ? "50%" : "93%"}
				p="2rem"
				m="2rem auto"
				borderRadius={"1.5rem"}
				bgColor={theme.palette.background?.alt}>
				<Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
					Welcome to Sociopedia, the social Media For Sociopaths!
				</Typography>
				<Form />
			</Box>
		</Box>
	);
};

export default LoginPage;
