import { useState } from "react";
import CommentCard from "./CommentCard";

function CommentContainer({ data, comment, deleting }) {
  const [dataReload, setDataReload] = useState(0);

  const reloadCommentCard = () => {
    setDataReload(dataReload + 1);
  }

  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <CommentCard data={data} comment={comment} isReply={null} reload={reloadCommentCard} deleting={deleting} />
      {comment.replies.length !== 0 && (
        <div className="flex flex-col gap-4 md:gap-6 pl-4 md:ml-4 lg:ml-6 lg:pl-6  border-l-2 border-accGray3">
          {comment.replies.map((reply) => (
            <CommentCard
              data={data}
              comment={reply}
              isReply={comment}
              key={reply.id}
              reload={reloadCommentCard}
              deleting={deleting}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CommentContainer;
