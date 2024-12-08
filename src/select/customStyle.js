const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%', // w-full
      backgroundColor: 'transparent', // bg-transparent
      borderColor: state.isFocused ? '#94a3b8' : '#e2e8f0', // border-slate-200, focus:border-slate-400
      color: '#334155', // text-slate-700
      fontSize: '0.75rem', // text-sm (14px)
      borderRadius: '0.375rem', // rounded-md
      minHeight: '34px', // Adjust to match your input height
      height: '34px',    // Total height of the select
      padding: '0',
      transition: 'border-color 300ms ease, box-shadow 300ms ease', // transition duration-300 ease
      boxShadow: state.isFocused ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none', // focus:shadow
      '&:hover': {
        borderColor: '#cbd5e1', // hover:border-slate-300
      },
      '&:focus': {
        outline: 'none', // focus:outline-none
      },
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
      fontSize: '0.70rem',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#94a3b8', // placeholder:text-slate-400
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#1A365D', // Change this color after selection (text-slate-800)
    }),
    
    
  };
  export default customStyles;