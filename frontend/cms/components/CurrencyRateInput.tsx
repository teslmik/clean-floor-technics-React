import React, { useEffect, useState } from "react";
import {
  NumberInputProps,
  NumberSchemaType,
  PatchEvent,
  set,
  useClient,
} from "sanity";

export const CurrencyRateInput = React.forwardRef<
  HTMLInputElement,
  NumberInputProps<NumberSchemaType>
>(({ onChange }, ref) => {
  const client = useClient({ apiVersion: "2023-01-01" });
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      const result = await client.fetch(`*[_type == "config"][0]{ rates }`);

      if (result?.rates?.rate) {
        console.log(result?.rates?.rate);

        setRate(result.rates.rate);
        const patch = PatchEvent.from(set(result.rates.rate));
        onChange(patch);
      }
    };

    fetchRate();
  }, [client, onChange]);

  return <input ref={ref} type="number" value={rate || 0} readOnly />;
});
