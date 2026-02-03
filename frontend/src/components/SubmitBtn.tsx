import Message from "./Message";

type SubmitBtnProps = {
  loading: boolean;
  error: string | null;
  value: string;
};

export default function SubmitBtn({ loading, error, value }: SubmitBtnProps) {
  return (
    <>
      {loading ? (
        <input type="submit" disabled value="Aguarde..." />
      ) : (
        <input type="submit" value={value} />
      )}
      {error && <Message msg={error} type="error" />}
    </>
  );
}
