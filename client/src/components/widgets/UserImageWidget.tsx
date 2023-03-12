import { Box } from "@mui/material";
import { styled } from "@mui/system";

const UserImage = ({ image, size = "60px" }) => {
	return (
		<Box width={size} height={size}>
			<img
				width={size}
				height={size}
				style={{ objectFit: "cover", borderRadius: "50%" }}
				alt="user"
				src={`https://my-social-app-gqkj.onrender.com/assets/${image}`}
			/>
		</Box>
	);
};

export default UserImage;
