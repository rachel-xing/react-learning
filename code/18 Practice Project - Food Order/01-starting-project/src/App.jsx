import Header from "./components/UI/Header.jsx";
import Meals from "./components/UI/Meals.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";


function App() {
    return (
        <CartContextProvider>
            <Header/>
            <Meals/>
        </CartContextProvider>
    );
}

export default App;
