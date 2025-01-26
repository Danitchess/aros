import Head from 'next/head';

const MetaTags = ({
  title = "Aros Watch - Personnalisation de montres",
  description = "Découvrez la boutique Aros Watch et personnalisez votre montre unique.",
  keywords = "Aros, Aros Watch, montre personnalisée, montre personnalisable, boutique en ligne, design de montres",
  ogTitle = "Aros Watch",
  ogDescription = "Personnalisation de montres",
  ogUrl = "https://www.aroswatch.be",
  ogImage = "/public/aros.JPG",
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={ogTitle} />
    <meta property="og:description" content={ogDescription} />
    <meta property="og:url" content={ogUrl} />
    <meta property="og:image" content={ogImage} />
  </Head>
);

export default MetaTags;
