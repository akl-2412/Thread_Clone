import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import {useRecoilValue } from "recoil";
import { useState } from "react";
import userAtom from "../atoms/userAtom";
import SearchProfile from "../components/SearchProfile";
const SearchPage = () => {
	const [searchingUser, setSearchingUser] = useState(false);
	const [searchText, setSearchText] = useState("");
    const [searchedUser,setSearchedUser]=useState([]);
	const currentUser = useRecoilValue(userAtom);
    const [loading,setLoading]=useState(false);
	const showToast = useShowToast();
	const handleConversationSearch = async (e) => {
		e.preventDefault();
		setSearchingUser(true);
        setLoading(true);
		try {
			const res = await fetch(`/api/users/profile/${searchText}`);
			const searchedUser = await res.json();
			if (searchedUser.error) {
				showToast("Error", searchedUser.error, "error");
				return;
			}

			const messagingYourself = searchedUser._id === currentUser._id;
			if (messagingYourself) {
				showToast("Error", "You cannot Search yourself", "error");
				return;
			}
            else{
                setSearchedUser([searchedUser]);
            }			
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setSearchingUser(false);
            setLoading(false);
		}
	};

	return (
		<Box
			position={"absolute"}
			left={"50%"}
			w={{ base: "100%", md: "80%", lg: "750px" }}
			p={4}
			transform={"translateX(-50%)"}
		>
			<Flex
				gap={4}
				flexDirection={{ base: "column", md: "row" }}
				maxW={{
					sm: "400px",
					md: "full",
				}}
				mx={"auto"}
			>
				<Flex flex={30} gap={2} flexDirection={"column"} maxW={{ sm: "250px", md: "full" }} mx={"auto"}>
					
					<form onSubmit={handleConversationSearch}>
						<Flex alignItems={"center"} gap={2}>
							<Input placeholder='Search for a user' onChange={(e) => setSearchText(e.target.value)} />
							<Button size={"sm"} onClick={handleConversationSearch} isLoading={searchingUser}>
								<SearchIcon />
							</Button>
						</Flex>
					</form>

					{loading &&
						[0, 1, 2, 3, 4].map((_, i) => (
							<Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
								<Box>
									<SkeletonCircle size={"10"} />
								</Box>
								<Flex w={"full"} flexDirection={"column"} gap={3}>
									<Skeleton h={"10px"} w={"80px"} />
									<Skeleton h={"8px"} w={"90%"} />
								</Flex>
							</Flex>
						))}

					{!loading &&
						searchedUser?.map((user) => (
							<SearchProfile
								key={user._id}
								user={user}
							/>
						))}
				</Flex>
			</Flex>
		</Box>
	);
};

export default SearchPage;