import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddRecipe from "./component/AddRecipe";
import AllRecipes from "./component/AllRecipes";
import Home from "./component/home";

function App() {

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />}>
            <Route path={"add"} element={<AddRecipe />} />
            <Route path={"recipes"} element={<AllRecipes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
