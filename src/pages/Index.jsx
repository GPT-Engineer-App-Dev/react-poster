import { useState, useEffect } from "react";
import { Container, VStack, Text, Box, Input, Button, HStack, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaLaugh, FaSadTear } from "react-icons/fa";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*');
    setPosts(data);
  };

  const addPost = async () => {
    if (newPost.trim() !== "") {
      const { data } = await supabase.from('posts').insert([{ title: newPost, body: newPost }]);
      setPosts([...posts, ...data]);
      setNewPost("");
    }
  };

  const addReaction = async (postId, reaction) => {
    const { data } = await supabase
      .from('reactions')
      .insert([{ post_id: postId, emoji: reaction }]);
    fetchPosts();
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
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth="1px" borderRadius="md" w="100%">
              <Text>{post.body}</Text>
              <HStack spacing={2} mt={2}>
                <IconButton
                  aria-label="Like"
                  icon={<FaThumbsUp />}
                  onClick={() => addReaction(post.id, "👍")}
                />
                <Text>{post.reactions?.filter(r => r.emoji === "👍").length || 0}</Text>
                <IconButton
                  aria-label="Dislike"
                  icon={<FaThumbsDown />}
                  onClick={() => addReaction(post.id, "👎")}
                />
                <Text>{post.reactions?.filter(r => r.emoji === "👎").length || 0}</Text>
                <IconButton
                  aria-label="Laugh"
                  icon={<FaLaugh />}
                  onClick={() => addReaction(post.id, "😂")}
                />
                <Text>{post.reactions?.filter(r => r.emoji === "😂").length || 0}</Text>
                <IconButton
                  aria-label="Sad"
                  icon={<FaSadTear />}
                  onClick={() => addReaction(post.id, "😢")}
                />
                <Text>{post.reactions?.filter(r => r.emoji === "😢").length || 0}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;