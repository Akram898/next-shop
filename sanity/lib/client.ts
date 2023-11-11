import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: 'skf2JCEKEMn638CRXCCEk3fulHkyNxe5U6afp5VMKJoSNnNLKioVyUg0ypP89TVeizAWpUQlEX8RErzkpJcaLqAwRh8sbjKsxueYfCdSj6rmMcB5qWpvpHlQf3dDrNwWBLTjGB5R5KI584RqvjlFWrtdnCyUE7EUvCNLIJ8V3ujNZ9rJUuft',
})
