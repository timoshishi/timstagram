import { Link, Text, chakra, Flex } from '@chakra-ui/react';
import { Fragment, ReactElement } from 'react';

interface DescriptionProps {
  postBody: string;
  postId: string;
}
const renderWord = (word: string): ReactElement => {
  const firstChar: string = word[0];
  const restOfWord: string = word.slice(1);
  if (firstChar === '#') {
    return (
      <>
        {' '}
        <Link color='teal.500' href={`/h/${restOfWord}`}>
          {word}
        </Link>
      </>
    );
  }
  if (firstChar === '@') {
    return (
      <>
        {' '}
        <Link color='teal.500' href={`/${restOfWord}`}>
          {word}
        </Link>
      </>
    );
  } else {
    return <chakra.span> {word}</chakra.span>;
  }
};

export const Description = ({ postBody, postId }: DescriptionProps) => (
  <Flex justifyContent={'space-between'}>
    <Text fontSize='md'>
      {postBody.split(' ').map((word, i) => (
        <Fragment key={`${postId}-${i}-${word}`}>{renderWord(word)}</Fragment>
      ))}
    </Text>
  </Flex>
);
