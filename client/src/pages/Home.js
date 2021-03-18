import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import {
  Grid,
  Transition,
  Container,
  Header,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="big">Cargando...</Loader>
      </Dimmer>
    );

  return (
    <Grid columns={3}>
      <Grid.Row>
        <Container textAlign="center">
          <Header size="huge">Mis Posts</Header>
        </Container>
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
