type News = {
  title?: string;
  slug?: string;
  thumbnail?: string;
  paragraphs?: Array<
    | {
        type: "image";
        src: string;
        description: string;
        index: string;
      }
    | {
        type: "text";
        text: string;
        index: string;
      }
  >;
  createdAt?: string;
  description?: string;
  content?: string;
};

export default News;
