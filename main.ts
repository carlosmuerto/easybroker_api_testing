import axios, { AxiosResponse } from 'axios';

interface PropertyAPIResponse {
  content?: Property[]
  error?: Error | unknown
}

interface Property {
  title: string;
  // Add other properties as needed
}

class PropertyAPI {
  private readonly options = {
    method: 'GET',
    url: 'tps://api.stagingeb.com/v1/properties',
    params: { page: '-1', limit: '51' },
    headers: {
      accept: 'application/json',
      'X-Authorization': 'l7u502p8v46ba3ppgvj5y2aad50lb9'
    }
  }

  public async getProperties(): Promise<PropertyAPIResponse> {
    try {
      const response: AxiosResponse<PropertyAPIResponse> = await axios.get('https://api.stagingeb.com/v1/properties', this.options);
      return response.data;
    } catch (error) {
      return {
        error
      };
    }
  }
}

const propertyAPI = new PropertyAPI();
propertyAPI.getProperties().then(data => {
  data.content?.forEach((Property) => {
    console.log(Property.title)
  })
}).catch(error => {
  console.error(error);
});

export {PropertyAPI, PropertyAPIResponse}