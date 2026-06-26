"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/shared/field-error";
import { useLogin } from "@/hooks/use-auth";
import { loginSchema, type LoginFormValues } from "@/schemas/auth";

export function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@acowale.com",
      password: "Admin@123456",
    },
  });

  const onSubmit = handleSubmit((values) => {
    login.mutate(values);
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" autoComplete="current-password" {...register("password")} />
        <FieldError message={errors.password?.message} />
      </div>
      <Button type="submit" className="w-full" disabled={login.isPending}>
        <LogIn className="h-4 w-4" />
        {login.isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
