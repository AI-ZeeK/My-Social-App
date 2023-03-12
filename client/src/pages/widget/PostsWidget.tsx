import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/AppSlice";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }: any) => {
	const dispatch = useDispatch();
	const posts = useSelector((state: any) => state.posts);
	const token = useSelector((state: any) => state.token);

	const getPosts = async () => {
		const response = await fetch("https://my-social-app-gqkj.onrender.com/posts", {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		dispatch(setPosts({ posts: data }));
	};

	const getUserPosts = async () => {
		const response = await fetch(
			`https://my-social-app-gqkj.onrender.com/posts/${userId}/posts`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await response.json();
		dispatch(setPosts({ posts: data }));
	};

	useEffect(() => {
		if (isProfile) {
			getUserPosts();
		} else {
			getPosts();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{/* {posts.map(
				({
					_id,
					userId,
					firstName,
					lastName,
					description,
					location,
					picturePath,
					userPicturePath,
					likes,
					comments,
				}: any) => (
					<PostWidget
						key={_id}
						postId={_id}
						postUserId={userId}
						name={`${firstName} ${lastName}`}
						description={description}
						location={location}
						picturePath={picturePath}
						userPicturePath={userPicturePath}
						likes={likes}
						comments={comments}
					/>
				)
			)} */}
		</>
	);
};

export default PostsWidget;
