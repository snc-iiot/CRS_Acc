interface IStatus {
  status_id: number;
  status_name: string;
  status_color: string;
}

// 0 "รออัพโหลดเอกสาร"
// 1 "รอตรวจสอบข้อมูล"
// 2 "รอยืนยันข้อมูลทางการเงิน"
// 3 "รอการแก้ไข"
// 4 "รอพิจารณาอนุมัติ"
// 5 "ระงับชั่วคราว"
// 6 "อนุมัติ"
// 7 "ไม่อนุมัติ"

export const status = [
  {
    status_id: 0,
    status_name: "รออัพโหลดเอกสาร",
    status_color: "bg-gray-400",
  },
  {
    status_id: 1,
    status_name: "รอตรวจสอบข้อมูล",
    status_color: "bg-yellow-400",
  },
  {
    status_id: 2,
    status_name: "รอยืนยันข้อมูลทางการเงิน",
    status_color: "bg-yellow-400",
  },
  {
    status_id: 3,
    status_name: "รอการแก้ไข",
    status_color: "bg-yellow-400",
  },
  {
    status_id: 4,
    status_name: "รอพิจารณาอนุมัติ",
    status_color: "bg-yellow-400",
  },
  {
    status_id: 5,
    status_name: "ระงับชั่วคราว",
    status_color: "bg-red-400",
  },
  {
    status_id: 6,
    status_name: "อนุมัติ",
    status_color: "bg-green-400",
  },
  {
    status_id: 7,
    status_name: "ไม่อนุมัติ",
    status_color: "bg-red-400",
  },
];

export const statusHelper = (status_id: number): IStatus => {
  return status[status_id];
};
