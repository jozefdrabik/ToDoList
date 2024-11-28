import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { IBackIcon } from "@/components/BackIcon/prop";

export default function BackIcon({ link }: IBackIcon): React.ReactElement {
  return (
    <Link href={link} className="underline font-semibold flex items-center ">
      <ArrowLeftIcon className="w-5 h-5 mr-2" />
      Back
    </Link>
  );
}
