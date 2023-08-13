import React from 'react';
import { Helmet } from 'react-helmet';

const Head: React.FC<Record<string, string>> = ({title, url, imageUrl}) => {
  return (
    <Helmet>
      {title && <title>{title} | Інтернет-магазин прибиральної техніки. Вигідні ціни, висока якість, гарантія</title>}
      {title && <meta property="og:title" content={title} />}
      {url && <meta property="og:url" content={`https://cleanfloor.com.ua${url}`} />}
      {imageUrl && <meta property="og:image" content={`https://cleanfloor.com.ua/assets/img/${imageUrl}`} />}
    </Helmet>
  )
}

export default Head;