import "./ProductCard.css";

function ProductCard({ image, title, price }) {
  return (
    <div className="productCard">
      <img src={image} alt={title} className="productImage" />
      <div className="productCardMainInfo">
        <h2 className="productTitle">{title}</h2>
        <p className="productPrice">R$ {price?.toFixed(2)}</p>
        <button className="buyButton">Comprar</button>
      </div>
    </div>
  );
}

export default ProductCard;
