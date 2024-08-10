import React from 'react';

import priceList from '/assets/docs/PriceListTruvox_2024.pdf';

export const PriceList: React.FC = () => {
  return (
    <div className='priceList'>
      <iframe src={priceList} width="100%" height="750px" title='priseList' />
    </div>
  )
}
