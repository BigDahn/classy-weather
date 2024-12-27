


const Input = ({input,onInput,refCon}) => {
  return (
    <div>
      <div>
        <input
          type="text"
          ref={refCon}
          value={input}
          onChange={(e) => {
            onInput(e.target.value)
          }}
        />
      </div>
      
    </div>
  )
}

export default Input
