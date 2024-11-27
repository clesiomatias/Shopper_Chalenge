import dotenv from "dotenv"
import path from "path"
import axios from 'axios'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();//{path:path.resolve(__dirname,'../../../.env')}

interface Addresses{
    origin: string;
    destination: string;
}
interface OuputData{
    distance: number;
    duration: string;
    destination_location:{
        lat: number;
        lng: number;
    };
    origin_location:{
        lat: number;
        lng: number;
    };
    route_response: Object;
}


const getDistance = async (addresses: Addresses) => {
    try{
        const apiKey = process.env.GOOGLE_API_KEY;        
              

        const url = `https://maps.googleapis.com/maps/api/directions/json?unit=imperial&origin=${addresses.origin}&destination=${addresses.destination}&key=${apiKey}`;
        
        const response = await axios.get(url);
        
        /// Tratando o valor da distância
        const textDistance = response.data.routes[0].legs[0].distance.text;

        const convertDistance = (textDistance:String) => {
            
            const normalized = textDistance                 
                .replace(",", "");
             
            return parseFloat(normalized);
        };
       
        const ouputData: OuputData = {
            distance : convertDistance(textDistance),
            duration: response.data.routes[0].legs[0].duration.text,
            destination_location: {
                lat: response.data.routes[0].legs[0].end_location.lat,
                lng: response.data.routes[0].legs[0].end_location.lng
                            
            },
            origin_location: {
                lat: response.data.routes[0].legs[0].start_location.lat,
                lng: response.data.routes[0].legs[0].start_location.lng
            },
            route_response: response.data
        }
       

        return ouputData;
    } catch (error) {
        console.error(error);
    }   
}

export default getDistance;
