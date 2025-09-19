import bannerImg from "../../assets/banner.png";
import "./home.css";

function Home() {
  return (
    <div className="homeContainer">
      <img src={bannerImg} alt="Banner Home" />
      <div className="homeTextContainer">
        <h1>Bem-vindo à Vitrine</h1>
        <p>Clique em Ofertas no menu para ver os produtos!</p>
      </div>
    </div>
  );
}

export default Home;
