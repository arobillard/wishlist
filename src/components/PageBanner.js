import React from 'react';

const PageBanner = ({ pageTitle, desc, descAfter, img }) => {
  return(
    <header
      className={`banner-page${desc || descAfter ? ' banner-page-w-desc' : ''}${img ? ' banner-page-w-img' : ''}`}
      style={img ? { backgroundImage: 'linear-gradient(to bottom, #0000, #0009), url(' + img + ')' } : null }
    >
      <h1>{pageTitle}</h1>
      {desc ? <p>{desc}</p> : null }
    </header>
  )
}

export default PageBanner;