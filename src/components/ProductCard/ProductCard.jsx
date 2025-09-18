import "./ProductCard.css";

function ProductCard({ image, title, price }) {
  return (
    <div className="productCard">
      <img src={image} alt={title} className="product-image" />
      <h2 className="product-title">{title}</h2>
      <p className="product-price">R$ {price?.toFixed(2)}</p>
      <button className="buy-button">Comprar</button>
    </div>
  );
}

export default ProductCard;
