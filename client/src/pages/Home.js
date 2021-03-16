import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { Grid, Transition, Container, Header } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  //const posts = data ? data.getPosts : [];

  //const { getPosts: posts } = data;
  console.log(data);

  if (loading) return <h1>Loading Posts....</h1>;

  return (
    <Grid columns={3}>
      <Grid.Row>
        <Container textAlign="center">
          <Header size="huge">Recent Posts</Header>
        </Container>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}

        <Transition.Group>
          {data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
