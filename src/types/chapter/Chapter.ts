import Clause from "../clause/Clause";

type Chapter = {
  id: string;
  title: string;
  clauses: Clause[];
};

export default Chapter;
