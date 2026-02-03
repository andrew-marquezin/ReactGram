import { useDispatch, useSelector } from "react-redux";
import "./EditProfile.css";
import type { AppDispatch, RootState } from "../../store";
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";
import { useEffect, useState } from "react";
import { upload } from "../../utils/config";
import SubmitBtn from "../../components/SubmitBtn";
import Message from "../../components/Message";
import type { UserType } from "../../Types/apiTypes";

export default function EditProfile() {
  const dispatch: AppDispatch = useDispatch();

  const { user, message, error, loading } = useSelector(
    (state: RootState) => state.user,
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  // load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio ?? "");
    }
  }, [user]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const userData: Partial<UserType> = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    const formData = new FormData();

    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key as keyof UserType] as string | Blob);
    });

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0] as File | null;

    setPreviewImage(image ? URL.createObjectURL(image) : "");
    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage ? previewImage : `${upload}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="email" placeholder="E-mail" disabled value={email ?? ""} />
        <label>
          <span>Imagem do Perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            value={bio ?? ""}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <SubmitBtn loading={loading} error={error} value="Atualizar" />
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
}
