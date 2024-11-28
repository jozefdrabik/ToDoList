export interface IButton {
  onClick?: () => void;
  label: string;
  secondary?: boolean;
  type?: "submit" | "reset" | "button";
  className?: string;
}
