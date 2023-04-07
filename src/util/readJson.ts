import fs from "fs";

export function readJson(path: string,) {
    let data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
}