import type { CoursePart } from "../types.ts";

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  const renderDetails = () => {
    switch (part.kind) {
      case "basic":
        return <div>description: {part.description}</div>;
      case "group":
        return <div>group project count: {part.groupProjectCount}</div>;
      case "background":
        return (
          <div>
            background material: {part.backgroundMaterial}
            <br />
            description: {part.description}
          </div>
        );
      case "special":
        return (
          <div>
            requirements: {part.requirements.join(", ")}
            <br />
            description: {part.description}
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <div>
      <h4>{part.name}</h4>
      exercise count: {part.exerciseCount}
      {renderDetails()}
    </div>
  );
};

export default Part;
