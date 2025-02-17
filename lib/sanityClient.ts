import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,        
  apiVersion: "2025-01-15",
  useCdn: false, 
  token: process.env.SANITY_API_TOKEN,                    
});
