import { useCompany } from '../context/company-provider'
import { ComponentInputImage } from './component-input-image'

import componentEnergy from '../assets/component-energy.png'
import componentVibration from '../assets/component-vibration.png'
import { ComponentProps } from './component-props'

export function ComponentAbout() {
  const { assetSelected } = useCompany()
  let imageToRender = ''

  switch (assetSelected.sensorType) {
    case 'energy':
      imageToRender = componentEnergy
      break
    case 'vibration':
      imageToRender = componentVibration
      break
    default:
      break
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <ComponentInputImage imageToRender={imageToRender} />

        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <strong>Tipo de Equipamento</strong>
            <span className="text-[#88929c]">Motor Elétrico (Trifásico)</span>
          </div>

          <div className="border-b border-[#D8DFE6]" />

          <div className="flex flex-col gap-2">
            <strong>Tipo de Equipamento</strong>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full text-white bg-[#2188ff]">
                E
              </span>
              <span className="text-[#88929c]">Elétrica</span>
            </div>
          </div>
        </div>
      </div>

      <ComponentProps />
    </div>
  )
}
