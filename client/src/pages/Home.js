import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import PostCard from "../components/PostCard";
import { Grid } from "semantic-ui-react";

const Home = () => {
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(FETCH_POST_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id}>
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
