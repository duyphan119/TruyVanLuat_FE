type IsNextResponse<Row> = {
  rows: Row[];
  isNext: boolean;
  count?: number;
};

export default IsNextResponse;
