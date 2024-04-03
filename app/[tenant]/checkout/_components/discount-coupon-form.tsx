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

interface DiscountCouponFormProps {
  onSubmit: (coupon: string) => void
}

const discountCouponSchema = z.object({
  coupon: z
    .string({ required_error: "Campo obrigatório" })
    .transform((value) => value.toUpperCase()),
})

type DiscountCouponSchema = z.infer<typeof discountCouponSchema>

export const DiscountCouponForm = ({ onSubmit }: DiscountCouponFormProps) => {
  const form = useForm<DiscountCouponSchema>({
    resolver: zodResolver(discountCouponSchema),
  })

  const handleFormSubmit = ({ coupon }: DiscountCouponSchema) => {
    onSubmit(coupon)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex gap-6"
      >
        <FormField
          control={form.control}
          name="coupon"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <CustomInput
                  {...field}
                  placeholder="Tem um cupom? Digite aqui"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton hollow type="submit" className="max-w-14">
          OK
        </CustomButton>
      </form>
    </Form>
  )
}
