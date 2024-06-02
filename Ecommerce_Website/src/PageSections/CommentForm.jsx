import React, { useState } from "react";
import { FaStar, FaRegStar} from "react-icons/fa";
import { addReviews } from "../api/reviews";

const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    onRatingChange(index);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className="cursor-pointer "
            onMouseOver={() => handleMouseOver(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          >
            {starValue <= (hoverRating || rating) ? <FaStar className="text-yellow-500 flex" /> : <FaRegStar className="text-yellow-500" />}
          </span>
        );
      })}
    </div>
  );
};

const CommentForm = ({productId,reloadCmt}) => {
   
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async() => {
    const review1={review : comment, rating}
    const {type,message,newReview} = await addReviews(productId,review1)
    if(type === "Error"){
        console.log(message);
        return;
    } 
  

    reloadCmt(newReview);
    setRating(0);
    setComment('')
  };

  return (
    <div className="mt-4">
   
      <div className="flex items-center mb-2">
        {/* <label className="mr-2">Rating:</label> */}
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
      </div>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        className="w-full font-sans h-24 border-gray-300 border rounded-md p-2 focus:outline-none focus:border-yellow-500"
        placeholder="Viết bình luận ..."
      />
      <button
        onClick={handleCommentSubmit}
        className="bg-yellow-400 font-sans text-white px-4 py-2 rounded-md mt-2 hover:bg-yellow-600 focus:outline-none"
      >
        Bình luận
      </button>
    </div>
  );
};

export default CommentForm;
