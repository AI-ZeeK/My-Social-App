// import { EditOutlinedIcon  } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerPost, loginPost } from "../../state/ApiSlice";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import LinearProgress from "@mui/material/LinearProgress";
// import FileBase64 from "react-file-base64";

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picturePath: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [count, setCount] = useState(0);
  const [cool, setCool] = useState(false);
  const [picturePath, setPicturePath]: any = useState(null);
  const [picturePathBase64, setPicturePathBase64] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState(initialValuesRegister);
  const [isLoad, setIsLoad] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picturePath: "",
  });
  const values = formData;
  const { palette }: any = useTheme();
  const { isError, isSuccess, isLoading, message }: any = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px");

  const register = async (values: any) => {
    try {
      const formData = new FormData();
      const xData = await Object.assign(formData, { ...values });
      console.log(Object.values(xData), Object.keys(xData));
      setUserData((prev: any) => ({
        ...prev,
        ...xData,
        ["picturePath"]: picturePathBase64,
      }));
      console.log(userData, values, "new regggs", xData);

      userData && (await dispatch(registerPost(userData)));
    } catch (error) {
      console.log(error, "new errrorr");
    }
  };
  const login = async (values: any) => {
    await dispatch(loginPost(values));
  };
  // const handleFormSubmit = async (_values: any, onSubmitProps: any) => {
  // 	console.log("not really");
  // 	if (isLogin) return await login(values, onSubmitProps);
  // 	if (isRegister) return await register(values, onSubmitProps);
  // };
  const handleSubmit = async () => {
    console.log("screen", isLogin, isRegister);
    setUserData(formData);
    if (isRegister) await register(values);
    if (isLogin) await login(values);
  };
  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  const encodeBase64 = (file: any) => {
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      try {
        reader.onload = async () => {
          let Base64: any = reader.result;
          setPicturePathBase64(Base64);
          setCool(true);
          setCount((prev) => prev + 1);
          console.log("not error: ", picturePathBase64, cool, count);
        };
        reader.onerror = (error) => {
          console.log("error: ", error);
        };
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
      setIsErr(false);
      setIsErr(false);
    }
    if (isLoading) {
      setIsLoad(true);
      setIsErr(false);
    }
    if (isError) {
      setIsLoad(false);
      setIsErr(true);
      setTimeout(() => {
        setIsErr(false);
      }, 2000);
      // return <h1>Failed</h1>;
    }
  }, [isSuccess, isLoading, isError]);

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
    <>
      {isLoad && (
        <div
          style={{
            position: "fixed",
            bottom: "0%",
            left: "0%",
            width: "100vw",
            background: "#00000044",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}>
          <CircularProgress style={{ zIndex: 20 }} />
        </div>
      )}
      {isErr && (
        <div
          style={{
            position: "fixed",
            bottom: "0%",
            left: "0%",
            width: "100vw",
            background: "#00000044",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}>
          <h1 style={{ fontSize: "2.4rem", color: "red", zIndex: "20" }}>
            {message}!
          </h1>
        </div>
      )}
      <form
        className="form-box"
        onSubmit={(e: any) => {
          e.preventDefault();
          handleSubmit();
        }}>
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
                {/* <FileBase64
										style={{display: 'none'}}
										className='display-none'
										
						type="file"
						value={picturePath}
						onChange={(e) => { 	
						setPicturePath( e.target.files)
						} }
						placeholder="Select Files"
						multiple={false}
						onDone={handleDone}
					/> */}
                <Dropzone
                  // acceptedFiles={".jpeg, .jpg, .png"}
                  onDrop={(acceptedFiles: any) => {
                    encodeBase64(acceptedFiles[0]);
                    picturePathBase64 && setPicturePath(acceptedFiles[0]);
                    // setFieldValue("picture", acceptedFiles[0])
                  }}
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
            id={"password"}
            onChange={handleChange}
            value={values.email}
            name="email"
            // error={Boolean(touched.email) && Boolean(errors.email)}
            // helperText={touched.email && errors.email}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Password"
            type="password"
            id={"password"}
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
    </>
  );
};

export default Form;
