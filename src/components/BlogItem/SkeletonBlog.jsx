import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonBlog = () => {
  return (
    <ContentLoader
      speed={3}
      width={290}
      height={250}
      viewBox="0 0 290 250"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede">
      <rect x="0" y="0" rx="4" ry="4" width="290" height="200" />
      <rect x="0" y="210" rx="4" ry="4" width="150" height="13" />
      <rect x="0" y="230" rx="4" ry="4" width="200" height="20" />
    </ContentLoader>
  );
};

export default SkeletonBlog;
