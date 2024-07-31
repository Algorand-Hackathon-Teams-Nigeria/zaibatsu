"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { dataURLtoFile } from "@/lib/utils/files";
import { ellipseAddress, formatId } from "@/lib/utils/text";
import { cn } from "@/lib/utils/ui";
import { getAppBaseURL } from "@/lib/utils/urls";
import { LoanQuery } from "@/services/graphql/generated";
import html2canvas from "html2canvas";
import Image from "next/image";
import React from "react";
import QRCode from "react-qr-code";

interface Props {
  variant?: "lender" | "borrower";
  loan?: LoanQuery["loan"];
  onChange?: (file: File) => void;
}

const NFTCard: React.FC<Props> = ({ variant = "borrower", loan, onChange }) => {
  const [imageWidth, setImageWidth] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const captureRenderState = async () => {
    if (ref.current && onChange) {
      const canvas = await html2canvas(ref.current, {
        allowTaint: true,
        removeContainer: true,
        backgroundColor: "transparent",
      });
      const data = canvas.toDataURL("image/png");
      onChange(
        dataURLtoFile(
          data,
          `ZAI ${variant === "lender" ? "L" : "B"}${formatId(Number(loan?.id), 6)}.jpg`,
        ),
      );
    }
  };

  const updateWidth = () => {
    if (ref.current) {
      setImageWidth(ref.current.offsetWidth);
    }
  };

  captureRenderState();

  React.useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    const resizeObserver = new ResizeObserver(() => updateWidth());
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      window.removeEventListener("resize", updateWidth);
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [ref]);

  const handleDownloadImage = async () => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current, {
        allowTaint: true,
        removeContainer: true,
        backgroundColor: "transparent",
      });
      const data = canvas.toDataURL("image/png");
      const file = dataURLtoFile(
        data,
        `ZAI ${variant === "lender" ? "L" : "B"}${formatId(Number(loan?.id), 6)}.jpg`,
      );
      const link = document.createElement("a");

      link.href = URL.createObjectURL(file);
      link.download = file.name;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className="bg-transparent">
      <div
        ref={ref}
        style={{
          borderRadius: `${(ref.current?.clientWidth ?? 1) / 16}px`,
        }}
        className={cn(
          "relative z-0 w-full aspect-[16/10] overflow-hidden bg-gradient-to-bl",
          variant === "borrower"
            ? "from-green-300 via-green-400 to-green-500"
            : "from-fuchsia-200 via-fuchsia-300 to-fuchsia-400",
        )}
      >
        <div className="bg-black/10 absolute right-[40%] top-[40%] aspect-square w-full rounded-full" />
        <div className="bg-black/10 absolute left-[40%] bottom-[40%] aspect-square w-full rounded-full" />
        <div className="absolute text-white inset-0 z-50 p-[6%] flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <p
                style={{
                  fontSize: `${(imageWidth ?? 1) / 20}px`,
                }}
                className="font-extrabold"
              >
                Zaibatsu Loan
              </p>
              <Image
                className="w-[30%] p-2 rounded-lg"
                src="/images/full-logo.svg"
                alt="zaibatsu"
                width={200}
                height={120}
              />
            </div>
            <p
              style={{
                fontSize: `${(imageWidth ?? 1) / 30}px`,
              }}
              className="font-bold text-orange-500 md:text-[1.5vw]"
            >
              {ellipseAddress(loan?.borrower.address, 10).toUpperCase()}
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-[1em] md:text-[1vw]">
              <div
                style={{
                  fontSize: `${(imageWidth ?? 1) / 30}px`,
                }}
                className="py-5 md:text-[2vw]"
              >
                <p>
                  ZAI {variant === "borrower" ? "B" : "L"}-{loan?.encodedId}
                </p>
                <p className="font-extrabold tracking-widest">
                  {formatId(Number(loan?.id ?? "0"), 6)}
                </p>
              </div>
              <p
                style={{
                  fontSize: `${(imageWidth ?? 1) / 40}px`,
                }}
                className="font-semibold"
              >
                {new Date(loan?.lastUpdated).toLocaleDateString()}
              </p>
            </div>
            <div className="flex-1">
              <div className="ml-auto w-[40%] aspect-square flex items-center justify-center border overflow-hidden z-0 rounded-[10%] border-black/20 relative">
                {loan ? (
                  <div className="bg-white p-[8%]">
                    <QRCode
                      size={256}
                      viewBox={`0 0 256 256`}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={getAppBaseURL().concat(`/loans/${loan?.id}`)}
                    />
                  </div>
                ) : (
                  <Skeleton className="w-full aspect-square" />
                )}
                <div className="absolute translate-x-[50%] right-[50%] -translate-y-[50%] top-[50%] z-50">
                  <Image
                    className="bg-white border border-black/10 p-1 rounded-lg"
                    src="/images/icon.svg"
                    alt="veecerts"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={handleDownloadImage}>Downoad</button> */}
    </div>
  );
};

export default NFTCard;
