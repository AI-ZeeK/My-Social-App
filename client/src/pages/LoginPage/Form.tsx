// import { EditOutlinedIcon  } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
	Box,
	Button,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {registerPost, loginPost} from '../../state/ApiSlice';
import * as yup from "yup";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";

const registerSchema = yup.object().shape({
	firstName: yup.string().required("required"),
	lastName: yup.string().required("required"),
	email: yup.string().email("Invalid email").required("required"),
	password: yup.string().required("required"),
	location: yup.string().required("required"),
	occupation: yup.string().required("required"),
	picture: yup.string().required("required"),
});
const loginSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("required"),
	password: yup.string().required("required"),
});

const initialValuesRegister = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	location: "",
	occupation: "",
};

const initialValuesLogin = {
	email: "",
	password: "",
};

const Form = () => {
	const [pageType, setPageType] = useState("login");
	const [picturePath, setPicturePath] = useState(null)
	const [formData, setFormData] = useState(initialValuesRegister);
	const [userData, setUserData] = useState(null)
	const values = formData;
	const { palette } = useTheme();
	const {isError, isSuccess} = useSelector((state) =>  state)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery("(min-width: 600px");
	const isLogin = pageType === "login";
	const isRegister = pageType === "register";
	const register = async (values: any, onSubmitProps: any) => {
		// this
		try {
			const formData = new FormData();

			console.log(formData, values, "new regggs");
			const xData = Object.assign(formData, { ...values });
			setUserData({...xData, ['picturePath']: picturePath.name})
			// for (let value in values) {
			// 	formData.append(value, values[value]);
			// }
			// formData.append("picturePath", values.picture.name);
			// console.log( userData, "new vererer",);

			// const savedUserResponse = await fetch(
			// 	"https://my-social-app-gqkj.onrender.com/auth/register",
			// 	{
			// 		method: "POST",
			// 		body: x,
			// 	}
			// );
			dispatch(registerPost(userData))
			
			// onSubmitProps.resetForm();
			// console.log(formData, "new regggs");

			// if (savedUser) {
			// 	setPageType("login");
			// }
		} catch (error) {
			console.log(error, "new errrorr");
		}
	};
	const login = async (values: any, onSubmitProps: any) => {
		await dispatch(loginPost(values))	
		if(isSuccess) {
			setFormData(initialValuesRegister)
			navigate('/home')
		}
		navigate('/home')

		// this
		// const loggedInResponse = await fetch("https://my-social-app-gqkj.onrender.com/auth/login", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify(values),
		// });
		// const loggedIn = await loggedInResponse.json();
		// onSubmitProps.resetForm();

		// if (loggedIn) {
		// 	dispatch(
		// 		setLogin({
		// 			user: loggedIn.user,
		// 			token: loggedIn.token,
		// 		})
		// 	);
		// 	navigate("/home");
		// }
	};
	const handleFormSubmit = async (_values: any, onSubmitProps: any) => {
		console.log('not really')
		if (isLogin) return await login(values, onSubmitProps);
		if (isRegister) return await register(values, onSubmitProps);
	};
	const handleSubmit = async (e: MouseEvent) => {
		e.preventDefault()
		console.log("screen", isLogin, isRegister);
		if (isRegister) return await register(values);
		if (isLogin) return await login(values);

	};
	const handleChange = (e: any) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleBlur = false 
	const setFieldValue = true

	return (
		// <Formik
		// 	onSubmit={handleFormSubmit}
		// 	initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
		// 	validationSchema={isLogin ? loginSchema : registerSchema}>
		// 	{({
		// 		// values,
		// 		errors,
		// 		touched,
		// 		handleBlur,
		// 		// handleChange,
		// 		handleSubmit,
		// 		setFieldValue,
		// 		resetForm,
		// 	}) => (
				<form onSubmit={handleSubmit}>
					<Box
						display="grid"
						gap="30px"
						gridTemplateColumns="repeat(4, minmax(0, 1fr))"
						sx={{
							"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
						}}>
						{isRegister && (
							<>
								<TextField
									label="First Name"
									// onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name="firstName"
									// error={
									// 	Boolean(touched.firstName) && Boolean(errors.firstName)
									// }
									// helperText={touched.firstName && errors.firstName}
									sx={{ gridColumn: "span 2" }}
								/>

								<TextField
									label="Last Name"
									// onBlur={handleBlur}
									onChange={handleChange}
									value={values.lastName}
									name="lastName"
									// error={Boolean(touched.lastName) && Boolean(errors.lastName)}
									// helperText={touched.lastName && errors.lastName}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									label="Location"
									// onBlur={handleBlur}
									onChange={handleChange}
									value={values.location}
									name="location"
									// error={Boolean(touched.location) && Boolean(errors.location)}
									// helperText={touched.location && errors.location}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									label="Occupation"
									// onBlur={handleBlur}
									onChange={handleChange}
									value={values.occupation}
									name="occupation"
									// error={
									// 	Boolean(touched.occupation) && Boolean(errors.occupation)
									// }
									// helperText={touched.occupation && errors.occupation}
									sx={{ gridColumn: "span 2" }}
								/>
								<Box
									gridColumn="span 4"
									borderRadius="5px"
									p="1rem"
									border={`1px solid ${palette.neutral.medium}`}>
									<Dropzone
										acceptedFiles=".jpeg, .jpg, .png"
										onDrop={(acceptedFiles: any) =>{
											setPicturePath( acceptedFiles[0])
											// setFieldValue("picture", acceptedFiles[0])
										
										}
										}
										multiple={false}>
										{({ getRootProps, getInputProps }) => (
											<Box
												{...getRootProps()}
												border={`2px dashed ${palette.primary.main}`}
												p="1rem"
												sx={{ "&:hover": { cursor: "pointer" } }}>
												<input {...getInputProps()} />
												{!picturePath ? (
													<p>Add Picture Here</p>
												) : (
													<FlexBetween>
														<Typography>{picturePath.name}</Typography>
														<EditOutlinedIcon />
													</FlexBetween>
												)}
											</Box>
										)}
									</Dropzone>
								</Box>
							</>
						)}
						<TextField
							label="Email"
							// onBlur={handleBlur}
							onChange={handleChange}
							value={values.email}
							name="email"
							// error={Boolean(touched.email) && Boolean(errors.email)}
							// helperText={touched.email && errors.email}
							sx={{ gridColumn: "span 4" }}
						/>
						<TextField
							label="Password"
							type='password'
							// onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name="password"
							// error={Boolean(touched.password) && Boolean(errors.password)}
							// helperText={touched.password && errors.password}
							sx={{ gridColumn: "span 4" }}
						/>
					</Box>
					{/* BUTTONS */}
					<Box>
						<Button
							fullWidth
							type="submit"
							sx={{
								m: "2rem 0",
								p: "1rem",
								backgroundColor: palette.primary.main,
								color: palette.background.default,
								"&:hover": { color: palette.primary.main },
							}}>
							{isLogin ? "LOGIN" : "REGISTER"}{" "}
						</Button>
						<Typography
							onClick={() => {
								setPageType(isLogin ? "register" : "login");
								// resetForm();
							}}
							sx={{
								textDecoration: "underline",
								color: palette.primary.main,
								"&:hover": {
									cursor: "pointer",
									color: palette.primary.light,
								},
							}}>
							{isLogin
								? "Don't have an account? Sign Up Here."
								: "Already have an account? Login Here."}
						</Typography>
					</Box>
				</form>
			// )}
		// </Formik>
	);
};

export default Form;
