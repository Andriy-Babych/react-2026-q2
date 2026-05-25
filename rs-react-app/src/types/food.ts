export type ResultItem = {
  id: string;
  name: string;
  description: string;
};

export type SelectedItem = ResultItem & {
  detailsUrl: string;
};
