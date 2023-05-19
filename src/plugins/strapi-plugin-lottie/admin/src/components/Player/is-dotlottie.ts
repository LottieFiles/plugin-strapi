/**
 * Copyright 2022 Design Barn Inc.
 */

export const isDotLottieString = (url: string): boolean => {
  if (url.endsWith('.lottie')) return true;
  const basename = url.substring((url.lastIndexOf('/') as number) + 1, url.indexOf('?'));
  const extension = basename.split('.').pop();

  return extension === 'lottie';
};
