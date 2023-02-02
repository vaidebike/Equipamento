import axios from 'axios';

export class AluguelService {
  private readonly apiURL = 'vaidebike-aluguel-api.herokuapp.com/';

  public async getBikeRentedByCyclistId (cyclistId: string): Promise<any> {
    const endpoint = 'ciclista/aluguel/';

    const response = await axios.get(`${this.apiURL}${endpoint}${cyclistId}`);

    const { data } = response;

    return data;
  }
}
