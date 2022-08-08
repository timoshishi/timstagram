import dayjs from './dateFormatter';

describe('dateFormatter', () => {
  it('extends dayjs with the human readable "relativeTime" plugin', () => {
    const coupleSeconds = dayjs(new Date()).fromNow();
    expect(coupleSeconds).toEqual('a few seconds ago');
    const oneMonth = dayjs(new Date()).subtract(1, 'month').fromNow();
    expect(oneMonth).toEqual('a month ago');
  });
});
