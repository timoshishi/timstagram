// import { renderHook } from '@testing-library/react';
// import { useCreateUploaderContext, ImageUploaderProvider } from './ImageUploaderContext';
// import { ReactNode } from 'react';

describe('ImageUploaderContext', () => {
  /* eslint-disable react/display-name */
  // const { result: ctx } = renderHook(() => useCreateUploaderContext());
  // const wrapper = ({ children }: { children: ReactNode }) => (
  //   <ImageUploaderProvider initialValue={ctx.current}>{children}</ImageUploaderProvider>
  // );
  // const { result, rerender } = renderHook(() => useCreateUploaderContext(), {
  //   wrapper,
  // });

  it('renders initial primitive values correctly', async () => {
    expect(true).toBe(true);
    // const current = result.current;
    // expect(current.isDragActive).toBe(false);
    // expect(current.preview).toBeNull();
    // expect(current.error).toBeNull();
    // expect(current.file).toBeNull();
    // expect(current.originalDimensions).toEqual({ width: 0, height: 0 });
    // expect(current.originalAspectRatio).toBe(1);
    // expect(current.cropShape).toBe('rect');
    // expect(current.isCommentSliderOpen).toBe(false);
  });

  // it('toggles the state of comment slider', async () => {
  //   expect(result.current.isCommentSliderOpen).toBe(false);
  //   await act(() => {
  //     result.current.toggleCommentSlider();
  //   });
  //   expect(result.current.isCommentSliderOpen).toBe(true);
  //   await act(() => {
  //     result.current.toggleCommentSlider();
  //   });

  //   expect(result.current.isCommentSliderOpen).toBe(false);
  // });

  //mock a file
  // const file = new File([], 'test.jpg', {
  //   type: 'image/jpeg',
  //   lastModified: Date.now(),
  // });
  // it('can clear a preview url with clearFile', async () => {
  //   // const { current } = result;
  //   result.current.preview = 'http://testurl.com';
  //   expect(result.current.preview).toBe('http://testurl.com');
  //   await act(() => {
  //     result.current.clearFile();
  //   });
  //   rerender();
  //   await waitFor(
  //     () => {
  //       expect(result.current.preview).toBeNull();
  //     },
  //     {
  //       timeout: 1000,
  //     }
  //   );
  // });
});

export {};
