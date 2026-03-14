import { useEffect, useRef } from "react";

/**
 * Name: NewComment
 * Funtion: Shows new comment or reply box with text area and send button
 * @param {object} props {data, replyTo, replyName, toggleReply, reload}
 * @returns {object} New Comment Area
 */


function NewComment({ data, replyTo, replyName, toggleReply, reload }) {
  const inputRef = useRef(null);

  //Created a new comment object and appends it to data, then stores
  const createComment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if(formData.get("newComment")){
      const newComment = {
        id: ++data.commentTotal,
        content: formData.get("newComment"),
        hasDate: true,
        createdAt: Date.now(),
        score: 0,
        replyingTo: replyTo ? replyName : null,
        user: data.currentUser,
        replies: [],
      };
      event.target.reset();
      if (replyTo) {
        replyTo.replies.push(newComment);
      } else {
        data.comments.push(newComment);
      }
      console.log(data);
      toggleReply && toggleReply();
      localStorage.setItem("myComments", JSON.stringify(data));
      reload();
    } else {
      alert("Comment cannot be blank, please add a comment");
    }
  };

  //Sets autofocus when a reply box is opened, but not to the nem comment box on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const reference = replyTo ? inputRef : null;

  return (
    <form
      onSubmit={createComment}
      className="relative flex flex-col md:flex-row-reverse md:items-start md:justify-end gap-4 bg-white w-full min-h-20 p-4 rounded-2xl"
    >
      <textarea
        ref={reference}
        name="newComment"
        id="newComment"
        className=" rounded-lg border border-accGray3 p-4 text-accGray2 resize-none md:w-3/4 placeholder:text-accGray2 hover:border-accPurp1 focus:outline-none focus:border-accPurp1 caret-accPurp1"
        placeholder="Add a comment..."
      ></textarea>
      <img
        src={data.currentUser.image.png}
        alt={data.currentUser.username}
        className="w-8 mb-2"
      />
      <button className="absolute bottom-4 right-4 md:bottom-auto md:top-4 w-24 p-3 bg-accPurp1 rounded-lg font-medium text-white shadow hover:bg-accPurp2">
        {replyTo ? "REPLY" : "SEND"}
      </button>
    </form>
  );
}

export default NewComment;
