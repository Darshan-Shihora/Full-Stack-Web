import axios from "axios";
import { useRef, useState } from "react";

const Comment = ({ comment, commentId, isEditing, onDoubleClick }) => {
  const [editedComment, setEditedComment] = useState(comment);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      console.log(commentId);
      const response = await axios({
        method: "PATCH",
        url: `http://localhost:3001/comment/${commentId}`,
        data: {
          comment: editedComment,
        },
      });
      console.log(response.data);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  return (
    <li onDoubleClick={onDoubleClick}>
      {isEditing ? (
        <input
          type="text"
          name="comment"
          id="comment"
          value={editedComment}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          ref={inputRef}
          autoFocus
        />
      ) : (
        comment
      )}
    </li>
  );
};

export default Comment;
