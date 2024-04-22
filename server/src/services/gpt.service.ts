import {Injectable} from '@nestjs/common';
import OpenAI from 'openai';
import * as process from "process";
import {ChatCompletionMessageParam} from "openai/resources";

@Injectable()
export class OpenaiService {
    private openai: OpenAI;
    private readonly model: string;
    private defaultResponseObject = {
        productName: 'Unknown product',
        quantity: 'Unknown quantity',
        date: 'Unknown date'
    }

    private readonly messages: ChatCompletionMessageParam[]

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.GPT_KEY
        });
        this.model = 'gpt-3.5-turbo-0125';
        this.messages = [
            {
                role: "assistant",
                content: `Return list of JSON object with keys ${Object.keys(this.defaultResponseObject).join(', ')}`
            },
            {
                role: "assistant",
                content: `When products are not detected use default JSON object  ${JSON.stringify(this.defaultResponseObject)}`
            },
            {
                role: "assistant",
                content: "date format must be DD/MM/YYYY HH:MM"
            },
            {
                role: "assistant",
                content: "Products must be from metal industry"
            },
            {
                role: "assistant",
                content: "message.content must be array of JSON"
            },
        ]
    }

    async extractInformation(text: string): Promise<[any]> {
        try {
            const messages: ChatCompletionMessageParam[] = [{
                role: "user",
                content: `Input text: ${text}`
            }, ...this.messages]
            const completion = await this.openai.chat.completions.create({
                messages,
                model: this.model,
                response_format: {type: 'json_object'},
            });

            const parsedData: any = JSON.parse(completion.choices[0].message.content);
            if (!Array.isArray(parsedData.isArray)) {
                if ("products" in parsedData) {
                    return parsedData.products
                }
                if ("list" in parsedData) {
                    return parsedData.list
                }
                return [parsedData]
            }

            return parsedData
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}