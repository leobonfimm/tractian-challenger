import { Zap } from 'lucide-react'
import { useCompany } from '../../context/company-provider'

export function ComponentDetails() {
  const { assetSelected } = useCompany()

  return (
    <div className="flex flex-1 flex-col rounded-md border border-[#D8DFE6] ">
      <div className="flex items-center gap-2 border-b border-[#D8DFE6] px-4 py-[14px]">
        <h1 className="font-semibold leading-5 text-xl">
          {assetSelected.name}
        </h1>
        {assetSelected.sensorType === 'energy' && (
          <Zap
            data-alert={assetSelected.status === 'alert'}
            className="text-green-400 data-[alert=true]:text-red-500 w-4 h-4"
          />
        )}
        {assetSelected.sensorType === 'vibration' && (
          <div
            data-alert={assetSelected.status === 'alert'}
            className="flex bg-green-400 data-[alert=true]:bg-red-500 w-2 h-2 rounded-full"
          />
        )}
      </div>
    </div>
  )
}
