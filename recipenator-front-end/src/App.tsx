import { useEffect, useState } from 'react'
import './App.css'
import CreateRecipe from './components/CreateRecipe';
import ListRecipes from './components/ListRecipes';


interface Recipe {
  id: string,
  name: string,
  instructions: string,
  ingredients: string,
}

function App() {
  const [currentView, setCurrentView] = useState('');
  const [data, setData] = useState<Recipe[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/api/recipes');
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  const setNewView = (view: string) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'create':
        return <CreateRecipe />
      case 'list':
        return <ListRecipes recipes={data} />
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
