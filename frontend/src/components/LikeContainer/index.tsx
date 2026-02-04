import type { PhotoType, UserType } from "../../Types/apiTypes";
import "./LikeContainer.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function LikeContainer({
  photo,
  user,
  handleLike,
}: {
  photo: PhotoType;
  user: UserType;
  handleLike: () => void;
}) {
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike()} />
          )}
          <p>{photo.likes.length} like(s)</p>
        </>
      )}
    </div>
  );
}
