interface JsonLdMetadataProps {
  jsonLd: string;
}

export const JsonLdMetadata = ({ jsonLd }: JsonLdMetadataProps) => {
  try {
    JSON.parse(jsonLd);
  } catch (error) {
    console.error('JSON-LD is not valid JSON', error);
    return null;
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
};
