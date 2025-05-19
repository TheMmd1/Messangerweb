// package: file
// file: file.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class AuthInfo extends jspb.Message { 
    getTicket(): string;
    setTicket(value: string): AuthInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthInfo.AsObject;
    static toObject(includeInstance: boolean, msg: AuthInfo): AuthInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthInfo;
    static deserializeBinaryFromReader(message: AuthInfo, reader: jspb.BinaryReader): AuthInfo;
}

export namespace AuthInfo {
    export type AsObject = {
        ticket: string,
    }
}

export class Chunk extends jspb.Message { 
    getChunkId(): number;
    setChunkId(value: number): Chunk;
    getContent(): Uint8Array | string;
    getContent_asU8(): Uint8Array;
    getContent_asB64(): string;
    setContent(value: Uint8Array | string): Chunk;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Chunk.AsObject;
    static toObject(includeInstance: boolean, msg: Chunk): Chunk.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Chunk, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Chunk;
    static deserializeBinaryFromReader(message: Chunk, reader: jspb.BinaryReader): Chunk;
}

export namespace Chunk {
    export type AsObject = {
        chunkId: number,
        content: Uint8Array | string,
    }
}

export class SetOffset extends jspb.Message { 
    getOffset(): number;
    setOffset(value: number): SetOffset;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetOffset.AsObject;
    static toObject(includeInstance: boolean, msg: SetOffset): SetOffset.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetOffset, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetOffset;
    static deserializeBinaryFromReader(message: SetOffset, reader: jspb.BinaryReader): SetOffset;
}

export namespace SetOffset {
    export type AsObject = {
        offset: number,
    }
}

export class UploadChunk extends jspb.Message { 

    hasAuthInfo(): boolean;
    clearAuthInfo(): void;
    getAuthInfo(): AuthInfo | undefined;
    setAuthInfo(value?: AuthInfo): UploadChunk;

    hasSetOffset(): boolean;
    clearSetOffset(): void;
    getSetOffset(): SetOffset | undefined;
    setSetOffset(value?: SetOffset): UploadChunk;

    hasChunk(): boolean;
    clearChunk(): void;
    getChunk(): Chunk | undefined;
    setChunk(value?: Chunk): UploadChunk;

    getContentCase(): UploadChunk.ContentCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UploadChunk.AsObject;
    static toObject(includeInstance: boolean, msg: UploadChunk): UploadChunk.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UploadChunk, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UploadChunk;
    static deserializeBinaryFromReader(message: UploadChunk, reader: jspb.BinaryReader): UploadChunk;
}

export namespace UploadChunk {
    export type AsObject = {
        authInfo?: AuthInfo.AsObject,
        setOffset?: SetOffset.AsObject,
        chunk?: Chunk.AsObject,
    }

    export enum ContentCase {
        CONTENT_NOT_SET = 0,
        AUTH_INFO = 1,
        SET_OFFSET = 2,
        CHUNK = 3,
    }

}

export class UploadInfo extends jspb.Message { 
    getLastChunkId(): number;
    setLastChunkId(value: number): UploadInfo;
    getLastChunkSize(): number;
    setLastChunkSize(value: number): UploadInfo;
    getTotalReceived(): number;
    setTotalReceived(value: number): UploadInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UploadInfo.AsObject;
    static toObject(includeInstance: boolean, msg: UploadInfo): UploadInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UploadInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UploadInfo;
    static deserializeBinaryFromReader(message: UploadInfo, reader: jspb.BinaryReader): UploadInfo;
}

export namespace UploadInfo {
    export type AsObject = {
        lastChunkId: number,
        lastChunkSize: number,
        totalReceived: number,
    }
}

export class UploadControlSignal extends jspb.Message { 
    getRequest(): UploadAction;
    setRequest(value: UploadAction): UploadControlSignal;

