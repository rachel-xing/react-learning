import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept";
import TabButton from "./components/TabButton";
import {CORE_CONCEPTS} from "./data";
function App() {
  return (
    <div>
      <Header/>
        <main>
            <section id="core-concepts">
                <h2>Core Concepts</h2>
                <ul>
                    <CoreConcept
                        title={CORE_CONCEPTS[0].title}
                        image={CORE_CONCEPTS[0].image}
                        description={CORE_CONCEPTS[0].description}
                    />
                    <CoreConcept {...CORE_CONCEPTS[1]} />
                    <CoreConcept {...CORE_CONCEPTS[2]} />
                    <CoreConcept {...CORE_CONCEPTS[3]} />
                </ul>
            </section>
            <section id="examples">
                <h2>Examples</h2>
                <menu>
                    <TabButton>Components</TabButton>
                    <TabButton>JSX</TabButton>



                </menu>
            </section>
        </main>
    </div>
  );
}

export default App;
