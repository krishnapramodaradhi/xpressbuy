import styles from './Card.module.css';

const Card = ({ product }) => {
  return (
    <div className={styles.card}>
      <div>
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default Card;
