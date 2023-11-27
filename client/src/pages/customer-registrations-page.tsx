import { FadeIn } from "@/components/common/framer-motion";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody as TBody,
  TableCell as Td,
  TableHead as Th,
  TableHeader as THead,
  TableRow as Tr,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import registrationsMock from "@/mock/registrations.mock.json";
import { RegistrationInterface } from "@/models";
import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import * as Toolbar from "@radix-ui/react-toolbar";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerRegistrations: FC = () => {
  const registrations: RegistrationInterface[] = registrationsMock;
  const navigate = useNavigate();
  //   console.log(registrations);

  return (
    <FadeIn>
      <main className="flex h-[90dvh] flex-col">
        <h2 className="text-xl font-bold">รายการลงทะเบียนลูกค้า</h2>

        <div className="mt-3 flex items-center gap-x-1">
          <Button
            className="flex items-center justify-between px-[1rem] py-[2rem] sm:w-[12rem] lg:w-[20rem]"
            onClick={() => navigate("/registration")}
          >
            <span>ลงทะเบียนลูกค้าใหม่</span>
            <Icons.plus className="h-8 w-8 font-bold" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center justify-between px-[1rem] py-[2rem] sm:w-[12rem] lg:w-[20rem]">
                <span>ลงทะเบียนลูกค้าใหม่ (ส่งเมล)</span>
                <Icons.plus className="h-8 w-8 font-bold" />
              </Button>
            </DialogTrigger>
            <DialogContent className="flex w-[70vw] max-w-[70vw] flex-col gap-y-2">
              <section className="flex flex-col gap-y-1">
                <article className="flex items-center gap-x-1">
                  <h2 className="text-md font-semibold">
                    ลงทะเบียนลูกค้าใหม่ (ส่งเมล)
                  </h2>
                </article>
                <article className="flex flex-col gap-2 rounded-md">
                  <section className="rounded bg-secondary p-2">
                    <p className="text-sm">
                      กรุณากรอกข้อมูลลงทะเบียนลูกค้าใหม่ให้ครบถ้วน
                    </p>
                  </section>
                  <section className="flex flex-col gap-2">
                    <div className="grid grid-cols-10 gap-x-2">
                      {/* <div className="col-span-1 flex items-center justify-end">
                        <h3 className="text-sm font-semibold">ผู้ส่ง</h3>
                      </div> */}
                      <Input
                        className="col-span-10 w-full px-4"
                        type="email"
                        variant="flushed"
                        placeholder="ผู้ส่ง"
                        defaultValue="Anuwat_Thisuka@gmail.com"
                      />
                    </div>
                    <div className="grid grid-cols-10 gap-x-2">
                      {/* <div className="col-span-1 flex items-center justify-end">
                        <h3 className="text-sm font-semibold">เรื่อง</h3>
                      </div> */}
                      <Input
                        className="col-span-10 w-full px-4"
                        type="email"
                        variant="flushed"
                        placeholder="เรื่อง"
                        defaultValue="ขอข้อมูลการลงทะเบียน"
                      />
                    </div>
                  </section>
                  <section>
                    <Toolbar.Root
                      className="flex w-full min-w-max rounded-none border-b bg-white p-[10px]"
                      aria-label="Formatting options"
                    >
                      <Toolbar.ToggleGroup
                        type="multiple"
                        aria-label="Text formatting"
                      >
                        <Toolbar.ToggleItem
                          className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
                          value="bold"
                          aria-label="Bold"
                        >
                          <FontBoldIcon />
                        </Toolbar.ToggleItem>
                        <Toolbar.ToggleItem
                          className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
                          value="italic"
                          aria-label="Italic"
                        >
                          <FontItalicIcon />
                        </Toolbar.ToggleItem>
                        <Toolbar.ToggleItem
                          className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
                          value="strikethrough"
                          aria-label="Strike through"
                        >
                          <StrikethroughIcon />
                        </Toolbar.ToggleItem>
                      </Toolbar.ToggleGroup>
                      <Toolbar.Separator className="bg-mauve6 mx-[10px] w-[1px]" />
                      <Toolbar.ToggleGroup
                        type="single"
                        defaultValue="center"
                        aria-label="Text alignment"
                      >
                        <Toolbar.ToggleItem
                          className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
                          value="left"
                          aria-label="Left aligned"
                        >
                          <TextAlignLeftIcon />
                        </Toolbar.ToggleItem>
                        <Toolbar.ToggleItem
                          className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
                          value="center"
                          aria-label="Center aligned"
                        >
                          <TextAlignCenterIcon />
                        </Toolbar.ToggleItem>
                        <Toolbar.ToggleItem
                          className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
                          value="right"
                          aria-label="Right aligned"
                        >
                          <TextAlignRightIcon />
                        </Toolbar.ToggleItem>
                      </Toolbar.ToggleGroup>
                      <Toolbar.Separator className="bg-mauve6 mx-[10px] w-[1px]" />
                    </Toolbar.Root>
                  </section>
                  <section>
                    <Textarea
                      className="h-[30rem] max-h-[30rem] w-full border-none shadow-none focus-visible:ring-0"
                      placeholder="เนื้อหา"
                      defaultValue={`เรียน คุณ สมชาย ใจดี\nผู้จัดการบริษัท จูลิสติกส์ จำกัด \nที่อยู่ 123 ถนน สุขุมวิท แขวง คลองเตย เขต คลองเตย กรุงเทพมหานคร 10110\nโทรศัพท์ 02-123-4567\nโทรสาร 02-123-4567\nมือถือ 081-123-4567 อีเมล์ `}
                    />
                  </section>
                  <section className="flex items-center justify-end gap-x-2">
                    <Button className="w-1/12">ส่งเมล</Button>
                  </section>
                </article>
              </section>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-5 w-full flex-grow overflow-x-auto overflow-y-auto rounded border">
          <Table className="relative w-full">
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
                      <small className="select-none rounded bg-primary/70 p-1 uppercase text-white">
                        Status1
                      </small>
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
