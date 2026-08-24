export type AnalysisScores = Record<string, number>;

export type AnalysisResponse = {
  data: {
    race: AnalysisScores;
    age: AnalysisScores;
    gender: AnalysisScores;
  };
};

export type AnalysisRequest = {
  image: string;
};