const PostBody = ({ post }: { post: string }) => {
  return (
    <div className="my-4 px-2">
      <p className="mb-4 leading-relaxed">
        {post?.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
};

export default PostBody;
