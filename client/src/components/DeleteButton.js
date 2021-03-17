import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Icon } from "semantic-ui-react";

import { DELETE_POST_MUTATION } from "../util/graphql";

const DeleteButton = (props) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId: props.postId },
  });

  return (
    <Button
      as="div"
      onClick={deletePost}
      color="red"
      style={{ float: "right" }}
    >
      <Icon name="trash" style={{ margin: 0 }} />
    </Button>
  );
};

export default DeleteButton;
