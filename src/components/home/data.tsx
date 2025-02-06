import { useAuth } from "@/hooks/useAuth";
import { BarchartData } from "./barChart";

export function DataView() {
  const { user } = useAuth();

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {user?.email ? (
        <div>
          <div className="flex flex-col gap-2">
            {user?.email && <p className="font-bold">email: {user.email}</p>}
            {user?.name && <p className="font-bold">name: {user.name}</p>}
            {user?.phone && <p className="font-bold">phone: {user.phone}</p>}
            {user?.address && (
              <p className="font-bold">address: {user.address}</p>
            )}
          </div>
        </div>
      ) : (
        <p>no data</p>
      )}
      <BarchartData />
    </div>
  );
}
