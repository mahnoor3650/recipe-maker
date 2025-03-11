import { useState } from "react";
import { getRecipeFromMistral } from "../ai";
import ReactMarkdown from "react-markdown";
export default function Main() {
  const [ingredients, setIngres] = useState([]);
  const [recipes, setRecipe] = useState("");

  const ingredientsListItems = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  function addIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const ingre = formData.get("ingredient");
    console.log(ingre);
    setIngres((pre) => [...pre, ingre]);
    event.target.reset();
  }
  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }
  return (
    <main>
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients && ingredients.length > 0 && (
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">
            {ingredientsListItems}
          </ul>
          {ingredients.length > 3 && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button onClick={getRecipe}>Get a recipe</button>
            </div>
          )}
        </section>
      )}
      {recipes && (
        <section>
          <h2>Chef Claude Recommends:</h2>
          <article className="suggested-recipe-container" aria-live="polite">
           <ReactMarkdown children={recipes} />
          </article>
        </section>
      )}
    </main>
  );
}
