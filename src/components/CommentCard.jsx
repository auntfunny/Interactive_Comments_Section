import { useState, useEffect } from "react";
import Counter from "./Counter";
import NewComment from "./NewComment";
import Reply_Edit from "./Reply_Edit";
import EditBox from "./EditBox";


/**
 * Name: CommentCard
 * Funtion: Displays each individual comment in a card
 * @param {object} props {data, comment, isReply, reload, deleting}
 * @returns {object} indiviual comment
 */

function CommentCard({ data, comment, isReply, reload, deleting }) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("");

  //Opens and closes reply box
  const toggleReply = () => {
    setReplying(!replying);
  };

  //Opens and closes edit area
  const toggleEdit = () => {
    setEditing(!editing);
  };

  //Finds elapsed time since comment was created
  useEffect(() => {
    if (comment.hasDate) {
    const current = Date.now();
    setElapsedTime(elapsedTime => elapsedTime = findTimeDifference(current - comment.createdAt));
  }
  }, [toggleEdit]);
  

  return (
    <div className="flex flex-col gap-2">
      <div className=" relative flex flex-col md:flex-row-reverse md:justify-end gap-2 bg-white w-full min-h-20 p-4 rounded-2xl">
        <div className="w-full">
          <div className="flex gap-4 items-center pb-4">
            <img
              src={comment.user.image.png}
              alt={comment.user.username}
              className="w-8"
            />
            <p className="flex items-center gap-1 text-accGray1 font-medium">
              <span>{comment.user.username}</span>{" "}
              {comment.user.username === data.currentUser.username && (
                <span className="bg-accPurp1 text-white px-1.5 pb-0.5 align-middle text-sm rounded">
                  you
                </span>
              )}
            </p>
            <p className="text-accGray2">
              {comment.hasDate ? elapsedTime ? `${elapsedTime} ago` : "Now" : comment.createdAt}
            </p>
          </div>
          {editing ? (
            <EditBox comment={comment} data={data} edit={toggleEdit} reload={reloadCard} />
          ) : (
            <p className="text-accGray2">
              {comment.replyingTo && (
                <span className="text-accPurp1">@{comment.replyingTo} </span>
              )}
              {comment.content}
            </p>
          )}
        </div>
        <Counter comment={comment} data={data} />
        <Reply_Edit
          comment={comment}
          current={data.currentUser.username}
          functions={{ reply: toggleReply, delete: deleting, edit: toggleEdit }}
        />
      </div>
      {replying && (
        <NewComment
          data={data}
          replyTo={isReply || comment}
          replyName={comment.user.username}
          toggleReply={toggleReply}
          reload={reload}
        />
      )}
    </div>
  );
}

export default CommentCard;

/**
 * Name: findTimeDifference
 * Funtion: converts elapsed milliseconds to other units
 * @param {number} diff elapsed time in milliseconds
 * @returns {string} number of greatest elapsed unit
 */

function findTimeDifference(diff) {
  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);
  let months = Math.floor(weeks / 4);
  let years = Math.floor(months / 12);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;
  days = days % 7;
  weeks = weeks % 4;
  months = months % 12;
  
  let elapsed;
  if(years){
    elapsed = `${years} ${years > 1 ? 'years' : 'year'}`;
  } else if(months){
    elapsed = `${months} ${months > 1 ? 'months' : 'month'}`;
  } else if(weeks){
    elapsed = `${weeks} ${weeks > 1 ? 'weeks' : 'week'}`;
  } else if(days){
    elapsed = `${days} ${days > 1 ? 'days' : 'day'}`;
  } else if(hours){
    elapsed = `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
  } else if(minutes){
    elapsed = `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;
  } else if(seconds){
    elapsed = `${seconds} ${seconds > 1 ? 'seconds' : 'second'}`;
  }
  return elapsed;
}
