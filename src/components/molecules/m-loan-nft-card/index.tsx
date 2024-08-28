"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { downloadImageAsFile } from "@/lib/utils/images";
import { ellipseText } from "@/lib/utils/text";
import html2canvas from "html2canvas";
import Image from "next/image";
import React from "react";
import QRCode from "react-qr-code";
//import { PaymentReciepient } from "../../../services/contract/loanClient";

interface Props {
  title?: string;
  url?: string;
  onChange?: (file: File) => void;
  type: "borrower" | "lender";
  PaymentReciepient: string;
  date?: string;
}

const NFTCard: React.FC<Props> = ({
  url,
  title,
  type,
  onChange,
  PaymentReciepient,
  date,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    (async () => {
      if (ref.current) {
        const canvas = await html2canvas(ref.current, {
          allowTaint: true,
          removeContainer: true,
          backgroundColor: "transparent",
        });
        const data = canvas.toDataURL("image/png");
        onChange &&
          (onChange(
            await downloadImageAsFile(data, `${title?.slice(0, 10)}.png`)
          ) as unknown as File);
      }
    })();
  }, [url, title, type, onChange]);

  return (
    <div className="bg-transparent">
      <div
        ref={ref}
        className={`relative z-0 w-full aspect-[16/10] overflow-hidden rounded-[3rem] bg-gradient-to-b ${type.toLocaleLowerCase() == "lender" ? " to-[#E6CAFF] from-[#8a7999]   " : " from-green-600 to-green-700 "}`}
      >
        <div className="bg-black/10 absolute right-[40%] top-[40%] aspect-square w-full rounded-full" />
        <div className="bg-black/10 absolute left-[40%] bottom-[40%] aspect-square w-full rounded-full" />
        <div className="absolute text-white inset-0 z-50 p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <p className="text-[2.5em] font-extrabold">
                {type.toLocaleLowerCase() == "lender" ? "Lender" : "Borrower"}{" "}
                Loan
              </p>
              <Image
                className="w-[15%] object-cover object-left aspect-square p-2 rounded-lg"
                src="/images/full-logo.svg"
                alt="veecerts"
                width={120}
                height={120}
              />
            </div>
            {/**
            <p className="font-medium text-black/60 text-lg">
              {ellipseText(title as string, 30).toUpperCase()}
            </p> */}
          </div>
          <div className="flex items-end justify-between">
            <div className="text-[1em]">
              <div className="py-5 text-[1.3em]">
                <div>{ellipseText(title as string, 30).toUpperCase()}</div>
                <div className="font-extrabold tracking-widest">
                  {PaymentReciepient}
                </div>
              </div>
              <p className="font-extralight">{date}</p>
            </div>
            <div className="flex-1">
              <div className="ml-auto w-[80%] aspect-square border overflow-hidden z-0 rounded-3xl border-black/20 relative">
                {url ? (
                  <div className="bg-white p-4">
                    <QRCode
                      size={256}
                      viewBox={`0 0 256 256`}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={url}
                    />
                  </div>
                ) : (
                  <Skeleton className="w-full aspect-square" />
                )}
                <div className="absolute flex justify-center translate-x-[50%] right-[50%] -translate-y-[50%] top-[50%] z-50">
                  <Image
                    className="bg-white p-1 object-cover object-left w-[50%] aspect-square rounded-lg self-center"
                    src="/images/full-logo.svg"
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
    </div>
  );
};

export default NFTCard;
