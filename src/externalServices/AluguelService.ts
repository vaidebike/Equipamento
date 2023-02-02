import axios from "axios";
import { notFound, serverError } from "../helpers/responseHelpers";

export class AluguelService {
  private readonly apiURL = "https://vaidebike-aluguel-api.herokuapp.com/";

  public async getBikeRentedByCyclistId(cyclistId: string): Promise<any> {
    const endpoint = "ciclista/aluguel/";

    const res = await axios.get(`${this.apiURL}${endpoint}${cyclistId}`);

    if (res.status !== 200) {
      return -1;
    } else {
      const { data } = res;

      return data;
    }
  }
}
