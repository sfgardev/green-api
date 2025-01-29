import { ComponentPropsWithoutRef } from 'react'

type Props = {} & ComponentPropsWithoutRef<'button'>

export const Button = ({ children, ...props }: Props) => {
  return (
    <button
      className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  )
}
