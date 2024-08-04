import { currencyformat } from "@/components/util";

function Expenses({ color, title, amount }) {
  return (
    <button className="hover">
      <div
        key="outermost container"
        className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
      >
        <div key="inner container" className="flex items-center gap-2">
          <div
            key="last container"
            className="w-[25px] h-[25px] rounded-full "
            style={{ backgroundColor: color }}
          />
          <h4 className="capitalize"> {title} </h4>
        </div>
        <p> {currencyformat(amount)} </p>
      </div>
    </button>
  );
}

export default Expenses;
