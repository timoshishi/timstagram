import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuOptionGroup,
  MenuItemOption,
  useBreakpointValue,
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

  const iconSize = useBreakpointValue({
    base: '1.5rem',
    md: '2rem',
  });

  return (
    <Menu size={['sm']} isLazy={true} placement='top' matchWidth={true}>
      <MenuButton
        as={IconButton}
        p='0'
        variant='ghost'
        _hover={{
          cursor: 'pointer',
        }}
        _active={{
          cursor: 'pointer',
          bg: 'rgba(0,0,0,0)',
        }}
        _focus={{
          cursor: 'pointer',
          bg: 'rgba(0,0,0,0)',
        }}
        icon={
          <FaExpandArrowsAlt
            fontSize={iconSize}
            fill='white'
            aria-label='change aspect ratio'
          />
        }
      />
      <MenuList minW='14' pb='0.5' pt='2' mb='0.5'>
        <MenuOptionGroup defaultValue={'1:1'} onChange={handleSelect}>
          {ASPECT_RATIOS.map(({ label, value }) => {
            return (
              <MenuItemOption
                key={value}
                minH='1'
                maxH='6'
                value={value}
                p='0'
                minW='14'
                maxW='12'
                mb='.05'
                _hover={{
                  cursor: 'pointer',
                  bg: 'rgba(0,0,0,0)',
                }}
                _active={{
                  cursor: 'pointer',
                  bg: 'rgba(0,0,0,0)',
                }}
                style={{
                  marginLeft: '-0.5rem',
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
