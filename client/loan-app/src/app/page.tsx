import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          style: {
            margin: "10px",
            padding: "10px",
            display: "inline-flex",
            fontSize: "14px",
            zIndex: 999999,
          },
          duration: 4000,
          error: {
            style: {
              background: "red",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "red",
            },
          },
          success: {
            style: {
              background: "green",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "green",
            },
          },
        }}
      />
    </>
  );
}
