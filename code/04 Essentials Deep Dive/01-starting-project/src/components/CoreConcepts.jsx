import {CORE_CONCEPTS} from "../data";
import Section from "./Section";
import CoreConcept from "./CoreConcept";


export default function () {
  return (
    <Section id="core-concepts" title="Core Concepts">
      <ul>
        {CORE_CONCEPTS.map((conceptItem) => (
          <CoreConcept key={conceptItem.title} {...conceptItem} />
        ))}
      </ul>
    </Section>
  );
}