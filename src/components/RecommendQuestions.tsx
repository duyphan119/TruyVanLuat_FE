import RecommendQuestion from "@/types/recommendQuestion/RecommendQuestion";
import React from "react";

type Props = {
  recommendQuestions: RecommendQuestion[];
  onClick: (recommendQuestion: RecommendQuestion) => void;
};

const RecommendQuestions = ({ recommendQuestions, onClick }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-1/2 mx-auto">
      <div className="text-center mb-4 text-2xl">Gợi ý câu hỏi</div>
      <div className="grid grid-cols-1 md:hidden gap-4">
        {[...recommendQuestions].splice(0, 3).map((recommend) => {
          return (
            <div
              key={recommend.id}
              className="flex items-center justify-center text-center bg-gray-200 rounded-sm p-2 cursor-pointer hover:bg-gray-300"
              onClick={() => onClick(recommend)}
            >
              "{recommend.content}"
            </div>
          );
        })}
      </div>
      <div className="md:grid md:grid-cols-3 hidden gap-4">
        {recommendQuestions.map((recommend) => {
          return (
            <div
              key={recommend.id}
              className="flex items-center justify-center text-center bg-gray-200 rounded-sm p-2 cursor-pointer hover:bg-gray-300"
              onClick={() => onClick(recommend)}
            >
              "{recommend.content}"
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendQuestions;
