import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    // Path to the Omnibus file
    const filePath = path.join(process.cwd(), '..', 'JUNG_ARCHIVE_SINGULARITY_EVENT.md');

    try {
        const fileBuffer = await fs.promises.readFile(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Disposition': 'attachment; filename="Jung_Singularity_Archive.md"',
                'Content-Type': 'text/markdown',
            },
        });
    } catch (error) {
        console.error("Error reading file:", error);
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
}
