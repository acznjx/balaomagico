// src/components/seo/LocalBusinessJsonLd.tsx

import { CONTACT, SITE } from "@/config/site";

/**
 * Dados estruturados (JSON-LD) da empresa para o Google: nome, telefone,
 * região atendida e redes. Ajuda a aparecer com mais informações na busca
 * e no Google Maps.
 *
 * Segurança: o JSON é gerado só a partir da configuração do site (nada vem do
 * usuário) e o "<" é escapado, como recomenda a documentação do Next, para que
 * nenhum texto consiga fechar a tag <script> e injetar código.
 */
export default function LocalBusinessJsonLd() {
  const sameAs = [CONTACT.instagramUrl, CONTACT.facebookUrl].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}${SITE.logo}`,
    logo: `${SITE.url}${SITE.logo}`,
    telephone: CONTACT.internationalPhone,
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.state,
      addressCountry: "BR",
    },
    areaServed: CONTACT.serviceArea,
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
