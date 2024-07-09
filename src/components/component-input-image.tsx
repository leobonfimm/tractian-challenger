interface ComponentInputImageProps {
  imageToRender: string
}
export function ComponentInputImage({
  imageToRender,
}: ComponentInputImageProps) {
  return (
    <>
      <img
        src={imageToRender}
        alt=""
        className="rounded-md w-[326px] h-[226px]"
      />
      {/* <input type="file" /> */}
    </>
  )
}
