import { useState } from "react";
import CommentCard from "./CommentCard";

/**
 * Name: CommentContainer
 * Funtion: Displays container of each comment with all the replies
 * @param {object} props {data, comment, deleting}
 * @returns {object} Container of comment and replies
 */

function CommentContainer({ data, comment, deleting }) {
  const [dataReload, setDataReload] = useState(0);

  //Force card and reply reload
  const reloadCommentCard = () => {
    setDataReload(dataReload + 1);
  }

  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <CommentCard data={data} comment={comment} isReply={null} reload={reloadCommentCard} deleting={deleting} />
      {comment.replies.length !== 0 && (
        <div className="flex flex-col gap-4 md:gap-6 pl-4 ml-4 md:pl-6 md:ml-8 lg:ml-10 lg:pl-10  border-l-2 border-accGray3">
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
