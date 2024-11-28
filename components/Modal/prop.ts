import React from "react";

export interface IModal {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}
