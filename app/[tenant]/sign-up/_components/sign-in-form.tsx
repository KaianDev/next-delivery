"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Components
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

const signUpSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, "O nome deve conter pelo menos um caractere"),
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email("E-mail inválido"),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(4, "A senha deve conter no mínimo 4 caracteres"),
})

type SignUpSchema = z.infer<typeof signUpSchema>

export const SignInForm = () => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const handleSignUpSubmit = (data: SignUpSchema) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignUpSubmit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  autoComplete="name"
                  placeholder="Digite seu nome"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <CustomButton type="submit">Cadastrar</CustomButton>
      </form>
    </Form>
  )
}
