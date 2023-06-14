export interface IAnalysis {
  _id: string;
  _index: string;
  _score: number;
  _source: ISource;
}

interface ISource {
  BedRoomNumberDesc: string;
  BedroomNumber: number;
  DId: string;
  EId: string;
  EKeyword: string;
  EKeywordWithoutAccents: string;
  Id: string;
  Month: string;
  PriceAvg: string;
  ProjectId: string;
  ProjectName: string;
  ProjectType: number;
  ProjectTypeDesc: string;
  SuggestionKeywordSynonymWithoutAccents: string;
  SuggestionKeywordWithoutAccents: string;
  TitleWithoutAccents: string;
  Year: number;
}

export interface IAnalysisShort {
  projectId: string;
  projectName: string;
  projectType: number;
  year: number;
  month: string;
  bedroomNumber: string;
  priceAvg: string;
}
