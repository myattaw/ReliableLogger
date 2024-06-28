import * as crypto from 'crypto';
import * as fs from 'fs';
import {promisify} from 'util';

const readFile = promisify(fs.readFile);

export async function getFileChecksum(filePath: string, algorithm: string = 'md5'): Promise<string> {
    const hash = crypto.createHash(algorithm);
    const fileBuffer = await readFile(filePath);

    hash.update(fileBuffer);
    return hash.digest('hex');
}
