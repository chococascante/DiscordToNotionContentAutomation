import { promises as fs } from 'fs';
import * as path from 'path';

// Función para leer el archivo de forma asíncrona
export async function readMarkdownFile(filePath: string): Promise<string> {
    const promptFilePath: string = path.join("./", filePath);
    try {
        const data: string = await fs.readFile(promptFilePath, 'utf8');
        return data;
    } catch (err) {
        throw new Error(`Error al leer el archivo: ${err}`);
    }
}