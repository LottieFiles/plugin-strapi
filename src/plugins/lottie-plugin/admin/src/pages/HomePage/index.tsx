/*
 *
 * HomePage
 *
 */

import React from 'react';
import pluginId from '../../pluginId';
// @ts-ignore
import LottieInput from "../../components/Lottie/LottieInputField"
import { Strapi } from '@strapi/strapi';

const HomePage: React. FunctionComponent = (props) => {
  return (
    <div>
      <h1>{pluginId}&apos;s HomePages</h1>
      <p>Happy coding</p>
      <LottieInput attribute={undefined} description={undefined} disabled={undefined} error={undefined} intlLabel={undefined} labelAction={undefined} name={undefined} onChange={undefined} required={undefined} value={undefined}></LottieInput>
    </div>
  );
};

export default HomePage;
