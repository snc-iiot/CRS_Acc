export type TCommitList = {
  regis_id: string;
  comments: TComment[];
};

export type TComment = {
  comments_id: string;
  comments: string;
  comments_type: string;
  creator_id: string;
  created_at: string;
  name_th: string;
  name_en: string;
};
