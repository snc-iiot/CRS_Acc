import { FadeIn } from "@/components/common/framer-motion";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import {
  //   Table,
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
import { useNavigate } from "react-router-dom";

const Registrations: FC = () => {
  const registrations: RegistrationInterface[] = registrationsMock;
  //   console.log(registrations);
  const navigate = useNavigate();

  function handleViewDetail(id: number) {
    navigate("/registration-info?RegisID=" + id);
  }

  return (
    <FadeIn>
      <main>
        <h2 className="text-2xl font-semibold">รายการลงทะเบียนลูกค้า</h2>

        <div className="mt-5 max-h-[500px] w-full overflow-auto border border-red-500">
          <table className="relative w-full border-separate">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <THead className="sticky top-0 z-10 bg-primary-foreground text-sm">
              <Tr>
                <Th className="w-[100px]">ลำดับ</Th>
                <Th className="w-[10rem]">หมายเลขนิติบุคคล</Th>
                <Th>บริษัทลูกค้า</Th>
                <Th className="w-[200px]">ขึ้นทะเบียนกับบริษัท</Th>
                <Th className="w-[10rem]">เวลาขึ้นทะเบียน</Th>
                <Th className="w-[150px]"></Th>
              </Tr>
            </THead>
            <TBody className="text-sm">
              {registrations
                //  .concat(registrations)
                //  .concat(registrations)
                //  .concat(registrations)
                //  .concat(registrations)
                //  .concat(registrations)
                //  .concat(registrations)
                //  .concat(registrations)
                //  .concat(registrations)
                ?.map((item, i) => (
                  <Tr key={i} className="border-b">
                    <Td>{i + 1}</Td>
                    <Td>{item?.JulisticID}</Td>
                    <Td>{item?.Company}</Td>
                    <Td>{item?.RegisWithCompany}</Td>
                    <Td>{item?.RegisDT}</Td>
                    <Td>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          handleViewDetail(item?.RegisID as number)
                        }
                      >
                        <Icons.eye className="h-5 w-5" />
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </TBody>
          </table>
        </div>
      </main>
    </FadeIn>
  );
};

export default Registrations;
