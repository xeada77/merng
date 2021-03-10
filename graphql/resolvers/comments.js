const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);

      if (body === "") {
        throw new UserInputError("El cuerpo del comentario está vacio", {
          errors: {
            body: "El cuerpo del comentario no puede estar vacio.",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();
        return post;
      } else throw new UserInputError("El post al que se refiere no existe");
    },
  },
  deleteComment: (_, { postId, commentId }, context) => {},
};
