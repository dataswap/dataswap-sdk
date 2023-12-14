// Define an index signature to represent a structure of unknown type
type unknownStruct = {
    [key: string]: any;
};

export function decodeReternData<T extends unknownStruct>(
    obj: T, values: unknown[]
): T {
    // Get all keys of the object
    const keys = Object.keys(obj) as (keyof T)[];

    keys.forEach((key, index) => {
        if (index >= values.length) {
            return obj;
        }
        // Use type assertion to assign values
        obj[key] = values[index] as T[keyof T];
    });

    return obj;
}
