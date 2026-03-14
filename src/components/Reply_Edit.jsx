/**
 * Name: Reply_Edit
 * Funtion: Displays reply or delete and edit buttons within each card
 * @param {object} props {comment, current, functions}
 * @returns {object} button(s)
 */


function Reply_Edit({comment, current, functions}) {
  return (
    <>
      {comment.user.username !== current ? (
        <button
          onClick={functions.reply}
          type="button"
          className="group absolute bottom-6 md:bottom-auto md:top-5 right-5 flex items-center justify-end w-16 font-medium text-accPurp1 hover:text-accPurp2 hover:cursor-pointer"
        >
          <img
            src="/images/icon-reply.svg"
            alt="Reply Icon"
            className="absolute left-0 opacity-100 group-hover:opacity-0"
          />
          <img
            src="/images/icon-reply-light.svg"
            alt="Reply Icon"
            className="absolute left-0 opacity-0 group-hover:opacity-100"
          />
          <p>Reply</p>
        </button>
      ) : (
        <div className="absolute bottom-6 right-5 md:bottom-auto md:top-5 flex gap-2 items-center">
          <button
            onClick={() => functions.delete(comment.id)}
            type="button"
            className="group relative flex items-center justify-end w-17 font-medium text-accPink1 hover:text-accPink2 hover:cursor-pointer"
          >
            <img
              src="/images/icon-delete.svg"
              alt="Reply Icon"
              className="absolute left-0 opacity-100 group-hover:opacity-0"
            />
            <img
              src="/images/icon-delete-light.svg"
              alt="Reply Icon"
              className="absolute left-0 opacity-0 group-hover:opacity-100"
            />
            <p>Delete</p>
          </button>
          <button
          onClick={functions.edit}
            type="button"
            className="group relative flex items-center justify-end w-12 font-medium text-accPurp1 hover:text-accPurp2 hover:cursor-pointer"
          >
            <img
              src="/images/icon-edit.svg"
              alt="Reply Icon"
              className="absolute left-0 opacity-100 group-hover:opacity-0"
            />
            <img
              src="/images/icon-edit-light.svg"
              alt="Reply Icon"
              className="absolute left-0 opacity-0 group-hover:opacity-100"
            />
            <p>Edit</p>
          </button>
        </div>
      )}
    </>
  );
}

export default Reply_Edit;
