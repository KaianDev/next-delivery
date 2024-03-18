"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

const forgetFormSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email("E-mail inválido"),
})

type ForgetFormSchema = z.infer<typeof forgetFormSchema>

export const ForgetForm = () => {
  const form = useForm<ForgetFormSchema>({
    resolver: zodResolver(forgetFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleForgetFormSubmit = (data: ForgetFormSchema) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForgetFormSubmit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput {...field} placeholder="Digite seu e-mail" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton>Enviar</CustomButton>
      </form>
    </Form>
  )
}
