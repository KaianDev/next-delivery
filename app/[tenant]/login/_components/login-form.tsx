"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { z } from "zod"

// Components
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

// Utilities
import { useAuthContext } from "@/contexts/auth"
import { addAuthCookie } from "@/action/auth"

const loginSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email("E-mail inválido"),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(4, "A senha deve conter no mínimo 4 caracteres"),
})

type LoginSchema = z.infer<typeof loginSchema>

interface LoginFormProps {
  tenantSlug: string
}

export const LoginForm = ({ tenantSlug }: LoginFormProps) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { login } = useAuthContext()
  const router = useRouter()

  const handleLoginSubmit = (data: LoginSchema) => {
    const token = "1235sas888"
    login(
      {
        email: data.email,
        name: "Kaian",
      },
      token,
    )
    addAuthCookie(token)
    router.replace(`/${tenantSlug}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLoginSubmit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  autoComplete="email"
                  placeholder="Digite seu e-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomButton type="submit">Entrar</CustomButton>
      </form>
    </Form>
  )
}
