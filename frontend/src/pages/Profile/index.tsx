import { Link, useParams } from "react-router-dom";
import "./Profile.css";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { getUserDetails } from "../../slices/userSlice";
import React, { useEffect, useRef, useState } from "react";
import { upload } from "../../utils/config";
import {
  deletePhoto,
  getUserPhotos,
  publishPhoto,
  resetMessage,
  updatePhoto,
} from "../../slices/photoSlice";
import SubmitBtn from "../../components/SubmitBtn";
import Message from "../../components/Message";
import type { PhotoType } from "../../Types/apiTypes";

export default function Profile() {
  const { id } = useParams() as { id: string };
  const dispatch: AppDispatch = useDispatch();

  const { user, loading } = useSelector((state: RootState) => state.user);
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state: RootState) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState("");

  // New form and edit form refs
  const newPhotoForm = useRef<HTMLDivElement>(null);
  const editPhotoForm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0] as File | null;

    setImage(image);
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    Object.keys(photoData).forEach((key) =>
      formData.append(
        key,
        photoData[key as keyof typeof photoData] as string | Blob,
      ),
    );

    dispatch(publishPhoto(formData));
    setTitle("");
    resetComponentMessage();
  };

  const handleDelete = (photoId: string) => {
    dispatch(deletePhoto(photoId));
    resetComponentMessage();
  };

  const toggleforms = () => {
    newPhotoForm.current?.classList.toggle("hide");
    editPhotoForm.current?.classList.toggle("hide");
  };

  const handleUpdate = (e: React.SubmitEvent) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));

    resetComponentMessage();
    toggleforms();
  };

  const handleEdit = (photo: PhotoType) => {
    if (editPhotoForm.current?.classList.contains("hide")) {
      toggleforms();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleforms();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${upload}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === authUser._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título para a foto:</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              <SubmitBtn
                loading={loadingPhoto}
                error={errorPhoto}
                value="Postar"
              />
            </form>
          </div>
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={`${upload}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input type="submit" value="Atualizar" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancelar edição
              </button>
            </form>
          </div>
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${upload}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === authUser._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
        </div>
      </div>
    </div>
  );
}
