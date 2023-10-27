import { FC, ChangeEvent, useState } from "react"

import { LocalizedAttribute } from "../LocalizedAttribute"

import { Select } from "#components/ui/Select"
import { SkuWithPrices } from "#providers/SkuListProvider"

interface Props {
  variants: SkuWithPrices[]
  setSku: (sku: SkuWithPrices) => void
}

export const VariantSelector: FC<Props> = ({ variants, setSku }) => {
  const options = variants.map((variant) => [variant.id, variant.name])
  const [value, setValue] = useState(variants[0].code)
  const onSkuChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSku(variants.find((v) => v.code === e.target.value) as SkuWithPrices)
    setValue(e.target.value)
  }

  return options.length > 0 ? (
    <Select
      value={value}
      onChange={onSkuChangeHandler}
      data-test-id="quantity-selector"
    >
      {variants.map((i) => (
        <option key={i.code} value={i.code}>
          {<LocalizedAttribute sku={i} attribute="name" type="variant" />}
        </option>
      ))}
    </Select>
  ) : null
}
