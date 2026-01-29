import Message from "./Message";

type SubmitBtnProps = {
  loading: boolean;
  error: string | null;
};

export default function SubmitBtn({ loading, error }: SubmitBtnProps) {
  return (
    <>
      {loading ? (
        <input type="submit" disabled value="Aguarde..." />
      ) : (
        <input type="submit" value="Entrar" />
      )}
      {error && <Message msg={error} type="error" />}
    </>
  );
}
