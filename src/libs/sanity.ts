import SanityClient from "next-sanity-client";

const sanityClient = new SanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET as string,
  useCdn: process.env.NODE_ENV === "production",
});

/* client.fetch({
  query: `[_type == 'post']`,
  config: {
    cache: "force-cache",
    next: { revalidate: 60 },
  },
});
 */

export default sanityClient;
