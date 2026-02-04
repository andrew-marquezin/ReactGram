import { Link, useParams } from "react-router-dom";
import "./Photo.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { getPhoto, like, comment } from "../../slices/photoSlice";
import { useEffect, useState } from "react";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import Message from "../../components/Message";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { upload } from "../../utils/config";

export default function Photo() {
  const { id } = useParams() as { id: string };

  const dispatch: AppDispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state: RootState) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state: RootState) => state.photo,
  );

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  const handleComment = (e: React.SubmitEvent) => {
    e.preventDefault();

    dispatch(comment({ text: commentText, id: photo._id }));

    setCommentText("");

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários: ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira seu comentário..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários ainda.</p>}
            {photo.comments.map((comment, i) => (
              <div className="comment" key={i}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${upload}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
