import "./App.css";
import Calculator from "./components/Calculator";
import { Helmet } from "react-helmet";

export default function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Basic Calculator</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Calculator />;
    </>
  );
}
