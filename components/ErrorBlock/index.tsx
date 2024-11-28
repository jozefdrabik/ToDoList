import { IErrorBlock } from "@/components/ErrorBlock/prop";

export default function ErrorBlock({ title, message, className }: IErrorBlock) {
  return (
    <div
      className={
        className + " flex gap-8 items-center text-red-600 justify-center"
      }
    >
      <div className="w-12 h-12 text-white bg-red-600 flex rounded-full font-bold text-4xl items-center justify-center">
        !
      </div>
      <div className="error-block-text">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
