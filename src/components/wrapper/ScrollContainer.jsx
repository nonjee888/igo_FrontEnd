import "./style.scss";

export default function ScrollContainer({ children }) {
  return (
    <>
      <div className="scroll-wrapper">{children}</div>
    </>
  );
}
