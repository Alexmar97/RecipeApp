import RecipeItem from "./RecipeItem";
import Card from "../UI/Card";
import { useEffect, useCallback } from "react";
import styles from "./AvailableRecipes.module.css";
import useHttp from "../Hooks/useHttp";

const AvailableRecipes = ({ recipes, setRecipes }) => {
  const transformData = useCallback(
    (responseData) => {
      const loadedRecipes = [];

      for (const key in responseData) {
        loadedRecipes.push({
          id: key,
          name: responseData[key].name,
          image: responseData[key].image,
          ingredients: responseData[key].ingredients,
          instructions: responseData[key].instructions,
        });
      }

      setRecipes(loadedRecipes);
    },
    [setRecipes]
  );

  const { error, sendRequest } = useHttp();

  const fetchRecipes = useCallback(() => {
    sendRequest(
      {
        url: "https://recipeapp-c064a-default-rtdb.firebaseio.com/recipes.json",
      },
      transformData
    );
  }, [sendRequest, transformData]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const newRecipesList = recipes.map((recipe) => (
    <Card key={recipe.id}>
      <RecipeItem
        name={recipe.name}
        image={recipe.image}
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
      ></RecipeItem>
    </Card>
  ));

  return (
    <section className={styles["recipes-section"]}>
      {error && <p>{error}</p>}
      <div className={styles["recipes-grid"]}>{newRecipesList}</div>
    </section>
  );
};

export default AvailableRecipes;
