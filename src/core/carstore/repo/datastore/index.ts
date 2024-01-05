/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/
import { DataStore } from "@unipackage/datastore"
import { ValueFields } from "@unipackage/utils"
import { Car, CarReplica } from "../../types"
import {
    CarDocument,
    CarSchema,
    CarReplicaDocument,
    CarReplicaSchema,
} from "./model"
import { MongooseDataStore, DatabaseConnection } from "@unipackage/datastore"

/**
 * Class representing a MongoDB datastore for Car entities.
 * Extends the DataStore class with Car and CarDocument.
 * @class
 */
export class CarMongoDatastore extends DataStore<
    ValueFields<Car>,
    CarDocument
> {
    /**
     * Creates an instance of CarMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<ValueFields<Car>, CarDocument>(
                "Car",
                CarSchema,
                connection
            )
        )
    }
}
/**
 * Class representing a MongoDB datastore for CarReplica entities.
 * Extends the DataStore class with CarReplica and CarReplicaDocument.
 * @class
 */
export class CarReplicaMongoDatastore extends DataStore<
    ValueFields<CarReplica>,
    CarReplicaDocument
> {
    /**
     * Creates an instance of CarReplicaMongoDatastore.
     * @param {string} connection - The MongoDB connection.
     * @constructor
     */
    constructor(connection: DatabaseConnection) {
        super(
            new MongooseDataStore<ValueFields<CarReplica>, CarReplicaDocument>(
                "CarReplica",
                CarReplicaSchema,
                connection
            )
        )
    }
}
