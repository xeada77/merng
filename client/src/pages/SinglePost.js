import React from "react";
import { useQuery } from "@apollo/client";

import { FETCH_POST_QUERY } from "../util/graphql";
import { Card, Grid, Image } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";

const SinglePost = (props) => {
  const postId = props.match.params.postId;

  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId: postId },
  });

  let postMarkup;

  if (loading) {
    postMarkup = <h1>Loading....</h1>;
  } else if (error) {
    postMarkup = <h2>Error...</h2>;
  } else {
    const {
      getPost: {
        id,
        username,
        body,
        createdAt,
        commentCount,
        likeCount,
        likes,
        comments,
      },
    } = data;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              circular
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
                <hr />
              </Card.Content>
              <Card.Content extra>
                <LikeButton post={{ id, likeCount, likes }} />
                <CommentButton post={{ id, commentCount, comments }} />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

export default SinglePost;
