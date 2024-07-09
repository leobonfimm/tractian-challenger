import { RouterIcon } from '../assets/router'
import { SensorIcon } from '../assets/sensor'
import { useCompany } from '../context/company-provider'

export function ComponentProps() {
  const { assetSelected } = useCompany()

  return (
    <div className="w-full border-t border-[#D8DFE6] flex py-6">
      {assetSelected.sensorId && assetSelected.gatewayId && (
        <>
          <div className="flex flex-1 flex-col gap-2">
            <strong>Sensor</strong>
            <span className="flex items-center text-[#88929c] gap-2">
              <SensorIcon />
              {assetSelected.sensorId}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <strong>Receptor</strong>
            <span className="flex items-center text-[#88929c] gap-2">
              <RouterIcon />
              {assetSelected.gatewayId}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
