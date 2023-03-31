/**
 * Copyright 2022 Design Barn Inc.
 */

export const formatISODate: any = (isoDate: any) => {
  // e.g. 27 May
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(isoDate);
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
};

export const isDotLottieString = (url: string): boolean => {
  if (url.endsWith('.lottie')) return true;
  const basename = url.substring((url.lastIndexOf('/') as number) + 1, url.indexOf('?'));
  const extension = basename.split('.').pop();

  return extension === 'lottie';
};

export const captureBlob: any = () => {
  const lottieElement = document.getElementById('lottie');
  let data;

  if (lottieElement) {
    const svgElement = lottieElement.querySelector('svg');

    if (svgElement) {
      const serializedSvg = new XMLSerializer().serializeToString(svgElement);

      data = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serializedSvg)}`;
    }
  }

  return data;
};
