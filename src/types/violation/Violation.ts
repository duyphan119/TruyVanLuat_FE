type Violation = {
  // id: string;
  // content: string;
  // apply_for: string;
  // punishment: string;
  // detail?: string;
  // updated_punishment_detail?: string;
  // note?: string;
  // note_detail?: string;
  // added_punishment?: string;
  // added_punishment_detail?: string;
  // updated_added_punishment_detail?: string;
  // solution?: string;
  // solution_detail?: string;
  // updated_solution_detail?: string;

  id: string;
  // content: string;
  // punishment: string;
  // detail: string;
  violator: string;
  behavior: string;
  about: string;
  // solutions: Array<{
  //   id: string;
  //   content: string;
  //   detail: string;
  // }>;
  // addition_punishments: Array<{
  //   id: string;
  //   content: string;
  //   detail: string;
  // }>;

  // violators: string[];
  fine: string;
  // legal: {
  //   name: string;
  //   num: string;
  //   chapter: {
  //     name: string;
  //     num: string;
  //   };
  //   section: {
  //     name: string;
  //     num: string;
  //   };
  //   article: {
  //     name: string;
  //     num: string;
  //   };
  //   clause: {
  //     name: string;
  //     num: string;
  //   };
  //   point: {
  //     name: string;
  //     num: string;
  //   };
  // };

  name: string;
  legal: string;
  // keywords: string;
  // content: string;
  // addition_punishments: {
  //   id: string;
  //   content: string;
  //   legal: string;
  // }[];
  // solutions: {
  //   id: string;
  //   content: string;
  //   legal: string;
  // }[];
  // note: string;
};

export default Violation;
