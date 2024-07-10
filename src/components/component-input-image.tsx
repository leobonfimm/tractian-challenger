import { Inbox } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

export function ComponentInputImage() {
  const [imageUrl, setImageUrl] = useState('')

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setImageUrl(url)
    } else {
      setImageUrl('')
    }
  }

  return (
    <div className="relative self-center">
      <label
        htmlFor="image"
        data-state={!imageUrl}
        className="absolute z-10 opacity-0 data-[state=true]:opacity-100 inset-0 flex items-center justify-center bg-blue-200 rounded-md border-[2px] border-dotted border-blue-500 cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center gap-1 text-blue-500">
          <Inbox size={42} />
          <span>Adicionar imagem do Ativo</span>
        </div>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      <img
        src={imageUrl}
        alt=""
        className="rounded-md w-[326px] h-[226px] object-contain"
      />
    </div>
  )
}
