/*import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState,useRecoilValue } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";
import suggestedAtom from "../atoms/suggestedAtom";
//import userAtom from "../atoms/userAtom";
const HomePage = () => {
	//const [suggestedUser, setSuggestedUser] = useRecoilState(suggestedAtom);
	//const currentUser = useRecoilValue(userAtom);
	//const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
	const suggestedUser = useRecoilValue(suggestedAtom);
	
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();
	
	useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			setPosts([]);
			try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				//console.log(data);
				//console.log("hi");
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
			//console.log(suggestedUser);
		};
		
		getFeedPosts();
		
	}, [showToast, setPosts,suggestedUser]);

	return (
		<Flex gap='10' alignItems={"flex-start"} >
			<Box flex={70}>
				{!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

				{loading && (
					<Flex justify='center'>
						<Spinner size='xl' />
					</Flex>
				)}

				{posts.map((post) => (
					<Post key={post._id} post={post} postedBy={post.postedBy} />
				))}
			</Box>
			<Box
				flex={30}
				flexDirection={{md:"column"}}
				display={{
					base: "none",
					md: "block",
				}}
			>
				<SuggestedUsers />
			</Box>
		</Flex>
	);
};

export default HomePage;*/
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";
import suggestedAtom from "../atoms/suggestedAtom";

const HomePage = () => {
  const suggestedUser = useRecoilValue(suggestedAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [showToast, setPosts,suggestedUser]);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: 5, md: 10 }}
      alignItems={{ base: "center", md: "flex-start" }}
    >
      <Box flex={{ base: "100%", md: 70 }}>
        {!loading && posts.length === 0 && (
          <h1>Follow some users to see the feed</h1>
        )}

        {loading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )}

        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>
      <Box
        flex={{ base: "100%", md: 30 }}
        display={{ base: "block", md: "flex" }}
        flexDirection={{ md: "column" }}
        alignItems="flex-start"
      >
        <SuggestedUsers />
      </Box>
    </Flex>
  );
};

export default HomePage;
