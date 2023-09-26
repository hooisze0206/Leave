import Header from "./layout/Header";
import "./Home.css";
function ErrorPage() {
  return (
    <>
      <Header />
      <main className="content">
        <h1>An error occured!</h1>
        <p>This page is not Found.</p>
      </main>
    </>
  );
}

export default ErrorPage;
