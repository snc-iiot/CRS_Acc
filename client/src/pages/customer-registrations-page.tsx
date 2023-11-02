import { FadeIn } from "@/components/common/framer-motion";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import {
  Table,
  //   TableCaption,
  TableBody as TBody,
  TableCell as Td,
  TableHead as Th,
  TableHeader as THead,
  TableRow as Tr,
} from "@/components/ui/table";
import registrationsMock from "@/mock/registrations.mock.json";
import { RegistrationInterface } from "@/models";
import { FC } from "react";
import { Link,useNavigate } from "react-router-dom";

const CustomerRegistrations: FC = () => {
  const registrations: RegistrationInterface[] = registrationsMock;
  const navigate = useNavigate()
  //   console.log(registrations);

  return (
    <FadeIn>
      <main className="flex h-[90dvh] flex-col">
        <h2 className="text-xl font-bold">รายการลงทะเบียนลูกค้า</h2>

        <div className="mt-3 flex items-center gap-x-1">
          <Button className="flex items-center justify-between px-[1rem] py-[2rem] sm:w-[12rem] lg:w-[20rem]" onClick={() => navigate('/registration')}>
            <span>ลงทะเบียนลูกค้าใหม่</span>
            <Icons.plus className="h-8 w-8 font-bold" />
          </Button>
          <Button className="flex items-center justify-between px-[1rem] py-[2rem] sm:w-[12rem] lg:w-[20rem]">
            <span>ลงทะเบียนลูกค้าใหม่ (ส่งเมล)</span>
            <Icons.plus className="h-8 w-8 font-bold" />
          </Button>
        </div>

        <div className="mt-5 w-full flex-grow overflow-x-auto overflow-y-auto rounded border">
          <Table className="relative w-full">
            {/* <Table className="relative w-full border-separate"> */}
            {/* <table className="relative w-full border-separate"> */}
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <THead className="sticky top-0 z-10 whitespace-nowrap bg-primary-foreground text-sm">
              <Tr>
                <Th className="w-[100px]">ลำดับ</Th>
                <Th className="w-[10rem]">หมายเลขนิติบุคคล</Th>
                <Th>บริษัทลูกค้า</Th>
                <Th className="w-[200px]">ขึ้นทะเบียนกับบริษัท</Th>
                <Th className="w-[10rem]">เวลาขึ้นทะเบียน</Th>
                <Th className="w-[10rem]">สถานะ</Th>
                <Th className="w-[150px]"></Th>
              </Tr>
            </THead>
            <TBody className="text-sm">
              {registrations
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                // .concat(registrations)
                ?.map((item, i) => (
                  <Tr key={i} className="whitespace-nowrap border-b text-xs">
                    <Td>{i + 1}</Td>
                    <Td>{item?.JulisticID}</Td>
                    <Td>{item?.Company}</Td>
                    <Td>{item?.RegisWithCompany}</Td>
                    <Td>{item?.RegisDT}</Td>
                    <Td>
                      <span className="select-none rounded bg-primary/70 p-1 uppercase text-white">
                        Status1
                      </span>
                    </Td>
                    <Td>
                      <Link
                        to={"/registration-info?RegisID=" + item?.RegisID}
                        className="flex items-center gap-x-1 text-primary hover:underline"
                      >
                        <Icons.eye className="h-4 w-4" /> <span>ดูละเอียด</span>
                      </Link>
                    </Td>
                  </Tr>
                ))}
            </TBody>
            {/* </table> */}
          </Table>
        </div>
      </main>
    </FadeIn>
  );
};

export default CustomerRegistrations;
