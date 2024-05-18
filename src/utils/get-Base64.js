"use server";
import { getPlaiceholder } from "plaiceholder";

export const getBase64 = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch image");
        }
        const buffer = await response.arrayBuffer();
        const { base64 } = await getPlaiceholder(Buffer.from(buffer));
        return base64;
    } catch (error) {
        console.log(error)
    }
};