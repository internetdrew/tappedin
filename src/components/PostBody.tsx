const PostBody = ({ linkedInPost }: { linkedInPost: string }) => {
  return (
    <div className="my-4 px-2">
      <p className="mb-4 leading-relaxed">
        {linkedInPost?.split("\n").map((line, index) => (
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
