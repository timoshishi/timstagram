import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import { FaExpandArrowsAlt } from 'react-icons/fa';
const ASPECT_RATIOS = [
  { label: '1:1', value: '1' },
  { label: '4:3', value: '0.75' },
  { label: '16:9', value: '1.77' },
];

interface AspectRatioSelectProps {
  setAspectRatio: (num: number) => void;
}

export const AspectRatio = ({ setAspectRatio }: AspectRatioSelectProps) => {
  const handleSelect = (val: string | string[]) => {
    if (typeof val === 'string') {
      setAspectRatio(parseFloat(val));
    }
  };
  return (
    <Menu
      size={['sm']}
      defaultIsOpen={true}
      isLazy={true}
      placement='top'
      matchWidth={true}>
      <MenuButton
        as={IconButton}
        size='sm'
        variant='outline'
        _hover={{
          cursor: 'pointer',
        }}
        _active={{
          cursor: 'pointer',
          bg: 'rgba(0,0,0,0.3)',
        }}
        icon={<FaExpandArrowsAlt fill='white' size='lg' />}
      />
      <MenuList minW='14' pb='0' pt='4'>
        <MenuOptionGroup defaultValue={'1:1'} onChange={handleSelect}>
          {ASPECT_RATIOS.map(({ label, value }) => {
            return (
              <MenuItemOption
                key={value}
                minH='1'
                maxH='2'
                value={value}
                p='0'
                minW='0'
                maxW='12'
                _hover={{
                  cursor: 'pointer',
                  bg: 'telegram.200',
                }}
                style={{
                  marginLeft: '-1rem',
                  fontSize: '1rem',
                  fontWeight: 'semibold',
                }}>
                {label}
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
