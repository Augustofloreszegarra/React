import styles from './Home.module.css';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import products from "../assets/products";



function Home() {
  return (
    <>
      <NavBar />
      <Hero firstText={"tecnología"} secondText={"renovada"} />
      <main>
        <div className={styles["product-container"]} id="products">
        {products.map((each) => (
            <ProductCard
              key={each.id}
              id={each.id}
              title={each.title}
              price={each.price}
              color={each.colors[0]}
              image={each.images[0]}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
