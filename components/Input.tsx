interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}

const Input = ({id, onChange, value, label, type}: InputProps) => {
  return (
    <div className="relative m-2">
      <input
      value={value}
      onChange={onChange}
      type={type}
      id={id}
 className="
    block
    rounded-md
    outline-none
    px-6
    pt-6
    pb-1
    text-md
    text-white
      bg-neutral-700
    appearance-none
    focus:outline-none
    focus:ring-0
    peer
    "
    placeholder=" "
      />
      <label
        className="
        absolute 
        text-md
     text-zinc-400
        duration-150
         transform
          -translate-y-3 
          scale-75 
          top-4
           z-10
           left-6
        origin-[0]
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3
            "
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
