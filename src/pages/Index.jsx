import { useState } from "react";
import { Container, VStack, Text, Box, Input, Button, HStack, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaLaugh, FaSadTear } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, { text: newPost, reactions: { like: 0, dislike: 0, laugh: 0, sad: 0 } }]);
      setNewPost("");
    }
  };

  const addReaction = (index, reaction) => {
    const updatedPosts = [...posts];
    updatedPosts[index].reactions[reaction]++;
    setPosts(updatedPosts);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} w="100%">
        <Text fontSize="2xl">Public Postboard</Text>
        <HStack w="100%">
          <Input
            placeholder="Write a new post..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button onClick={addPost} colorScheme="blue">Post</Button>
        </HStack>
        <VStack spacing={4} w="100%">
          {posts.map((post, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" w="100%">
              <Text>{post.text}</Text>
              <HStack spacing={2} mt={2}>
                <IconButton
                  aria-label="Like"
                  icon={<FaThumbsUp />}
                  onClick={() => addReaction(index, "like")}
                />
                <Text>{post.reactions.like}</Text>
                <IconButton
                  aria-label="Dislike"
                  icon={<FaThumbsDown />}
                  onClick={() => addReaction(index, "dislike")}
                />
                <Text>{post.reactions.dislike}</Text>
                <IconButton
                  aria-label="Laugh"
                  icon={<FaLaugh />}
                  onClick={() => addReaction(index, "laugh")}
                />
                <Text>{post.reactions.laugh}</Text>
                <IconButton
                  aria-label="Sad"
                  icon={<FaSadTear />}
                  onClick={() => addReaction(index, "sad")}
                />
                <Text>{post.reactions.sad}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;