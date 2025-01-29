import { ComponentPropsWithoutRef, useId } from 'react'

type Props = { label?: string } & ComponentPropsWithoutRef<'input'>

export const Input = ({ label, id: propsId, ...props }: Props) => {
  const generatedId = useId()

  const id = propsId ?? generatedId

  return (
    <div className="flex flex-col gap-1 flex-1">
      {label && (
        <label htmlFor={id} className="text-base font-medium text-gray-900">
          {label}
        </label>
      )}
      <input
        id={id}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
        {...props}
      />
    </div>
  )
}
