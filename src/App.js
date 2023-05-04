import { memo, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setData(data.products);
    };
    fetchData();
  }, []);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pagination</h1>
        <ul>
          {data.length > 0 &&
            data.slice((page - 1) * 10, page * 10).map((product, i) => {
              return <Product product={product} key={i} />;
            })}
        </ul>
        <div>
          <button onClick={() => handlePageClick(page - 1)}>Previous</button>
          {[...Array(data.length / 10)].map((_, key) => {
            return (
              <button key={key} onClick={() => handlePageClick(key + 1)}>
                {key + 1}
              </button>
            );
          })}
          <button onClick={() => handlePageClick(page + 1)}>Next</button>
        </div>
      </header>
    </div>
  );
}

export const Product = memo((product) => {
  return (
    <li>
      {product.product.title} and his price is {product.product.price}
    </li>
  );
});
export default App;
