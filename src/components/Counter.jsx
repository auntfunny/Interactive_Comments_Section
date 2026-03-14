import { useEffect, useState } from "react";

/**
 * Name: Counter
 * Funtion: Displays score counter within each card
 * @param {object} props {data, comment}
 * @returns {object} Score counter
 */


function Counter({ comment, data }) {
  const [count, setCount] = useState(comment.score);
  const [up, setUp] = useState(comment.upVote || false);
  const [down, setDown] = useState(comment.downVote || false);

  //Tracks up vote and allows one per card
  const upVote = () => {
    if (!up && !down) {
      setCount(count + 1);
      setUp(true);
      comment.upVote = true;
    } else if (up) {
      setCount(count - 1);
      setUp(false);
      comment.upVote = false;
    } else if (down) {
      setCount(count + 2);
      setUp(true);
      setDown(false);
      comment.upVote = true;
      comment.downVote = false;
    }
  };

  //Tracks down vote and allows one per card
  const downVote = () => {
    if (!up && !down && count > 0) {
      setCount(count - 1);
      setDown(true);
      comment.downVote = true;
    } else if (down) {
      setCount(count + 1);
      setDown(false);
      comment.downVote = false;
    } else if (up && count > 1) {
      setCount(count - 2);
      setDown(true);
      setUp(false);
      comment.downVote = true;
      comment.upVote = false;
    }
  };

  //Saves up or down vote data every time it is changed
  useEffect(() => {
    comment.score = count;
    localStorage.setItem("myComments", JSON.stringify(data));
  }, [upVote, downVote]);

  return (
    <div className="flex md:flex-col items-center justify-between w-28 md:w-10 md:mx-3 md:h-24 px-4  py-2 bg-accGray4 rounded-xl text-accPurp2">
      <div
        onClick={upVote}
        className={
          up
            ? "text-accPurp1 hover:text-accPurp1 hover:cursor-pointer"
            : "hover:text-accPurp1 hover:cursor-pointer"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="4"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <p className="font-medium text-accPurp1">{count}</p>
      <div
        onClick={downVote}
        className={
          down
            ? "text-accPurp1 hover:text-accPurp1 hover:cursor-pointer"
            : "hover:text-accPurp1 hover:cursor-pointer"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="4"
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </div>
    </div>
  );
}

export default Counter;
