import React from 'react';
import { render, waitFor, renderHook, act } from '@src/test-utils';
import '@testing-library/jest-dom';
import {
  ImageUploaderProvider,
  useCreateUploaderContext,
  UseImageUploaderReturn,
} from '../ImageUploaderContext';
import { Cropper } from '@components/ImageUploader/Cropper';
import userEvent from '@testing-library/user-event';
import { handleCroppedImage } from '@components/ImageUploader/imageUploader.functions';

describe('Cropper', () => {
  it('should render with an image  the control buttons and three svg buttons', () => {
    const {
      result: { current: initialValues },
    } = renderHook(() => useCreateUploaderContext(), {});

    initialValues.preview = '/storybook/aspect-16-9.jpg';
    const res = render(
      <ImageUploaderProvider initialValue={initialValues}>
        <Cropper handleCroppedImage={handleCroppedImage} />
      </ImageUploaderProvider>
    );
    expect(res.getByRole('img')).toBeInTheDocument();
    expect(res.getByText('Cancel')).toBeInTheDocument();
    expect(res.getByText('Next')).toBeInTheDocument();
    expect(res.getByLabelText('zoom in')).toBeInTheDocument();
    expect(res.getByLabelText('rotate image')).toBeInTheDocument();
    expect(res.getByLabelText('change aspect ratio')).toBeInTheDocument();
  });
  it('hovering the zoom icon should show a thumb slider when hovered and disappear after unhovering', async () => {
    const {
      result: { current: initialValues },
    } = renderHook(() => useCreateUploaderContext(), {});
    const user = userEvent.setup();
    initialValues.preview = '/storybook/aspect-16-9.jpg';
    const { queryByLabelText, getByLabelText } = render(
      <ImageUploaderProvider initialValue={initialValues}>
        <Cropper handleCroppedImage={handleCroppedImage} />
      </ImageUploaderProvider>
    );
    expect(getByLabelText('zoom in')).toBeInTheDocument();
    expect(queryByLabelText('zoom slider')).toBeNull();
    await user.hover(getByLabelText('zoom in'));
    await waitFor(() =>
      expect(queryByLabelText('zoom slider')).toBeInTheDocument()
    );
    await user.unhover(getByLabelText('zoom in'));
    await waitFor(() =>
      expect(getByLabelText('zoom slider')).toBeInTheDocument()
    );
  });

  it('should show a menu when clicking on the aspect ratio element that has 3 options', async () => {
    const {
      result: { current: initialValues },
    } = renderHook(() => useCreateUploaderContext(), {});
    const user = userEvent.setup();
    initialValues.preview = '/storybook/aspect-16-9.jpg';
    const { getByLabelText, queryByText, getByText } = render(
      <ImageUploaderProvider initialValue={initialValues}>
        <Cropper handleCroppedImage={handleCroppedImage} />
      </ImageUploaderProvider>
    );
    const aspectRatioButton = getByLabelText('change aspect ratio');
    expect(aspectRatioButton).toBeInTheDocument();

    expect(queryByText('1:1')).toBeNull();
    await act(async () => {});
    await user.click(aspectRatioButton);
    await waitFor(() => expect(getByText('1:1')).toBeInTheDocument());
    expect(queryByText('16:9')).toBeInTheDocument();
    expect(getByText('4:3')).toBeInTheDocument();
    await user.click(getByText('1:1'));
    await waitFor(() => expect(queryByText('1:1')).not.toBeInTheDocument());
  });

  it('should not have an image on the page if the cancel button is clicked', async () => {
    const {
      result: { current: initialValues },
    } = renderHook(() => useCreateUploaderContext(), {});
    const user = userEvent.setup();
    initialValues.preview = '/storybook/aspect-16-9.jpg';
    const { queryByRole, getByText } = render(
      <ImageUploaderProvider initialValue={initialValues}>
        <Cropper handleCroppedImage={handleCroppedImage} />
      </ImageUploaderProvider>
    );

    const cancelButton = getByText('Cancel');
    const previewImage = queryByRole('img');
    const clearFile = jest.spyOn(initialValues, 'clearFile');

    expect(previewImage).toBeInTheDocument();
    await user.click(cancelButton);
    expect(clearFile).toHaveBeenCalledTimes(1);
  });
});
