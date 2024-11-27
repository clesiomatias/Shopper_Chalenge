import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import getDistance from "./distance.js";
import path from "path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db_file = path.join(__dirname, "database.json");
const defaultData = { drivers: [], rides: [] };
const adapter = new JSONFile(db_file);
const db = new Low(adapter, defaultData);
dotenv.config(); //{path:path.resolve(__dirname,'../../../.env')}
const app = express();
app.use(express.json());
app.use(cors());
const googleMapsApiKey = process.env.GOOGLE_API_KEY;
;
const loadDatabase = async () => {
    await db.read();
    db.data || (db.data = { drivers: [], rides: [] });
    await db.write();
};
loadDatabase();
app.get("/", (req, res) => {
    res.send("Bem-vindo à API!");
});
// @ts-ignore
app.post("/ride/estimate", async (req, res) => {
    const { customer_id, origin, destination } = req.body;
    if (!customer_id || !origin || !destination) {
        return res.status(400).json({
            error: "INVALID_DATA",
        });
    }
    if (origin.trim() === destination.trim()) {
        return res.status(400).json({
            error: "INVALID_DATA",
        });
    }
    try {
        const data = await getDistance({ origin, destination });
        if (!data) {
            return res.status(400).json({
                error: "INVALID_DATA",
            });
        }
        const distanceKm = data.distance;
        const drivers = db.data.drivers;
        const availableDrivers = drivers.filter((driver) => {
            const isAvailable = distanceKm >= driver.min_km;
            return isAvailable;
        }).map((driver) => ({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.car,
            review: driver.review,
            value: (driver.rate_per_km * distanceKm).toFixed(2),
        }));
        if (availableDrivers.length === 0) {
            return res.status(40).json({
                error: "NOT_DRIVER_FOUND",
            });
        }
        return res.status(200).json({
            origin: {
                latitude: data.origin_location.lat,
                longitude: data.origin_location.lng,
            },
            destination: {
                latitude: data.destination_location.lat,
                longitude: data.destination_location.lng,
            },
            distance: data.distance,
            duration: data.duration,
            options: availableDrivers,
            route_response: data.route_response,
        });
    }
    catch (error) {
        console.error("Erro ao calcular rota:", error.message);
        res.status(500).json({
            error: "FAILED_ROUTE",
        });
    }
});
// @ts-ignore
app.patch("/ride/confirm", async (req, res) => {
    const filePath = path.join(__dirname, "data.json");
    const { customer_id, origin, destination, distance, duration, driver, value, } = req.body;
    //Resolvendo pepino de valores que insistem em vir em string!
    const numericDistance = parseFloat(distance);
    const numericValue = parseFloat(value);
    if (!customer_id || !origin || !destination) {
        return res.status(400).json({
            error: "INVALID_DATA",
        });
    }
    if (origin.trim() === destination.trim()) {
        return res.status(400).json({
            error: "INVALID_DATA",
        });
    }
    if (!driver || !driver.id || !driver.name) {
        return res.status(404).json({
            error: "DRIVER_NOT_FOUND",
        });
    }
    if (typeof distance !== "number" || distance <= 0) {
        return res.status(406).json({
            error: { error_code: "INVALID_DISTANCE" },
        });
    }
    try {
        db.data.rides
            .push({
            customer_id,
            origin,
            destination,
            distance: numericDistance,
            duration,
            driver,
            value: numericValue,
            confirmed_at: new Date().toISOString(),
        });
        await db.write();
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Erro ao salvar os dados:", error);
        return { error_code: "INVALID_DATA", error_description: error };
    }
});
//@ts-ignore
app.get("/ride", async (req, res) => {
    const { customer_id, driver_id } = req.query;
    if (!customer_id) {
        return res.status(500).json({
            error: "INVALID_DATA",
        });
    }
    let driverFilter = db.data.drivers;
    if (driver_id) {
        if (driver_id !== '0') {
            const driverExists = db.data.drivers.some(driver => driver.id === Number(driver_id));
            if (!driverExists) {
                return res.status(400).json({
                    error: "INVALID_DRIVER",
                });
            }
            driverFilter = db.data.drivers.filter(driver => driver.id === Number(driver_id));
        }
        else {
            driverFilter = db.data.drivers;
        }
    }
    const rides = db.data.rides.filter(ride => ride.customer_id === customer_id && driverFilter.some(driver => driver.id === ride.driver.id));
    if (rides.length === 0) {
        return res.status(404).json({
            error: "RIDE_NOT_FOUND",
        });
    }
    return res.status(200).json(rides);
});
//@ts-ignore
app.get("/map-image", async (req, res) => {
    const { originLat, originLng, destinationLat, destinationLng } = req.query;
    if (!originLat || !originLng || !destinationLat || !destinationLng) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&path=color:0x0000ff|weight:5|${originLat},${originLng}|${destinationLat},${destinationLng}&markers=color:green|label:A|${originLat},${originLng}&markers=color:red|label:B|${destinationLat},${destinationLng}&key=${apiKey}`;
        const response = await axios.get(mapUrl, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    }
    catch (error) {
        console.error('Erro ao buscar imagem do mapa:', error);
        res.status(500).json({ error: 'Erro ao buscar imagem do mapa' });
    }
});
const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