    hasUploadInfo(): boolean;
    clearUploadInfo(): void;
    getUploadInfo(): UploadInfo | undefined;
    setUploadInfo(value?: UploadInfo): UploadControlSignal;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UploadControlSignal.AsObject;
    static toObject(includeInstance: boolean, msg: UploadControlSignal): UploadControlSignal.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UploadControlSignal, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UploadControlSignal;
    static deserializeBinaryFromReader(message: UploadControlSignal, reader: jspb.BinaryReader): UploadControlSignal;
}

export namespace UploadControlSignal {
    export type AsObject = {
        request: UploadAction,
        uploadInfo?: UploadInfo.AsObject,
    }
}

export class DownloadControlSignal extends jspb.Message { 

    hasStartRequest(): boolean;
    clearStartRequest(): void;
    getStartRequest(): DownloadStartRequest | undefined;
    setStartRequest(value?: DownloadStartRequest): DownloadControlSignal;

    hasChunkRequest(): boolean;
    clearChunkRequest(): void;
    getChunkRequest(): DownloadChunkRequest | undefined;
    setChunkRequest(value?: DownloadChunkRequest): DownloadControlSignal;

    getRequestCase(): DownloadControlSignal.RequestCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadControlSignal.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadControlSignal): DownloadControlSignal.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadControlSignal, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadControlSignal;
    static deserializeBinaryFromReader(message: DownloadControlSignal, reader: jspb.BinaryReader): DownloadControlSignal;
}

export namespace DownloadControlSignal {
    export type AsObject = {
        startRequest?: DownloadStartRequest.AsObject,
        chunkRequest?: DownloadChunkRequest.AsObject,
    }

    export enum RequestCase {
        REQUEST_NOT_SET = 0,
        START_REQUEST = 1,
        CHUNK_REQUEST = 2,
    }

}

export class DownloadStartRequest extends jspb.Message { 

    hasAuthInfo(): boolean;
    clearAuthInfo(): void;
    getAuthInfo(): AuthInfo | undefined;
    setAuthInfo(value?: AuthInfo): DownloadStartRequest;
    getOffset(): number;
    setOffset(value: number): DownloadStartRequest;
    getChunkSize(): number;
    setChunkSize(value: number): DownloadStartRequest;
    getChunkLimit(): number;
    setChunkLimit(value: number): DownloadStartRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadStartRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadStartRequest): DownloadStartRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadStartRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadStartRequest;
    static deserializeBinaryFromReader(message: DownloadStartRequest, reader: jspb.BinaryReader): DownloadStartRequest;
}

export namespace DownloadStartRequest {
    export type AsObject = {
        authInfo?: AuthInfo.AsObject,
        offset: number,
        chunkSize: number,
        chunkLimit: number,
    }
}

export class DownloadChunkRequest extends jspb.Message { 
    getLastChunkId(): number;
    setLastChunkId(value: number): DownloadChunkRequest;
    getLastChunkSize(): number;
    setLastChunkSize(value: number): DownloadChunkRequest;
    getTotalReceived(): number;
    setTotalReceived(value: number): DownloadChunkRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadChunkRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadChunkRequest): DownloadChunkRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadChunkRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadChunkRequest;
    static deserializeBinaryFromReader(message: DownloadChunkRequest, reader: jspb.BinaryReader): DownloadChunkRequest;
}

export namespace DownloadChunkRequest {
    export type AsObject = {
        lastChunkId: number,
        lastChunkSize: number,
        totalReceived: number,
    }
}

export class DownloadInfo extends jspb.Message { 
    getChunkSize(): number;
    setChunkSize(value: number): DownloadInfo;
    getFileId(): string;
    setFileId(value: string): DownloadInfo;
    getFileSize(): number;
    setFileSize(value: number): DownloadInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadInfo.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadInfo): DownloadInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadInfo;
    static deserializeBinaryFromReader(message: DownloadInfo, reader: jspb.BinaryReader): DownloadInfo;
}

export namespace DownloadInfo {
    export type AsObject = {
        chunkSize: number,
        fileId: string,
        fileSize: number,
    }
}

