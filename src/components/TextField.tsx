import React from 'react';

const TextField: React.FC<any> = (props) => {
  return (
    <>
      <input
        className="form-control"
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        ref={props.innerref}
        value={props.value}
        id={props.id}
        autoComplete="off"
        {...props}
      />
    </>
  );
};
export default TextField;
