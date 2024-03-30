"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const shippingSchema = z.object({
  zipCode: z.string().min(8, "Campo obrigatório"),
})

type ShippingSchema = z.infer<typeof shippingSchema>

interface ShippingFormProps {
  onShippingSubmit: ({ zipCode }: { zipCode: string }) => void
}

export const ShippingForm = ({ onShippingSubmit }: ShippingFormProps) => {
  const form = useForm<ShippingSchema>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      zipCode: "",
    },
  })

  return (
    <Form {...form}>
      <form
        className="flex gap-4"
        onSubmit={form.handleSubmit(onShippingSubmit)}
      >
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <CustomInput placeholder="Digite seu CEP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton type="submit" hollow className="max-w-14">
          OK
        </CustomButton>
      </form>
    </Form>
  )
}
