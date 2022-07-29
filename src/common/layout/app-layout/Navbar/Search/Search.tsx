import { useState, useRef } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Box,
  useOutsideClick,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

import { NavbarIcon } from '../NavbarLinks';
import { CloseIcon } from '@chakra-ui/icons';
interface ISearchProps {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
}
export const Search = ({ isFocused, setIsFocused }: ISearchProps) => {
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  useOutsideClick({
    ref: inputRef,
    handler: () => setIsFocused(false),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <Box>
      {isFocused ? (
        <Flex
          align='center'
          p={[0, 4, 5]}
          borderRadius='sm'
          role='group'
          cursor='pointer'
          ref={inputRef}>
          <InputGroup>
            <Input
              placeholder={'Search'}
              my='auto'
              size='sm'
              value={value}
              onChange={handleChange}
            />
            <InputRightElement
              mb={1}
              children={
                value ? (
                  <CloseIcon
                    blockSize={8}
                    onClick={() => {
                      setIsFocused(false);
                      setValue('');
                    }}
                  />
                ) : (
                  <FiSearch />
                )
              }
            />
          </InputGroup>
        </Flex>
      ) : (
        <NavbarIcon
          icon={FiSearch}
          key='search'
          name='Search'
          onClick={() => setIsFocused(true)}
        />
      )}
    </Box>
  );
};