export class DownloadChunk extends jspb.Message { 

    hasDownloadInfo(): boolean;
    clearDownloadInfo(): void;
    getDownloadInfo(): DownloadInfo | undefined;
    setDownloadInfo(value?: DownloadInfo): DownloadChunk;

    hasChunk(): boolean;
    clearChunk(): void;
    getChunk(): Chunk | undefined;
    setChunk(value?: Chunk): DownloadChunk;

    getContentCase(): DownloadChunk.ContentCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadChunk.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadChunk): DownloadChunk.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadChunk, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadChunk;
    static deserializeBinaryFromReader(message: DownloadChunk, reader: jspb.BinaryReader): DownloadChunk;
}

export namespace DownloadChunk {
    export type AsObject = {
        downloadInfo?: DownloadInfo.AsObject,
        chunk?: Chunk.AsObject,
    }

    export enum ContentCase {
        CONTENT_NOT_SET = 0,
        DOWNLOAD_INFO = 1,
        CHUNK = 2,
    }

}

export class CreateTicketRequest extends jspb.Message { 
    getDirection(): StreamDirection;
    setDirection(value: StreamDirection): CreateTicketRequest;
    getSize(): number;
    setSize(value: number): CreateTicketRequest;

    hasFileId(): boolean;
    clearFileId(): void;
    getFileId(): string | undefined;
    setFileId(value: string): CreateTicketRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateTicketRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateTicketRequest): CreateTicketRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateTicketRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateTicketRequest;
    static deserializeBinaryFromReader(message: CreateTicketRequest, reader: jspb.BinaryReader): CreateTicketRequest;
}

export namespace CreateTicketRequest {
    export type AsObject = {
        direction: StreamDirection,
        size: number,
        fileId?: string,
    }
}

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}

export class CreateTicketResponse extends jspb.Message { 
    getTicketId(): string;
    setTicketId(value: string): CreateTicketResponse;
    getFileId(): string;
    setFileId(value: string): CreateTicketResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateTicketResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateTicketResponse): CreateTicketResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateTicketResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateTicketResponse;
    static deserializeBinaryFromReader(message: CreateTicketResponse, reader: jspb.BinaryReader): CreateTicketResponse;
}

export namespace CreateTicketResponse {
    export type AsObject = {
        ticketId: string,
        fileId: string,
    }
}

export class File extends jspb.Message { 
    getName(): string;
    setName(value: string): File;
    getSize(): number;
    setSize(value: number): File;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): File.AsObject;
    static toObject(includeInstance: boolean, msg: File): File.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: File, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): File;
    static deserializeBinaryFromReader(message: File, reader: jspb.BinaryReader): File;
}

export namespace File {
    export type AsObject = {
        name: string,
        size: number,
    }
}

export class Files extends jspb.Message { 
    clearFilesList(): void;
    getFilesList(): Array<File>;
    setFilesList(value: Array<File>): Files;
    addFiles(value?: File, index?: number): File;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Files.AsObject;
    static toObject(includeInstance: boolean, msg: Files): Files.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Files, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Files;
    static deserializeBinaryFromReader(message: Files, reader: jspb.BinaryReader): Files;
}

export namespace Files {
    export type AsObject = {
        filesList: Array<File.AsObject>,
    }
}

export class RemoveFileRequest extends jspb.Message { 
    getFileId(): string;
    setFileId(value: string): RemoveFileRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveFileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveFileRequest): RemoveFileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveFileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveFileRequest;
    static deserializeBinaryFromReader(message: RemoveFileRequest, reader: jspb.BinaryReader): RemoveFileRequest;
}

export namespace RemoveFileRequest {
    export type AsObject = {
        fileId: string,
    }
}

export enum UploadAction {
    AUTHENTICATE = 0,
    NEXT_CHUNK = 3,
}

export enum StreamDirection {
    DOWNLOAD = 0,
    UPLOAD = 1,
}
