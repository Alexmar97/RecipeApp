import { useState, useCallback } from "react";
import "./App.css";
import AvailableRecipes from "./Recipes/AvailableRecipes";
import Modal from "./UI/Modal";
import AddRecipeForm from "./Recipes/AddRecipeForm";

function App() {
  const [addRecipeIsShown, setAddRecipeIsShown] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const addRecipeHandler = () => {
    setAddRecipeIsShown(true);
  };

  const closeAddRecipeHandler = () => {
    setAddRecipeIsShown(false);
  };

  const addNewRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  return (
    <>
      <button onClick={addRecipeHandler}>Add Recipe</button>
      {addRecipeIsShown && (
        <Modal onClose={closeAddRecipeHandler}>
          <AddRecipeForm
            onClose={closeAddRecipeHandler}
            onAddRecipe={addNewRecipe}
          />
        </Modal>
      )}
      <AvailableRecipes recipes={recipes} setRecipes={setRecipes} />
    </>
  );
}

export default App;
