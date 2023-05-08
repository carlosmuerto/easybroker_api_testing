import axios from 'axios';
import { PropertyAPI, PropertyAPIResponse } from './main';
import {describe, expect, afterEach, it, jest} from '@jest/globals';

jest.mock('axios');

describe('PropertyAPI', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return properties on success', async () => {
    const properties: PropertyAPIResponse = {
      content: [
        { title: 'Property A' },
        { title: 'Property B' },
      ],
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: properties });

    const propertyAPI = new PropertyAPI();
    const result = await propertyAPI.getProperties();

    console.log(result)

    expect(result).toEqual(properties);
    expect(axios.get).toHaveBeenCalledWith('https://api.stagingeb.com/v1/properties', propertyAPI['options']);
  });

  it('should return an error on failure', async () => {
    const error = new Error('Something went wrong');

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(error);

    const propertyAPI = new PropertyAPI();
    const result = await propertyAPI.getProperties();

    expect(result).toEqual({ error });
    expect(axios.get).toHaveBeenCalledWith('https://api.stagingeb.com/v1/properties', propertyAPI['options']);
  });
});