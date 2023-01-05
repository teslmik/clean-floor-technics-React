import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={250}
      max-height={390}
      min-height={250}
      viewBox="0 0 250 390"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede">
      <rect x="15" y="15" rx="4" ry="4" width="220" height="250" />
      <rect x="15" y="280" rx="4" ry="4" width="220" height="44" />
      <rect x="15" y="334" rx="4" ry="4" width="119" height="26" />
      <rect x="154" y="334" rx="4" ry="4" width="80" height="26" />
    </ContentLoader>
  );
};

export default SkeletonLoader;
