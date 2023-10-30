import { CopyToClipboardCustom } from "@/hooks/use-copy-to-clipboard";
import { FC, Fragment } from "react";

const ContactPerson: FC = () => {
  const contactPersonInformation: {
    title: string;
    name: string;
    tel: string;
    email: string;
  }[] = [
    {
      title: "ผู้จัดการแผนกฝ่ายจัดซื้อ",
      name: "นายสถาพร ไชยเจริญ1",
      tel: "0999999997",
      email: "sataporn1@mail.com",
    },
    {
      title: "ผู้จัดการแผนกบัญชีและการเงิน",
      name: "นายสถาพร ไชยเจริญ2",
      tel: "0999999998",
      email: "sataporn2@mail.com",
    },
    {
      title: "กรรมการผู้จัดการ",
      name: "นายสถาพร ไชยเจริญ3",
      tel: "0999999999",
      email: "sataporn3@mail.com",
    },
  ];

  return (
    <div className="grid grid-cols-4 pl-1 pr-4 text-xs">
      {contactPersonInformation?.map((item, i) => (
        <Fragment key={i}>
          <h4 className="col-span-4 font-semibold">{item?.title}</h4>
          <h4>ชื่อ-นามสกุล</h4>
          <div className="col-span-3 flex items-center gap-x-1">
            <CopyToClipboardCustom
              text={item?.name}
              delay={500}
              className="h-3 w-3"
            />
            <p className="w-full border-b">{item?.name}</p>
          </div>

          <h4>โทรศัพท์</h4>
          <div className="col-span-3 flex items-center gap-x-1">
            <CopyToClipboardCustom
              text={item?.tel}
              delay={500}
              className="h-3 w-3"
            />
            <p className="w-full border-b">{item?.tel}</p>
          </div>

          <h4>อีเมล</h4>
          <div className="col-span-3 flex items-center gap-x-1">
            <CopyToClipboardCustom
              text={item?.email}
              delay={500}
              className="h-3 w-3"
            />
            <p className="w-full border-b">{item?.email}</p>
          </div>
          <div className="col-span-4 mb-1" />
        </Fragment>
      ))}
    </div>
  );
};

export default ContactPerson;
