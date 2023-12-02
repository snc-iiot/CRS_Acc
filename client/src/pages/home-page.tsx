import { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      {/* <h1 className="text-3xl font-bold">Dashboard is coming...</h1> */}
      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZjliYTg1Y2QtZWUwNC00ZGJjLThhOWEtNWE4MDlkNDMwMDE2IiwidCI6ImMyOTMwYTY0LWNhYzMtNDFkNi1hYWYwLTFjOGI4NmM1ZmNhZCIsImMiOjEwfQ%3D%3D&pageName=ReportSection134277f2e5d039a26aff"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen={true}
      />
    </div>
  );
};

export default HomePage;
