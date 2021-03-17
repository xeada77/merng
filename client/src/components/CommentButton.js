import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CommentButton = ({ post: { commentCount, id, comments } }) => {
  return (
    <Button as="div" labelPosition="right">
      <Button basic color="blue" as={Link} to={`/posts/${id}`}>
        <Icon name="comments" />
      </Button>
      <Label basic color="blue" pointing="left">
        {commentCount}
      </Label>
    </Button>
  );
};

export default CommentButton;
