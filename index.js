import OrbitDB from 'orbit-db';
import * as IPFS from 'ipfs';
import 'dotenv/config'
import { connect } from "./config/database.js"
connect()
const ORBIT_DB = process.env.ORBIT_DB
import { BookingData } from "./model/bookingData";
import { MeterData } from "./model/meterData";



async function main() {

    const ipfs = await IPFS.create({
        repo: './ipfs',
        peerId: id,
        start: true,
        EXPERIMENTAL: {
            pubsub: true,
        },
        config: {
            Bootstrap: bootstrapers
        }
    })

    const peers = await ipfs.swarm.peers()
    console.log(`The node now has ${peers.length} peers.`)

    peers.forEach((connection) => console.log(connection.peer))

    const orbitDb = await OrbitDB.createInstance(ipfs, { directory: './orbitdb1' });

    // Create docstore DB
    const docstore = await s.orbitDb.open(ORBIT_DB);
    console.log("Successfully created docstore");

    await s.docstore.load()

    console.log(ipfs.isOnline())
    console.log(await ipfs.bootstrap.list())

    await docstore.events.on('replicated', () => console.log("Replicated Db"))

    // if new data is synched to OrbitDB -> copy to MongoDB

    await docstore.events.on('replicate.progress', async (address, hash, entry, progress, have) => {
        let replizierteDaten = entry.payload.value

        // Wenn replizierte Daten eine EnergieDock Buchung sind, dann mit Booking schema speichern
        if (replizierteDaten.cid !== undefined) {
            // Get user input
            const { _id, booking_id, producer, consumer, energy, cid, doi_hash } = replizierteDaten;

            // Create user in our database
            const bookingData = await BookingData.create({
                _id,
                booking_id,
                producer, 
                consumer,
                energy,
                cid,
                doi_hash          
            });
            console.log("added meterdata: " + _id)
        } 

        // Wenn replizierte Daten ein MQTT Datensatz ist, dann mit Meter Data schema speichern
        if (replizierteDaten.timestamp){
                        // Get user input
                        const { _id, total_produced, total_consumed, timestamp } = replizierteDaten;

                        // Create user in our database
                        const bookingData = await BookingData.create({
                            _id,
                            meter_id,
                            total_produced,
                            total_consumed, 
                            timestamp       
                        });
                        console.log("added meterdata: " + _id)
        }
    })
}

