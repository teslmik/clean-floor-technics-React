import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoader = () => (
  <ContentLoader
    speed={2}
    width={220}
    height={390}
    viewBox="0 0 220 390"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{ gap: '5px' }}>
    <rect x="15" y="15" rx="4" ry="4" width="220" height="250" />
    <rect x="15" y="280" rx="4" ry="4" width="220" height="44" />
    <rect x="15" y="334" rx="4" ry="4" width="119" height="26" />
    <rect x="154" y="334" rx="4" ry="4" width="80" height="26" />
  </ContentLoader>
);

export default SkeletonLoader;
