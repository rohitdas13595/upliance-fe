"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Info } from "lucide-react";
import { Button } from "@heroui/button";
import { Infer } from "../auth/signup/signupForm";
import { InputFieldSign } from "../auth/common/fields";
import { OtpInput } from "../auth/common/otp";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const UserSignInSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, { message: "Name is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine(
      (value) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value);
      },
      {
        message: "Phone number must be 10 digits",
      }
    ),
  address: z.string().min(1, { message: "Address is required" }),
});

export function UserForm() {
  //   const client = new QueryClient();
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>();

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(UserSignInSchema),
    values: {
      email: user?.email ?? "",
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    },
  });
  console.log("user..................................", user);
  const verifyOtp = async () => {
    setLoading(true);
    // try {
    //   if (!otp || otp.length !== 6 || otp !== "000000") {
    //     toast.error("Invalid OTP");
    //     return;
    //   }
    //   if (!email) {
    //     toast.error("Email not found");
    //     return;
    //   }
    //   const res = await verifyUserOtp(otp, email);
    //   console.log("res.................................", res);
    //   if (res) {
    //     setOtp("");
    //     toast.success("OTP verified successfully");
    //     router.push("/user");
    //   } else {
    //     toast.error("Error verifying OTP");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Something went wrong, please try again later");
    // } finally {
    //   setLoading(false);
    // }
  };

  const onSubmit = async (values: Infer<typeof UserSignInSchema>) => {
    setLoading(true);
    console.log("Candidate Sign in form values", values);
    try {
      const userData = {
        id: user?.id,
        email: values.email,
        name: values.name,
        phone: values.phone,
        address: values.address,
      };
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again later");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full bg-gray-900 p-4">
      <h2 className="text-2xl font-bold">User Data</h2>
      {showOtp ? (
        <div className="w-full flex-col gap-6 flex items-center justify-center py-4">
          <div className="flex gap-4 items-center justify-center text-yellow">
            <Info />
            <span>{`Enter the test otp: 000000, sent to ${
              email ?? "email"
            }`}</span>
          </div>
          <OtpInput
            value={otp}
            onChange={(value) => {
              setOtp(value);
            }}
            autoFocus={false}
          />
          <Button
            onPress={() => {
              verifyOtp();
            }}
            type="button"
            disabled={loading}
            isLoading={loading}
            style={{ cursor: "pointer", width: "100%", marginTop: "1rem" }}
            className="text-white  bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center justify-center"
          >
            {"Verify"}
          </Button>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-4 items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit, (error) => {
              console.error(error);
            })}
            className="flex flex-col gap-4 max-w-[800px] w-full justify-center items-center"
          >
            <InputFieldSign
              register={register}
              name="email"
              type="email"
              label="Email Id*"
              error={errors.email}
            />
            <InputFieldSign
              register={register}
              name="name"
              type="text"
              label="Name*"
              error={errors.name}
            />
            <InputFieldSign
              register={register}
              name="phone"
              type="text"
              label="Phone*"
              error={errors.phone}
            />
            <InputFieldSign
              register={register}
              name="address"
              type="text"
              label="Address"
              error={errors.address}
            />

            <Button
              type="submit"
              disabled={loading}
              isLoading={loading}
              style={{ cursor: "pointer", width: "100%", marginTop: "1rem" }}
              className="text-white  bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 items-center justify-center"
            >
              Save
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
