import {
	Avatar,
	AvatarBadge,
	Box,
	Flex,
	Image,
	Stack,
	Text,
	WrapItem,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const SearchProfile = ({ user}) => {
	const colorMode = useColorMode();
    const navigate=useNavigate();
	return (
		<Flex
			gap={4}
			alignItems={"center"}
			p={"1"}
			_hover={{
				cursor: "pointer",
				bg: useColorModeValue("gray.600", "gray.dark"),
				color: "white",
			}}
			onClick={() =>
				navigate(`/${user.username}`)
			}
			bg={
				colorMode === "light" ? "gray.400" : "gray.dark"
			}
			borderRadius={"md"}
		>
			<WrapItem>
				<Avatar
					size={{
						base: "xs",
						sm: "sm",
						md: "md",
					}}
					src={user.profilePic}
				>
					
				</Avatar>
			</WrapItem>
            <Stack direction={"column"} fontSize={"sm"}>
				<Text fontWeight='700' display={"flex"} alignItems={"center"}>
					{user.username} <Image src='/verified.png' w={4} h={4} ml={1} />
				</Text>
			</Stack>

			
		</Flex>
	);
};

export default SearchProfile;