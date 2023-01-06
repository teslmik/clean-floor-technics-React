import React from 'react';
import { Helmet } from 'react-helmet';

import { useGlobalContext } from '../hook/useGlobalContext';

const Head: React.FC<Record<string, string>> = ({title, description, url, imageUrl}) => {
  const { isWebpImg} = useGlobalContext();

  return (
    <Helmet>
      {title && <title>{title} | Інтернет-магазин прибиральної техніки. Вигідні ціни, висока якість, гарантія</title>}
      {description && <meta name="description" content={description} />}
      {title && <meta property="og:title" content={title} />}
      {url && <meta property="og:url" content={`https://cleanfloor.com.ua${url}`} />}
      {imageUrl && <meta property="og:image" content={`/assets/img/${imageUrl}${isWebpImg ? '.webp' : '.png'}`} />}
    </Helmet>
  )
}

export default Head;