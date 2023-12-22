interface IStatus {
  status_id: number;
  status_name: string;
  status_color: string;
}

export const status = [
  {
    status_id: 0,
    status_name: "รออัพโหลดเอกสาร",
    status_color: "bg-gray-600 hover:bg-gray-700",
  },
  {
    status_id: 1,
    status_name: "รอตรวจสอบข้อมูล",
    status_color: "bg-yellow-600 hover:bg-yellow-700",
  },
  {
    status_id: 2,
    status_name: "รอยืนยันข้อมูลทางการเงิน",
    status_color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    status_id: 3,
    status_name: "รอการแก้ไข",
    status_color: "bg-orange-600 hover:bg-orange-700",
  },
  {
    status_id: 4,
    status_name: "รอพิจารณาอนุมัติ",
    status_color: "bg-yellow-600 hover:bg-yellow-700",
  },
  {
    status_id: 5,
    status_name: "ระงับชั่วคราว",
    status_color: "bg-gray-600 hover:bg-gray-700",
  },
  {
    status_id: 6,
    status_name: "อนุมัติ",
    status_color: "bg-green-600 hover:bg-green-700",
  },
  {
    status_id: 7,
    status_name: "ไม่อนุมัติ",
    status_color: "bg-red-600 hover:bg-red-700",
  },
];

export const statusHelper = (status_id: number): IStatus => {
  return status[status_id];
};
