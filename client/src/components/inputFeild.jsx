export const renderFeild = ({
    label,
    meta,
    input,
    type,
    placeholder,
    disable = false,
    
  }) => {
    return (
      <div className="w-full">
        <label className="font-bold text-sm mb-2 ml-1">{label}</label>
        <div>
          <input
            disabled={disable}
            className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder={placeholder}
            type={type}
            {...input}
          />
          {meta.touched && meta.error ? (
            <div className=" text-xs text-red-600 italic ">{meta.error}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };


 