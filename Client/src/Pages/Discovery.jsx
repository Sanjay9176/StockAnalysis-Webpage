import Header from "../Components/Header"
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Thirdsection from "../Components/Thirdsection";
import Contactus from "../Components/Contactus";
export default function Discovery() {
  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/lexpo/discovery", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })
      .then((res) => {
        if (res.data.status === 1) {
          toast.success("WELCOME");
        } else {
          toast.error(res.data.msg || "Unauthorized");
        }
      })
      .catch((err) => {
        if (axios.isCancel) {
          return;
        }
        toast.error("Access denied");
      })
    return () => {
      controller.abort();
    };
  }, [])
  return (
    <>
      <Header />
      <Thirdsection />
      <Contactus />
    </>
  )
}
