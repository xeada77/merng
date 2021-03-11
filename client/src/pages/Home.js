import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import PostCard from "../components/PostCard";
import { Grid, Container, Header } from "semantic-ui-react";

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POST_QUERY);

  //const { getPosts: posts } = data;
  return (
    <Grid columns={3}>
      <Grid.Row>
        <Container textAlign="center">
          <Header size="huge">Recent Posts</Header>
        </Container>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      createdAt
      commentCount
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export default Home;
