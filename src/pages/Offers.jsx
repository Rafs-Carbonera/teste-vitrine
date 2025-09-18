import { useEffect, useState } from "react";
import "../css/index.css";
import ProductCard from "../components/ProductCard/ProductCard";

function Offers() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePrice, setActivePrice] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setProducts(data);
        const uniqueCategories = [
          "all",
          ...new Set(data.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  const filterProducts = (category, priceRange) => {
    let filtered = [...allProducts];

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (priceRange !== "all") {
      if (priceRange === "low") {
        filtered = filtered.filter((p) => p.price < 50);
      } else if (priceRange === "mid") {
        filtered = filtered.filter((p) => p.price >= 50 && p.price <= 100);
      } else if (priceRange === "high") {
        filtered = filtered.filter((p) => p.price > 100);
      }
    }

    setProducts(filtered);
    setVisibleCount(6);
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    filterProducts(cat, activePrice);
  };

  const handlePrice = (range) => {
    setActivePrice(range);
    filterProducts(activeCategory, range);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div>
      <header className="banner">
        <img
          src="./assets/banner.png"
          alt="Banner de Ofertas"
          className="banner-image"
        />
      </header>

      <main className="main-container">
        <h1 className="title">Ofertas da Semana</h1>
        <div className="showcase">
          <div className="filtersContainer">
            <div className="filters">
              <h3>Categorias</h3>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={activeCategory === cat ? "active" : ""}
                >
                  {cat === "all" ? "Todos" : cat}
                </button>
              ))}
            </div>

            <div className="filters">
              <h3>Preço</h3>
              <button
                onClick={() => handlePrice("all")}
                className={activePrice === "all" ? "active" : ""}
              >
                Todos
              </button>
              <button
                onClick={() => handlePrice("low")}
                className={activePrice === "low" ? "active" : ""}
              >
                Até R$50
              </button>
              <button
                onClick={() => handlePrice("mid")}
                className={activePrice === "mid" ? "active" : ""}
              >
                R$50 - R$100
              </button>
              <button
                onClick={() => handlePrice("high")}
                className={activePrice === "high" ? "active" : ""}
              >
                Acima de R$100
              </button>
            </div>
          </div>
          <section className="searchResults">
            <div className="productsContainer">
              {products.length > 0 ? (
                products
                  ?.slice(0, visibleCount)
                  ?.map((product) => (
                    <ProductCard
                      key={product?.id}
                      image={product?.image}
                      title={product?.title}
                      price={product?.price}
                    />
                  ))
              ) : (
                <p>Nenhum produto encontrado.</p>
              )}
            </div>

            {visibleCount < products.length && (
              <div className="load-more-container">
                <button className="load-more" onClick={loadMore}>
                  Carregar mais
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offers;
