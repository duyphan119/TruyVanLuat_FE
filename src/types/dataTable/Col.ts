import { ReactNode } from "react";

type Col<Model> = {
  label: string;
  key: string;
  render?: (model: Model) => ReactNode;
  className?: string;
};

export default Col;
