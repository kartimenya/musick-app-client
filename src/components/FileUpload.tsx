import React, { ChangeEvent, FC, useRef } from 'react';

interface IFileUpload {
  setFile: (file: Blob) => void;
  accept: string;
  children: React.ReactNode;
}

const FileUpload: FC<IFileUpload> = ({ setFile, accept, children }) => {
  const ref = useRef<any>();

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div onClick={() => ref.current.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        ref={ref}
        onChange={onchange}
      />
      {children}
    </div>
  );
};

export default FileUpload;
