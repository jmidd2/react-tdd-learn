import React, { FormEvent, useState } from 'react';
import './App.css';

type Recipe = {
  name: string;
  instructions: string;
};

function App() {
  const [recipeFormShown, setRecipeFormShown] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const submitRecipe = (event: FormEvent) => {
    event.preventDefault();
    // @ts-ignore
    let newRecipeName: string = document.getElementById(`newRecipeName`)?.value;
    let newRecipeInstructions: string = document.getElementById(
      `newRecipeInstructions`
      // @ts-ignore
    )?.value;

    setRecipes([
      {
        name: newRecipeName,
        instructions: newRecipeInstructions,
      },
    ]);
  };

  return (
    <div className='App'>
      <h1 className='App-header'>
        My Recipes<span>Another</span>
      </h1>
      {recipes.length > 0 ? (
        <>
          {recipes.map(recipe => (
            <p key={recipe.name}>{recipe.name}</p>
          ))}
        </>
      ) : (
        <p>There are no recipes to list.</p>
      )}
      {recipeFormShown ? (
        <>
          <form
            id='recipe-form'
            name='recipe-form'
            onSubmit={submitRecipe}
          >
            <label htmlFor='newRecipeName'>Recipe name: </label>
            <input
              type='text'
              id='newRecipeName'
            />
            <label htmlFor={`newRecipeInstructions`}>Instructions: </label>
            <textarea
              id={`newRecipeInstructions`}
              placeholder={`write recipe instructions here...`}
            />
            <input type={`submit`} />
          </form>
        </>
      ) : (
        <button onClick={() => setRecipeFormShown(true)}>Add Recipe</button>
      )}
    </div>
  );
}

export default App;
