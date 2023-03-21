import {
	EditOutlined,
	DeleteOutlined,
	AttachFileOutlined,
	GifBoxOutlined,
	ImageOutlined,
	MicOutlined,
	MoreHorizOutlined,
} from "@mui/icons-material";
import {
	Box,
	Divider,
	Typography,
	InputBase,
	useTheme,
	Button,
	IconButton,
	useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/widgets/WidgetWrapper";
import Dropzone from "react-dropzone";
import UserImage from "../../components/widgets/UserImageWidget";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socialPost } from "../../state/ApiSlice";

const MyPostWidget = ({ picturePath }: any) => {
	const dispatch = useDispatch();
	const [isImage, setIsImage] = useState(false);
	const [image, setImage]: any = useState(null);
	const [formData, setFormData] = useState<any>({
		userId: "",
		description: "",
		picturePath: "",
		picture: "",
	});
	const [picturePathBase64, setPicturePathBase64] = useState<string | null>(
		null
	);
	const [file, setFile] = useState(null);
	const [post, setPost] = useState("");
	const { palette }: any = useTheme();
	const { _id } = useSelector((state: any) => state.user);
	const token = useSelector((state: any) => state.token);
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
	const mediumMain = palette.neutral.mediumMain;
	const medium = palette.neutral.medium;
	console.log(token);
	const handlePost = () => {
		// const formData = new FormData();
		// if(_id)
		if (image)
			setFormData((prev: any) => ({
				...prev,
				["userId"]: _id,
				["description"]: post,
				["picturePath"]: picturePathBase64,
				["picture"]: image,
			}));

		setFormData((prev: any) => ({
			...prev,
			["userId"]: _id,
			["description"]: post,
		}));

		//     formData.assign(["userId"], _id);
		//  const x =   formData.assign(["description"], post);

		//     if (image) {
		//       formData.assign(["picture"], image);
		//       formData.assign(["picturePath"], image.name);
		//     }

		// const response = await fetch(
		// 	`https://my-social-app-gqkj.onrender.com/posts`,
		// 	{
		// 		method: "POST",
		// 		headers: { Authorization: `Bearer ${token}` },
		// 		body: formData,
		// 	}
		// );
		console.log(formData);
		dispatch(socialPost([formData, token]));
		// setImage(null);
		// setPost("");
	};
	// console.log(picturePathBase64);
	const encodeBase64 = useCallback(() => {
		if (file) {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			try {
				reader.onload = () => {
					let Base64: any = reader.result;
					setPicturePathBase64(Base64);
					// console.log("not error: ", picturePathBase64);
				};
				reader.onerror = (error) => {
					console.log("error: ", error);
				};
			} catch (error) {
				console.log(error);
			}
		} else {
			setPicturePathBase64(null);
		}
	}, [file, setPicturePathBase64]);

	useEffect(() => {
		encodeBase64();
	}, [encodeBase64]);

	return (
		<WidgetWrapper>
			<FlexBetween gap="1.5rem">
				<UserImage image={picturePath} />
				<InputBase
					placeholder="What's on your mind..."
					onChange={(e) => setPost(e.target.value)}
					value={post}
					sx={{
						width: "100%",
						backgroundColor: palette.neutral.light,
						borderRadius: "2rem",
						padding: "1rem 2rem",
					}}
				/>
			</FlexBetween>
			{isImage && (
				<Box
					border={`1px solid ${medium}`}
					borderRadius="5px"
					mt="1rem"
					p="1rem">
					<Dropzone
						// acceptedFiles=".jpg,.jpeg,.png"
						multiple={false}
						onDrop={(acceptedFiles: any) => {
							setFile(acceptedFiles[0]);
							picturePathBase64 && setImage(acceptedFiles[0]);
							// Store result into  your state array
						}}>
						{({ getRootProps, getInputProps }) => (
							<FlexBetween>
								<Box
									{...getRootProps()}
									border={`2px dashed ${palette.primary.main}`}
									p="1rem"
									width="100%"
									sx={{ "&:hover": { cursor: "pointer" } }}>
									<input {...getInputProps()} />
									{!image ? (
										<p>Add Image Here</p>
									) : (
										<FlexBetween>
											<Typography>{image.name}</Typography>
											<EditOutlined />
										</FlexBetween>
									)}
								</Box>
								{image && (
									<IconButton
										onClick={() => setImage(null)}
										sx={{ width: "15%" }}>
										<DeleteOutlined />
									</IconButton>
								)}
							</FlexBetween>
						)}
					</Dropzone>
				</Box>
			)}

			<Divider sx={{ margin: "1.25rem 0" }} />

			<FlexBetween>
				<FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
					<ImageOutlined sx={{ color: mediumMain }} />
					<Typography
						color={mediumMain}
						sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
						Image
					</Typography>
				</FlexBetween>

				{isNonMobileScreens ? (
					<>
						<FlexBetween gap="0.25rem">
							<GifBoxOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Clip</Typography>
						</FlexBetween>

						<FlexBetween gap="0.25rem">
							<AttachFileOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Attachment</Typography>
						</FlexBetween>

						<FlexBetween gap="0.25rem">
							<MicOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Audio</Typography>
						</FlexBetween>
					</>
				) : (
					<FlexBetween gap="0.25rem">
						<MoreHorizOutlined sx={{ color: mediumMain }} />
					</FlexBetween>
				)}

				<Button
					disabled={!post}
					onClick={handlePost}
					sx={{
						color: palette.background.alt,
						backgroundColor: palette.primary.main,
						borderRadius: "3rem",
					}}>
					POST
				</Button>
			</FlexBetween>
		</WidgetWrapper>
	);
};

export default MyPostWidget;
