import { useState } from 'react'
import './App.css'
import CreateRecipe from './components/CreateRecipe';
import ListRecipes from './components/ListRecipes';

function App() {
  const [currentView, setCurrentView] = useState('');

  const setNewView = (view: string) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'create':
        return <CreateRecipe />
      case 'list':
        return <ListRecipes />
    }
  }

  return (
    <>
      <h1>Behold the Recipenator!</h1>
      <div>
        <button onClick={() => setNewView('create')}>Create Recipe</button>
        <button onClick={() => setNewView('list')}>Get Recipes</button>
      </div>
      <div>{renderView()}</div>
    </>
  )
}

export default App
