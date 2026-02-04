import { Link } from "react-router-dom";
import type { PhotoType } from "../../Types/apiTypes";
import { upload } from "../../utils/config";
import "./PhotoItem.css";

export default function PhotoItem({ photo }: { photo: PhotoType }) {
  return (
    <div className="photo-item">
      {photo.image && (
        <img src={`${upload}/photos/${photo.image}`} alt={photo.title} />
      )}
      <h2>{photo.title}</h2>
      <p className="photo-author">
        Publicada por:
        <Link to={`/users/${photo.userId}`}> {photo.userName}</Link>
      </p>
    </div>
  );
}
