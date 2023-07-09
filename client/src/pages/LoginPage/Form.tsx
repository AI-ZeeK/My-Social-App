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
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {registerPost, loginPost, reset} from "../../state/ApiSlice";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import LinearProgress from "@mui/material/LinearProgress";
// import FileBase64 from "react-file-base64";
export interface initialValueType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picturePath?: string;
}
const initialValuesRegister: initialValueType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picturePath: "",
};

const Form = () => {
  const [pageType, setPageType] = useState<string>("login");
  const isLogin: boolean = pageType === "login";
  const isRegister: boolean = pageType === "register";
  const [count, setCount] = useState(0);
  const [cool, setCool] = useState(false);
  const [picturePath, setPicturePath]: any = useState(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isErr, setIsErr] = useState<boolean>(false);
  const [picturePathBase64, setPicturePathBase64] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState<initialValueType>(
    initialValuesRegister
  );
  const [userData, setUserData] = useState<initialValueType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picturePath: "",
  });
  const values: initialValueType = formData;
  const {palette}: any = useTheme();
  const {isError, isSuccess, isLoading, message}: any = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const router = useLocation();
  const isNonMobile = useMediaQuery("(min-width: 600px");

  const register = async (values: any) => {
    try {
      console.log(formData, 1);

      const base64String = await encodeBase64(picturePath);
      console.log(formData, 2);
      setFormData((prev) => {
        return {...prev, ...values, picturePath: base64String};
      });
      console.log(formData, 3);

      //   setUserData((prev: initialValueType) => {
      //     return {...prev, ...formData, ["picturePath"]: base64String};
      //   });
      //   userData && (await dispatch(registerPost(userData)));
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (values: initialValueType) => {
    await dispatch(loginPost(values));
  };
  // const handleFormSubmit = async (_values: any, onSubmitProps: any) => {
  // 	if (isLogin) return await login(values, onSubmitProps);
  // 	if (isRegister) return await register(values, onSubmitProps);
  // };
  const handleSubmit = () => {
    // setUserData(formData);
    if (isRegister) register(values);
    if (isLogin) login(values);
  };
  const handleChange = (e: {target: {name: string; value: string}}) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const encodeBase64 = (file: Blob) => {
    return new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);

        reader.onload = async () => {
          let base64String = reader.result as string;
          resolve(base64String);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error("No file provided."));
      }
    });
  };
  useEffect(() => {
    setUserData(userData);
    setPicturePathBase64(picturePathBase64);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
      setIsErr(false);
      setIsLoad(false);
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
    dispatch(reset());
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
          }}
        >
          <CircularProgress style={{zIndex: 20}} />
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
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "1rem .6rem",
              borderRadius: ".4rem",
              minWidth: "18rem",
              maxWidth: "80vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <small
              style={{
                paddingBottom: ".4rem",
                textTransform: "capitalize",
                letterSpacing: "2px",
              }}
            >
              Error Message
            </small>
            <div
              style={{
                width: "140%",
                height: "1px",
                background: "#ccc",
                position: "relative",
                left: "-2rem",
              }}
            ></div>
            <h1
              style={{
                fontSize: "1rem",
                color: "red",
                zIndex: "20",
                paddingTop: "1.4rem",
                paddingBottom: ".6rem",
                fontWeight: 300,
              }}
            >
              {message}!!!
            </h1>
          </div>
        </div>
      )}
      <form
        className="form-box"
        onSubmit={(e: any) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
          }}
        >
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
                sx={{gridColumn: "span 2"}}
              />

              <TextField
                label="Last Name"
                // onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                // error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                // helperText={touched.lastName && errors.lastName}
                sx={{gridColumn: "span 2"}}
              />
              <TextField
                label="Location"
                // onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                // error={Boolean(touched.location) && Boolean(errors.location)}
                // helperText={touched.location && errors.location}
                sx={{gridColumn: "span 2"}}
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
                sx={{gridColumn: "span 2"}}
              />
              <Box
                gridColumn="span 4"
                borderRadius="5px"
                p="1rem"
                border={`1px solid ${palette.neutral.medium}`}
              >
                <Dropzone
                  // acceptedFiles={".jpeg, .jpg, .png"}
                  onDrop={(acceptedFiles: any) => {
                    setPicturePath(acceptedFiles[0]);
                    // setFieldValue("picture", acceptedFiles[0])
                  }}
                  multiple={false}
                >
                  {({getRootProps, getInputProps}) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{"&:hover": {cursor: "pointer"}}}
                    >
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
            sx={{gridColumn: "span 4"}}
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
            sx={{gridColumn: "span 4"}}
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
              "&:hover": {color: palette.primary.main},
            }}
          >
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
            }}
          >
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
