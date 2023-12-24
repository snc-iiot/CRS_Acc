interface ICommentType {
  label: string;
  name: string;
  color: string;
  color_text: string;
}

export const CommentType: ICommentType[] = [
  {
    label: "ข้อเสนอแนะ / คำถาม",
    name: "general",
    color: "bg-gray-600 hover:bg-gray-700",
    color_text: "text-white",
  },
  {
    label: "ข้อเสนอแนะจากการส่งกลับไปแก้ไข",
    name: "edit",
    color: "bg-yellow-600 hover:bg-yellow-700",
    color_text: "text-white",
  },
  {
    label: "ข้อเสนอแนะจากการพิจารณาไม่อนุมัติ",
    name: "disapprove",
    color: "bg-red-600 hover:bg-red-700",
    color_text: "text-white",
  },
];
