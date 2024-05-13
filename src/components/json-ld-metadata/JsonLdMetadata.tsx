import React from 'react';

interface JsonLdMetadataProps {
  jsonLd: JSON;
}

export const JsonLdMetadata = ({ jsonLd }: JsonLdMetadataProps) => {
  const jsonObject = JSON.parse(`${jsonLd}`);

  const jsonMetadata = JSON.stringify(jsonObject, null, 0);
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: `${jsonMetadata}`,
      }}
    />
  );
};
