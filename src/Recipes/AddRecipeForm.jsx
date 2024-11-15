import { useState, useRef } from "react";
import styles from "./AddRecipeForm.module.css";
import useHttp from "../Hooks/useHttp";

const AddRecipeForm = (props) => {
  const [ingredients, setIngredients] = useState([""]);
  const [nameInputHasError, setNameInputHasError] = useState(false);
  const [ingredientsInputHasError, setIngredientsInputHasError] =
    useState(false);
  const [instructionsInputHasError, setInstructionsInputHasError] =
    useState(false);

  const nameInputRef = useRef();
  const instructionsInputRef = useRef();
  const imageLinkInputRef = useRef();

  const { error, sendRequest: postRecipes } = useHttp();

  const addingIngredientsHandler = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;

    setIngredients(newIngredients);

    if (index === ingredients.length - 1 && ingredients[index] !== "")
      setIngredients([...newIngredients, ""]);
  };

  const reset = () => {
    nameInputRef.current.value = "";
    instructionsInputRef.current.value = "";
    imageLinkInputRef.current.value = "";
    setIngredients([""]);
  };

  const formIsValidCheck = (enteredName, enteredInstructions, ingredients) => {
    let isValid = true;

    if (enteredName.trim().length === 0) {
      setNameInputHasError(true);
      isValid = false;
    } else {
      setNameInputHasError(false);
    }

    if (enteredInstructions.trim().length === 0) {
      setInstructionsInputHasError(true);
      isValid = false;
    } else {
      setInstructionsInputHasError(false);
    }

    if (ingredients.length === 0 || ingredients[0] === "") {
      setIngredientsInputHasError(true);
      isValid = false;
    } else {
      setIngredientsInputHasError(false);
    }

    return isValid;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredInstructions = instructionsInputRef.current.value;
    let enteredImageLink = imageLinkInputRef.current.value;

    // Check if form is valid
    if (!formIsValidCheck(enteredName, enteredInstructions, ingredients))
      return;

    if (enteredImageLink.trim().length === 0) {
      enteredImageLink =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnTvuIhKzvzza5o9N7wiAUzZiKHOrM5VKt6A&s";
    }

    const newRecipeData = {
      name: enteredName,
      image: enteredImageLink,
      ingredients: ingredients.filter((ingredient) => ingredient !== ""),
      instructions: enteredInstructions,
    };

    console.log("Submitting recipe:", newRecipeData); // Debugging log

    postRecipes(
      {
        url: "https://recipeapp-c064a-default-rtdb.firebaseio.com/recipes.json",
        method: "POST",
        headers: {},
        body: newRecipeData,
      },
      (responseData) => {
        console.log("Recipe submitted successfully!"); // Debugging log
        props.onAddRecipe({ id: responseData.name, ...newRecipeData });
        reset();
        props.onClose();
      }
    );
  };

  // const nameInputClass = nameInputHasError
  //   ? "form-control invalid"
  //   : "form-control";

  const nameInputClass = nameInputHasError ? "invalid" : "";
  const ingredientsInputClass = ingredientsInputHasError ? "invalid" : "";
  const instructionsInputClass = instructionsInputHasError ? "invalid" : "";

  return (
    <div>
      <form className={styles["form-control"]} onSubmit={submitHandler}>
        <div className={`${styles["form-group"]} ${nameInputClass}`}>
          <label>Name</label>
          <input type="text" ref={nameInputRef} className={nameInputClass} />
          {nameInputHasError && (
            <p className={styles["error-text"]}>
              What is the name of your recipe?
            </p>
          )}
        </div>

        <div>
          <label>Image Link </label>
          <div className={styles["optional-text"]}>(Optional)</div>
          <input type="text" ref={imageLinkInputRef}></input>
        </div>

        <div className={`${styles["form-group"]} ${instructionsInputClass}`}>
          <label>Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(event) => addingIngredientsHandler(event, index)}
            ></input>
          ))}
          {ingredientsInputHasError && (
            <p className={styles["error-text"]}>
              Ingredients list cannot be empty
            </p>
          )}
        </div>

        <div className={instructionsInputClass}>
          <label>Instructions</label>
          <input type="text" ref={instructionsInputRef}></input>
          {instructionsInputHasError && (
            <p className={styles["error-text"]}>Instructions cannot be empty</p>
          )}
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
