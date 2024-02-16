import { ReqAuth } from "@/auth/req-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { KEY_LOCAL_STORAGE } from "@/helpers/common.helper";
import { collapsedAtom } from "@/jotai/atom";
import { cn } from "@/lib/utils";
import { useForm, useUtils } from "@/services";
import { useProfile } from "@/services/hooks/use-profile";
import { useAtom } from "jotai";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Icons } from "./icons";
import { Header } from "./site-header";
import Sidebar from "./site-sidebar";

// import ThemeToggle from "./theme-toggle";

const RootLayout: FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useAtom(collapsedAtom);

  function resetAtom() {
    setCollapsed(false);
  }

  const {
    useGetBenefitsList,
    useGetBusinessTypeList,
    useGetCertificatedList,
    useGetCompanyList,
    useGetCompanyPolicyList,
    useGetCountryCodeList,
    useGetDeliveryTermsList,
    useGetDocumentKeyList,
  } = useUtils();

  const { useGetRegisList, useGetRegisListByAccountId } = useForm();

  useGetBenefitsList();
  useGetBusinessTypeList();
  useGetCertificatedList();
  useGetCompanyList();
  useGetCompanyPolicyList();
  useGetCountryCodeList();
  useGetDeliveryTermsList();
  useGetDocumentKeyList();

  //? Get Regis List
  useGetRegisList();
  useGetRegisListByAccountId();

  return (
    <ReqAuth>
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        <main className="relative flex h-full w-full flex-col overflow-hidden">
          <Header
            left={
              <div className="flex items-center">
                <div
                  className="grid h-[40px] w-[45px] cursor-pointer place-items-center delay-200 hover:rounded-full hover:bg-primary-foreground"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <Icons.menu className="text-gray-500" />
                </div>
                <div className="flex cursor-pointer items-center gap-x-2" onClick={() => navigate("/")}>
                  <img
                    src="/images/logo.webp"
                    alt="SNC Logo"
                    width={230}
                    height={230}
                    className="h-auto w-[5.5rem] select-none"
                  />
                  <Separator orientation="vertical" className="h-[2rem] bg-foreground" />
                  <div className="flex flex-col">
                    <p className="text-sm font-bold">CUSTOMER REGISTRATION SYSTEM</p>
                    <p className="text-xs text-muted-foreground">Powered by The Center of Digital Expertise (CoDE)</p>
                  </div>
                </div>
              </div>
            }
            right={
              <div className="flex items-center gap-2">
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className={cn("group flex cursor-pointer items-center justify-start gap-2.5")}>
                        <Avatar className="h-6 w-6 cursor-pointer">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 uppercase">
                            {profile?.name?.en?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold uppercase">{profile?.name?.en}</p>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="start" className={cn("w-72")}>
                      <DropdownMenuLabel>
                        <p className="text-sm font-semibold">{profile?.name?.en}</p>
                        <p className="text-xs text-gray-400">
                          {profile?.name?.en} {profile?.role !== "" ? `(${profile?.role})` : ""}
                        </p>
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          localStorage.removeItem(KEY_LOCAL_STORAGE.ICRS_ADMIN_LOCAL_STORAGE);
                          resetAtom();
                          navigate("/login");
                        }}
                      >
                        <Icons.logOut className="h-5 w-5 text-red-500" />
                        <p className="ml-2 text-red-500">ออกจากระบบ</p>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            }
          />
          {/* <div className="flex h-full">
            <Sidebar />
            <div className="w-full p-2">
              <Outlet />
            </div>
          </div> */}
          <section className="flex h-full w-full">
            <article className="h-full">
              <Sidebar />
            </article>
            <article className="h-full w-full p-2">
              <Outlet />
            </article>
          </section>
        </main>
        <footer className="relative flex h-5 w-full items-center justify-center gap-2 border-t">
          <p className="text-xs text-muted-foreground">Copyright © 2023 SNC-The Center of Digital Expertise (CoDE)</p>
          <p className="text-xs text-muted-foreground">All rights reserved.</p>
          <p className="absolute bottom-0 right-0 p-1 text-[10px] font-medium text-muted-foreground">
            {import.meta.env.VITE_VERSION}
          </p>
        </footer>
      </div>
    </ReqAuth>
  );
};

export default RootLayout;
