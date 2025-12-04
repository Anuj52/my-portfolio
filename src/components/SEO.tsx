import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PERSONAL_INFO } from '../constants';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords
}) => {
    const siteTitle = title ? `${title} | ${PERSONAL_INFO.name}` : `${PERSONAL_INFO.name} | Portfolio`;
    const siteDescription = description || `Portfolio of ${PERSONAL_INFO.name}, a software engineer specializing in building exceptional digital experiences.`;
    const siteKeywords = keywords || "portfolio, software engineer, developer, react, typescript, web development";

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <meta name="keywords" content={siteKeywords} />
            <meta name="author" content={PERSONAL_INFO.name} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content="/og-image.png" /> {/* Ensure you have an image at this path */}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={siteDescription} />
            <meta property="twitter:image" content="/og-image.png" />
        </Helmet>
    );
};

export default SEO;
