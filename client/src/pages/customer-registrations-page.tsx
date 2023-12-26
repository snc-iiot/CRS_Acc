import { FadeIn } from "@/components/common/framer-motion";
import { Icons } from "@/components/common/icons";
import { Spinner } from "@/components/common/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ClearButton,
  FilterBar,
  FilterBarInput,
  FilterSelect,
} from "@/components/ui/filter-bar";
// import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody as TBody,
  TableCell as Td,
  TableHead as Th,
  TableHeader as THead,
  TableRow as Tr,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orderArrayBy } from "@/helpers/array.helper";
// import { Textarea } from "@/components/ui/textarea";
import { MODE_CODE } from "@/helpers/common.helper";
import {
  initialStateDocByRegisId,
  initialStateGeneralAssessmentForm,
  initialStateRegistrationForm,
} from "@/helpers/initial-state.helper";
import { InitialRegistration } from "@/helpers/register.helper";
import { status, statusHelper } from "@/helpers/status.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { useUtils } from "@/services";
import { useForm } from "@/services/hooks/use-form";
import { useProfile } from "@/services/hooks/use-profile";
import { TRegisList } from "@/types";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerRegistrations: FC = () => {
  const {
    profile: { role },
  } = useProfile();
  const { useGetRegisList } = useForm();
  const {
    setRegistration,
    regisList,
    companyList,
    setGeneralAssessmentForm,
    setDocByRegisId,
    setCommon,
    regisListByAccount,
  } = useAtomStore();
  const { mutateGetRegisterId } = useUtils();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [companySelect, setCompanySelect] = useState<string[]>([]);
  const [statusSelect, setStatusSelect] = useState<string[]>([]);
  const [tabsSelected, setTabsSelected] = useState<string>("4");
  const { isLoading } = useGetRegisList();
  const [sortByDate, setSortByDate] = useState<"ascending" | "descending">(
    "descending",
  );

  // const tabsKey: {
  //   status_no: number;
  //   key: string;
  //   label: string;
  // }[] = [
  //   {
  //     status_no: 1,
  //     key: "wait_for_approve",
  //     label: "รอการตรวจสอบข้อมูล",
  //   },
  //   {
  //     status_no: 2,
  //     key: "wait_for_approve_by_acc",
  //     label: "รอยืนยันข้อมูลการเงิน",
  //   },
  //   {
  //     status_no: 3,
  //     key: "wait_for_approve_by_acc",
  //     label: "รอการแก้ไข",
  //   },
  //   {
  //     status_no: 4,
  //     key: "wait_for_approve_by_acc",
  //     label: "รอพิจารณาอนุมัติ",
  //   },
  //   {
  //     status_no: 5,
  //     key: "wait_for_approve_by_acc",
  //     label: "ระงับชัวคราว",
  //   },
  // ];

  const Company = companyList?.map((item) => ({
    value: item?.company?.toLowerCase(),
    label: item?.company?.toUpperCase(),
  }));

  const getRegisterId = async () => {
    const regisId = await mutateGetRegisterId();
    if (regisId.status === "success") {
      if (!regisId.data?.[0]?.regis_id) return;
      setRegistration({
        ...InitialRegistration,
        regis_id: regisId.data?.[0]?.regis_id || "",
      });
      navigate(
        `/registrations/customer/register?RegisID=${regisId.data?.[0]?.regis_id}&mode=${MODE_CODE.CREATE}`,
      );
    }
  };

  const RegisData = regisList?.filter((item) => item?.status_no !== 4);
  const Data =
    tabsSelected === "100"
      ? RegisData
      : tabsSelected === "4"
      ? regisListByAccount
      : RegisData?.filter((item) => item?.status_no === parseInt(tabsSelected));

  const filterData = Data?.filter((item) => {
    if (statusSelect.length === 0) return true;
    return statusSelect.includes(item.status_no?.toString());
  })
    ?.filter((item) => {
      if (companySelect.length === 0) return true;
      return companySelect.includes(item.company_admin?.toLowerCase());
    })
    ?.filter((item) => {
      if (search === "") return item;
      else if (
        item?.juristic_id?.toLowerCase().includes(search.toLowerCase()) ||
        item?.company_name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.company_admin?.toLowerCase().includes(search.toLowerCase()) ||
        item?.created_at?.toLowerCase().includes(search.toLowerCase()) ||
        item?.status_desc_th?.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    });

  useEffect(() => {
    setGeneralAssessmentForm(initialStateGeneralAssessmentForm);
    setRegistration(initialStateRegistrationForm);
    setDocByRegisId(initialStateDocByRegisId);
    setCommon((prev) => ({
      ...prev,
      isEditGeneralAssessmentForm: false,
    }));
  }, []);

  if (isLoading)
    return (
      <main className="flex h-[90dvh] flex-col items-center justify-center gap-2">
        <Spinner />
        <p className="text-sm">กำลังโหลดข้อมูล...</p>
      </main>
    );

  return (
    <FadeIn>
      <main className="flex h-[90dvh] flex-col gap-2 px-1">
        <h2 className="text-xl font-bold">รายการลงทะเบียนลูกค้า</h2>
        <div className="flex items-center gap-x-1">
          <Button
            className={cn(
              "flex items-center justify-between px-[1rem] py-[2rem] sm:w-[12rem] lg:w-[20rem]",
              role !== "admin" && role !== "user" ? "hidden" : "flex",
            )}
            onClick={getRegisterId}
          >
            <span>ลงทะเบียนลูกค้าใหม่</span>
            <Icons.plus className="h-8 w-8 font-bold" />
          </Button>
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center justify-between px-[1rem] py-[2rem] sm:w-[12rem] lg:w-[20rem]">
                <span>ลงทะเบียนลูกค้าใหม่ (ส่งเมล)</span>
                <Icons.plus className="h-8 w-8 font-bold" />
              </Button>
            </DialogTrigger>
            <DialogContent className="flex w-[50vw] max-w-[70vw] flex-col gap-y-2">
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
                    <div className="flex gap-x-2">
                      <div className="flex w-[3.5rem] items-center justify-start">
                        <h3 className="text-sm font-semibold">ผู้รับเมล</h3>
                      </div>
                      <Input
                        className="w-full px-0"
                        type="email"
                        variant="flushed"
                        placeholder="ผู้รับเมล"
                        defaultValue="Anuwat_Thisuka@gmail.com"
                      />
                    </div>
                    <div className="flex gap-x-2">
                      <div className="flex w-[3.5rem] items-center justify-start">
                        <h3 className="text-sm font-semibold">เรื่อง</h3>
                      </div>
                      <Input
                        className=" w-full px-0"
                        type="email"
                        variant="flushed"
                        placeholder="เรื่อง"
                        defaultValue="ขึ้นทะเบียนผู้ขาย บมจ. เอสเอ็นซี ฟอร์เมอร์ (Customer Registration)"
                      />
                    </div>
                  </section>
                  <section>
                    <Textarea
                      className="h-[25rem] max-h-[30rem] min-h-[15rem] w-full border border-none p-0 shadow-none focus-visible:ring-0"
                      placeholder="เนื้อหา"
                      defaultValue={
                        "เรียน: (กรุณาระบุชื่อผู้ติดต่อ)\nบริษัท: (กรุณาระบุชื่อบริษัทลูกค้า) \n\nบริษัท เอสเอ็นซี ฟอร์เมอร์ จำกัด (มหาชน) และบริษัทในเครือฯ ขอแจ้งรายละเอียดการขึ้นทะเบียนผู้ขาย (Customer Registration) ตามนโยบายของบริษัทฯ โดยมีขั้นตอนการดำเนินการ ดังนี้\n1. เข้าสู่เว็บไซต์ (SNC-iCRS) เพื่อขึ้นทะเบียน\n2. กรอกข้อมูลในระบบให้ครบถ้วน\n3. แนบเอกสารที่เกี่ยวข้อง พร้อมลงนามรับรองเอกสาร\n4. ศึกษา และยอมรับนโยบายการคุ้มครองข้อมูลส่วนบุคคล และนโยบายอื่นๆ ก่อนกดส่งข้อมูล\n5. ติดตามสถานะการขึ้นทะเบียน ผ่าน Email ที่ท่านใช้ในการขึ้นทะเบียน  \n\nขอแสดงความนับถือ\nLogo \nบริษัท เอสเอ็นซี ฟอร์เมอร์ จำกัด (มหาชน) และบริษัทในเครือฯ\n---------------------------------------------------------------------------------\nDear: \nCompany: \n\nSNC Former Co., Ltd. (Public Company) and affiliated companies, We hereby inform you of the details regarding the Customer Registration in accordance with our company's policy. The registration process is as follows:\n1. Access the website (SNC-iCRS) for registration.\n2. Complete the information in the system accurately.\n3. Attach relevant documents, duly signed and certified.\n4. Review and accept the Personal Data Protection Policy and other relevant policies before submitting the information.\n5. Monitor the registration status through the email you provided during the registration process.\n\nYours sincerely,\n[Your Company's Logo]\nSNC Former Co., Ltd. (Public Company) and affiliated companies"
                      }
                    />
                  </section>
                  <section className="flex items-center justify-end gap-x-2">
                    <Button className="w-max">
                      <Icons.send className="mr-1 h-4 w-4" />
                      <span className="whitespace-nowrap">
                        ส่งเมลไปยังลูกค้า
                      </span>
                    </Button>
                  </section>
                </article>
              </section>
            </DialogContent>
          </Dialog> */}
        </div>

        <div className="flex w-full items-center justify-between">
          <Tabs value={tabsSelected} className="w-[400px]">
            <TabsList>
              <TabsTrigger
                value="4"
                onClick={() => {
                  setTabsSelected("4");
                }}
              >
                รอพิจารณาอนุมัติ
                {regisListByAccount?.filter((item) => item?.status_no === 4)
                  ?.length > 0
                  ? ` (${regisListByAccount?.filter(
                      (item) => item?.status_no === 4,
                    )?.length})`
                  : ""}
              </TabsTrigger>
              <TabsTrigger
                value="2"
                onClick={() => {
                  setTabsSelected("2");
                }}
              >
                รอยืนยันข้อมูลการเงิน
                {regisList?.filter((item) => item?.status_no === 2)?.length > 0
                  ? ` (${regisList?.filter((item) => item?.status_no === 2)
                      ?.length})`
                  : ""}
              </TabsTrigger>
              <TabsTrigger
                value="3"
                onClick={() => {
                  setTabsSelected("3");
                }}
              >
                รอการแก้ไข
                {regisList?.filter((item) => item?.status_no === 3)?.length > 0
                  ? ` (${regisList?.filter((item) => item?.status_no === 3)
                      ?.length})`
                  : ""}
              </TabsTrigger>
              <TabsTrigger
                value="100"
                onClick={() => {
                  setTabsSelected("100");
                }}
              >
                ทั้งหมด
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div>
            <FilterBar>
              <FilterBarInput
                placeholder="ค้นหา"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <FilterSelect
                triggerText="สถานะ"
                options={status?.map((item) => ({
                  value: item?.status_id?.toString(),
                  label: item?.status_name?.toString(),
                }))}
                state={statusSelect}
                setState={setStatusSelect}
              />
              <FilterSelect
                triggerText="บริษัท"
                options={Company}
                state={companySelect}
                setState={setCompanySelect}
              />
              <ClearButton
                className="text-red-600 hover:text-red-600"
                onClick={() => {
                  setSearch("");
                  setCompanySelect([]);
                  setStatusSelect([]);
                }}
              >
                ล้าง
              </ClearButton>
            </FilterBar>
          </div>
        </div>
        <div className="w-full flex-grow overflow-x-auto overflow-y-auto rounded border">
          <Table className="relative w-full">
            <THead className="sticky top-0 z-10 whitespace-nowrap bg-primary-foreground text-sm">
              <Tr>
                <Th className="w-[100px]">ลำดับ</Th>
                <Th className="w-[10rem]">หมายเลขนิติบุคคล</Th>
                <Th>บริษัทลูกค้า</Th>
                <Th className="w-[200px]">
                  <span className="flex cursor-pointer items-center gap-x-1">
                    ขึ้นทะเบียนกับบริษัท
                  </span>
                </Th>
                <Th className="w-[10rem]">
                  <span className="flex cursor-pointer items-center gap-x-1">
                    เวลาขึ้นทะเบียน
                    {/* <Icons.arrowUpWideNarrow
                      className="h-4 w-4"
                      onClick={() => {
                        setSortByDate("ascending");
                      }}
                    /> */}
                    {sortByDate === "ascending" ? (
                      <Icons.arrowUpWideNarrow
                        className="h-4 w-4"
                        onClick={() => {
                          setSortByDate("descending");
                        }}
                      />
                    ) : (
                      <Icons.arrowDownWideNarrow
                        className="h-4 w-4"
                        onClick={() => {
                          setSortByDate("ascending");
                        }}
                      />
                    )}
                  </span>
                </Th>
                <Th className="w-[10rem]">สถานะ</Th>
                <Th className="w-[150px]"></Th>
              </Tr>
            </THead>
            <TBody className="text-sm">
              {filterData?.length === 0 && (
                <Tr>
                  <Td colSpan={7} className="text-center">
                    ไม่พบข้อมูล
                  </Td>
                </Tr>
              )}
              {orderArrayBy(filterData, "created_at", sortByDate)?.map(
                (item: TRegisList, i) => (
                  <Tr
                    key={i}
                    className="cursor-pointer whitespace-nowrap border-b text-sm"
                    onDoubleClick={() => {
                      navigate(
                        "/registrations/customer/info?RegisID=" +
                          item?.regis_id,
                      );
                    }}
                  >
                    <Td>{i + 1}</Td>
                    <Td>{item?.juristic_id}</Td>
                    <Td>{item?.company_name}</Td>
                    <Td>{item?.company_admin}</Td>
                    <Td>{item?.created_at}</Td>
                    <Td>
                      <Badge
                        className={cn(
                          statusHelper(item?.status_no)?.status_color,
                          "text-center text-sm",
                        )}
                      >
                        {item?.status_desc_th}
                      </Badge>
                    </Td>
                    <Td>
                      <Link
                        to={
                          "/registrations/customer/info?RegisID=" +
                          item?.regis_id
                        }
                        className="flex items-center gap-x-1 text-primary hover:underline"
                      >
                        <Icons.eye className="h-4 w-4" /> <span>ดูละเอียด</span>
                      </Link>
                    </Td>
                  </Tr>
                ),
              )}
            </TBody>
          </Table>
        </div>
      </main>
    </FadeIn>
  );
};

export default CustomerRegistrations;
