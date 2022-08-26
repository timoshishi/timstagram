# ImageUploader

## Description - A component that forms the base of uploading images to the server

---

### This component is currently used in the following places:

### CreatePostModal

Creates a new post with an image

- Calls the API `/post` POST endpoint. The image is uploaded and processed on the server to save needed data, validation
  and processing.
  - After the image is processed, a signed URL is returned to the client for upload of the cropped image to S3.

### ProfileModal

Creates an avatar image

- Calls the API `/profile/avatar` POST endpoint. The image is uploaded and processed on the server to save needed data,
  validation and processing.
  - Image is sent to S3 directly from server because there is scaling involved and the user cannot upload this directly
    with a signed URL.

### This component consists of two major parts:

---

- **Dropzone** - a component that allows to set images to be viewed in the next component
- **Cropper** - a component that allows you to crop images and upload them to the server

- Component state between these two parts are linked together using the **ImageUploaderContext**

## Dropzone

This component is built on [react-dropzone](https://github.com/react-dropzone/react-dropzone) and allows to set images
to be viewed in the next component.

The Cropper is shown when a file is selected and the "preview" variable is set as a dataURL.

To go back to the dropzone, we call `clearFile` from the context provider to reset the state.

This is accomplished in two places, either when the "Back" button is clicked in the Cropper or on the upload of an
image.

## Cropper

This component is built on [react-easy-crop](https://www.npmjs.com/package/react-easy-crop) and allows a user to crop
and upload images to specified aspect ratios and shapes.

To allow for the caption to be set this component can accept a "hasNextStep" prop.

To allow for a circular or rectangular crop area to be set, this component can accept a cropShape prop.

## ImageUploaderContext

This component is built on [react-context](https://reactjs.org/docs/context.html) and allows for the state of the
component to be shared between the two components.

For this component to work, it **_must_** must be within the ImageUploaderProvider in the component that uses it

Utilizing the state in the component that wraps the ImageUploader component is done by calling the `useImageUploader`
hook.

---

### **TODO**: The processing and validation of images should be done async in a serverless function to reduce the load on the server
