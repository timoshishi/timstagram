import { useCallback } from 'react';
const MEGABYTE = 1000000;
const MAX_MEGABYTES = 5;

export type OnDrop = (files: File[]) => void;

export const onDrop: OnDrop = useCallback((acceptedFiles) => {
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      console.log(binaryStr);
    };
    reader.readAsArrayBuffer(file);
  });
}, []);
