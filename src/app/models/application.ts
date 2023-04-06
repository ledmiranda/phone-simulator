export interface Application {
  id: string;
  name: string;
  version: string;
  contactInfo: string;
}

export interface ApplicationResponse {
  id: string;
  name: string;
  version: string;
  contact_info: string;
}

export const mapToRequest = ({
  id,
  name,
  version,
  contactInfo,
}: Application): ApplicationResponse => {
  return {
    id,
    name,
    version,
    contact_info: contactInfo,
  };
};

export const mapFromResponse = (data: any): Application[] => {
  const result = data.map(
    ({ id, name, version, contact_info }: ApplicationResponse) => ({
      id,
      name,
      version,
      contactInfo: contact_info,
    })
  );

  return result;
};
