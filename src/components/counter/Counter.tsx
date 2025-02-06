import { Button } from "@heroui/button";
import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function Counter({
  count,
  setCount,
}: {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}) {
  const intensity = Math.min(count * 2, 100);

  const getBackgroundStyle = () => ({
    background: `linear-gradient(
          to top,
          hsl(200, 70%, ${intensity}%) 0%,
          hsl(200, 70%, 95%) 100%
        )`,
    color: intensity > 50 ? "#333333" : "#222222", // Text color changes based on background intensity
  });
  return (
    <div
      className="flex  w-full flex-col gap-4 justify-center items-center border p-4 rounded-xl  bg-red-400"
      style={getBackgroundStyle()}
    >
      <div>{count}</div>
      <p>Counter</p>
      <div className="flex gap-4 ">
        <Button
          color="primary"
          variant="faded"
          onPress={() =>
            setCount((c) => {
              if (c > 0) {
                return c - 1;
              }
              return c;
            })
          }
        >
          <Minus />
        </Button>
        <Button
          color="primary"
          variant="faded"
          onPress={() => {
            setCount(0);
          }}
        >
          Reset
        </Button>
        <Button
          color="primary"
          variant="faded"
          onPress={() => {
            setCount((c) => {
              return c + 1;
            });
          }}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
