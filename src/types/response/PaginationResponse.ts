type PaginationResponse<Row> = {
  rows: Row[];
  count: number;
  total_pages: number;
};

export default PaginationResponse;
