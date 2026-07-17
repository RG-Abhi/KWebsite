import React from 'react';

const BackgroundDecor = () => {
  return (
    <div className="bg-decor-container" aria-hidden="true">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>
      <div className="bg-blob blob-4"></div>
      <div className="bg-blob blob-5" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(165, 28, 48, 0.05) 0%, transparent 70%)', top: '70%', right: '10%' }}></div>
    </div>
  );
};

export default BackgroundDecor;
