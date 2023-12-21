import { CopyToClipboardCustom } from "@/hooks/use-copy-to-clipboard";
import { useAtomStore } from "@/jotai/use-atom-store";
import { FC, Fragment } from "react";

const ContactPerson: FC = () => {
  const { registration } = useAtomStore();

  return (
    <div className="grid grid-cols-4 pl-1 pr-4 text-xs">
      {registration?.contact_person?.map((item, i) => (
        <Fragment key={i}>
          <h4 className="col-span-4 font-semibold">{item?.position_th}</h4>
          <h4>ชื่อ-นามสกุล</h4>
          <div className="col-span-3 flex items-center gap-x-1">
            <CopyToClipboardCustom
              text={item?.name}
              delay={500}
              className="h-3 w-3"
            />
            <p className="w-full border-b text-primary">{item?.name}</p>
          </div>

          <h4>โทรศัพท์</h4>
          <div className="col-span-3 flex items-center gap-x-1">
            <CopyToClipboardCustom
              text={item?.tel}
              delay={500}
              className="h-3 w-3"
            />
            <p className="w-full border-b text-primary">{item?.tel}</p>
          </div>

          <h4>อีเมล</h4>
          <div className="col-span-3 flex items-center gap-x-1">
            <CopyToClipboardCustom
              text={item?.email}
              delay={500}
              className="h-3 w-3"
            />
            <p className="w-full border-b text-primary">{item?.email}</p>
          </div>
          <div className="col-span-4 mb-1" />
        </Fragment>
      ))}
    </div>
  );
};

export default ContactPerson;
