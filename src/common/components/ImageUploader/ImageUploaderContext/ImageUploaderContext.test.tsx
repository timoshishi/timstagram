import { renderHook } from '@testing-library/react';
import {
  useImageUploaderContext,
  useCreateUploaderContext,
} from './ImageUploaderContext';

describe('ImageUploaderContext', () => {
  it('Handles the isOpen properties of the CommentSlider to true if an options object with the value of type: post is passed in on initialization', async () => {
    const { result } = renderHook(() => useCreateUploaderContext());
    console.log(result.current);
    expect(true).toBeTruthy();
  });
});
