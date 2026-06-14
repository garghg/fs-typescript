import Part from "./Part";
import type { CoursePart } from "../types";

const Content = ({ courseParts }: {courseParts: CoursePart[]}) => {
  return (
    <div>
      {courseParts.map(part => {
        return <Part key={part.name} part={part} />
      })}
    </div>
  );
};

export default Content;
