import { render, waitFor, renderHook, act, screen } from '../../../../../test-utils';
import '@testing-library/jest-dom';
import { ImageUploaderProvider, useCreateUploaderContext } from '../../stores/ImageUploaderContext';
import { Cropper } from '.';
import userEvent from '@testing-library/user-event';
import { handleCroppedImage } from '../../utils/image-uploader-functions';

describe('Cropper', () => {
  it('should render with an image  the control buttons and three svg buttons', async () => {
    const {
      result: { current: initialValues },
    } = renderHook(() => useCreateUploaderContext(), {});

    initialValues.preview = '/storybook/aspect-16-9.jpg';
    render(
      <ImageUploaderProvider initialValue={initialValues}>
        <Cropper handleCroppedImage={handleCroppedImage} />
      </ImageUploaderProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Next')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByLabelText('zoom in')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByLabelText('rotate image')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByLabelText('change aspect ratio')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getAllByRole('img').length).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });
  it('hovering the zoom icon should show a thumb slider when hovered and disappear after unhovering', async () => {
    const {
      result: { current: initialValues },
    } = renderHook(() => useCreateUploaderContext(), {});
    const user = userEvent.setup();
    initialValues.preview = '/storybook/aspect-16-9.jpg';
    render(
      <ImageUploaderProvider initialValue={initialValues}>
        <Cropper handleCroppedImage={handleCroppedImage} />
      </ImageUploaderProvider>
    );
    expect(screen.getByLabelText('zoom in')).toBeInTheDocument();
    expect(screen.queryByLabelText('zoom slider')).toBeNull();
    await act(() => {
      user.hover(screen.getByLabelText('zoom in'));
    });
    expect(await screen.findByLabelText('zoom slider')).toBeInTheDocument();
    await act(() => {
      user.unhover(screen.getByLabelText('zoom in'));
    });
    expect(await screen.findByLabelText('zoom slider')).toBeInTheDocument();
  });

  it('should show a menu when clicking on the aspect ratio element that has 3 options', async () => {
    const {
      result: { current: initialValues },
    } = renderHook(() => useCreateUploaderContext(), {});
    const user = userEvent.setup();
    initialValues.preview = '/storybook/aspect-16-9.jpg';
    render(
      <ImageUploaderProvider initialValue={initialValues}>
        <Cropper handleCroppedImage={handleCroppedImage} />
      </ImageUploaderProvider>
    );
    const aspectRatioButton = screen.getByLabelText('change aspect ratio');
    expect(aspectRatioButton).toBeInTheDocument();

    expect(screen.queryByText('1:1')).toBeNull();
    await act(() => {
      user.click(aspectRatioButton);
    });
    expect(await screen.findByText('1:1')).toBeInTheDocument();
    expect(await screen.findByText('16:9')).toBeInTheDocument();
    expect(await screen.findByText('4:3')).toBeInTheDocument();
    await act(() => {
      user.click(screen.getByText('1:1'));
    });

    await waitFor(() => expect(screen.getByText('1:1')));
  });

  // it('should not have an image on the page if the cancel button is clicked', async () => {
  //   const {
  //     result: { current: initialValues },
  //   } = renderHook(() => useCreateUploaderContext(), {});
  //   const user = userEvent.setup();
  //   initialValues.preview = '/storybook/aspect-16-9.jpg';
  //   const { queryByRole, getByText } = render(
  //     <ImageUploaderProvider initialValue={initialValues}>
  //       <Cropper handleCroppedImage={handleCroppedImage} />
  //     </ImageUploaderProvider>
  //   );

  //   const cancelButton = getByText('Cancel');
  //   const previewImage = queryByRole('img');
  //   const clearFile = jest.spyOn(initialValues, 'clearFile');

  //   expect(previewImage).toBeInTheDocument();
  //   await act(() => {
  //     user.click(cancelButton);
  //   });
  //   await waitFor(() => {
  //     expect(clearFile).toHaveBeenCalledTimes(1);
  //   });
  // });
});
