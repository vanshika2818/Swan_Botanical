import { Helmet } from "react-helmet";

interface ProductSchemaProps {
  product: {
    id: string | number;
    name: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    ingredients?: string[];
    category?: string;
  };
}

export const ProductSchema = ({ product }: ProductSchemaProps) => {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "Swan Botanicals"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Swan Botanicals"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews,
      "bestRating": 5,
      "worstRating": 1
    },
    "category": product.category || "Skincare",
    "additionalProperty": product.ingredients?.map(ingredient => ({
      "@type": "PropertyValue",
      "name": "Ingredient",
      "value": ingredient
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
}

export const OrganizationSchema = ({ 
  name = "Swan Botanicals", 
  description = "Premium natural skincare products with AYUSH-certified botanical ingredients",
  url = "https://swanbotanicals.com"
}: OrganizationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "description": description,
    "url": url,
    "logo": `${url}/logo.png`,
    "sameAs": [
      "https://instagram.com/swanbotanicals",
      "https://tiktok.com/@swanbotanicals"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+91-1234567890",
      "email": "hello@swanbotanicals.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};