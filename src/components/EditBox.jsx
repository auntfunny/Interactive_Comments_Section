import { useRef, useEffect } from "react";

function EditBox({ comment, data, edit, reload }) {
  const updateComment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if(formData.get("editText")){
      comment.content = formData.get("editText");
      localStorage.setItem("myComments", JSON.stringify(data));
      edit();
      reload();
    } else {
      alert("Comment cannot be blank, please add a comment");
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(comment.content.length, comment.content.length);
    }
  }, []);

  return (
    <form onSubmit={updateComment} className="flex flex-col gap-2">
      <textarea
        ref={inputRef}
        name="editText"
        id="editText"
        defaultValue={comment.content}
        className="rounded-lg border border-accGray3 p-4 text-accGray2 resize-none h-32 w-full placeholder:text-accGray2 hover:border-accPurp1 focus:outline-none focus:border-accPurp1 caret-accPurp1"
      ></textarea>
      <button className="self-end w-24 p-3 bg-accPurp1 rounded-lg font-medium text-white shadow hover:bg-accPurp2">
        UPDATE
      </button>
    </form>
  );
}

export default EditBox;
