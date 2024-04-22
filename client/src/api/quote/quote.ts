import axios, {AxiosResponse} from 'axios';
import {RFQ} from "../../models/RFQ";
import {Quote} from "../../models/Quote";


const API_URL: string = 'http://localhost:3000';

const quoteAPI = {
    fetch: async (): Promise<any[]> => {
        try {
            const response: AxiosResponse<Quote[]> = await axios.get(`${API_URL}/rfqs`);
            return response.data;
        } catch (error) {
            console.error('Error fetching quote:', error);
            throw error;
        }
    },
    createRFQ: async (rfq: RFQ): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                `${API_URL}/rfqs`,
                rfq
            );
            return response.data;
        } catch (error) {
            // @ts-ignore
            if (error.response.status === 404){
                return undefined
            }
            console.error('Error creating quote:', error);
            throw error;
        }
    },
};

export default quoteAPI;