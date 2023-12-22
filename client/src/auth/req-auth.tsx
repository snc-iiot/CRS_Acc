import { useProfile } from "@/services/hooks/use-profile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const ReqAuth = ({ children }: Props) => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  useEffect(() => {
    if (!profile?.token) {
      navigate("/login");
    }
  }, [profile, navigate]);

  return profile?.token != null ? <>{children}</> : null;
};
