import styles from "./RecipeItem.module.css";

const RecipeItem = (props) => {
  return (
    <ul>
      <div>
        <h3>{props.name}</h3>
        <div>
          <div>
            <img src={props.image} alt={props.name}></img>
          </div>
          <h4>Ingredients:</h4>
          <p className={styles.recipeInstructions}>{props.ingredients}</p>
        </div>
        <div>
          <h4>Instructions</h4>
          <p className={styles.recipeInstructions}>{props.instructions}</p>
        </div>
      </div>
    </ul>
  );
};

export default RecipeItem;
