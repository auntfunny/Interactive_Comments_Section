import { useState } from "react";
import CommentContainer from "./components/CommentContainer";
import NewComment from "./components/NewComment";
import data from "./data/data.json";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

function App() {
  const [allCommentReload, setAllCommentReload] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [activeDelete, setActiveDelete] = useState({});

  const localData = localStorage.getItem("myComments");
  let localComments = { ...data };
  if (localData) {
    localComments = JSON.parse(localData);
    console.log(`Recieved Item: ${localComments}`);
  } else {
    console.log("No Local Data");
  }
  localComments.comments.sort((a, b) => b.score - a.score);

  const confirmDelete = (id) => {
    setDeleting(!deleting);
    if (id) {
      setActiveDelete((a) => (a = id));
    }
  };
  const reloadCardList = () => {
    setAllCommentReload(allCommentReload + 1);
  };

  const deleteComment = () => {
    let found = localComments.comments.find(comment => comment.id === activeDelete)
    if(found){
      localComments.comments = localComments.comments.filter(comment => comment.id !== activeDelete);
      localStorage.setItem("myComments", JSON.stringify(localComments));
      confirmDelete(0);
    } else {
      let i;
      for(i = 0; i < localComments.comments.length && !found;){
        found = localComments.comments[i].replies.find(comment => comment.id === activeDelete);
        if(!found){
          i++;
        }
      }
      localComments.comments[i].replies = localComments.comments[i].replies.filter(comment => comment.id !== activeDelete);
      localStorage.setItem("myComments", JSON.stringify(localComments));
      confirmDelete(0);
    }
    
    console.log(activeDelete);
  };


  return (
    <div>
      {deleting && (
        <ConfirmDeleteModal deleting={confirmDelete} deleted={deleteComment} />
      )}
      <main className="flex justify-center items-center min-h-screen bg-accGray4 font-rubik">
        <div className="flex flex-col py-10 gap-4 md:gap-6 w-88 md:w-2xl lg:w-3xl">
          {localComments.comments.map((comment) => (
            <CommentContainer
              data={localComments}
              comment={comment}
              key={comment.id}
              deleting={confirmDelete}
            />
          ))}
          <NewComment
            data={localComments}
            replyTo={null}
            reload={reloadCardList}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
