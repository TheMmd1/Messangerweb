// package: file
// file: file.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as file_pb from "./file_pb";

interface IFileStorageServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    upload: IFileStorageServiceService_Iupload;
    download: IFileStorageServiceService_Idownload;
    create_ticket: IFileStorageServiceService_Icreate_ticket;
    getAllStoredFilesNames: IFileStorageServiceService_IGetAllStoredFilesNames;
    removeFile: IFileStorageServiceService_IRemoveFile;
}

interface IFileStorageServiceService_Iupload extends grpc.MethodDefinition<file_pb.UploadChunk, file_pb.UploadControlSignal> {
    path: "/file.FileStorageService/upload";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<file_pb.UploadChunk>;
    requestDeserialize: grpc.deserialize<file_pb.UploadChunk>;
    responseSerialize: grpc.serialize<file_pb.UploadControlSignal>;
    responseDeserialize: grpc.deserialize<file_pb.UploadControlSignal>;
}
interface IFileStorageServiceService_Idownload extends grpc.MethodDefinition<file_pb.DownloadControlSignal, file_pb.DownloadChunk> {
    path: "/file.FileStorageService/download";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<file_pb.DownloadControlSignal>;
    requestDeserialize: grpc.deserialize<file_pb.DownloadControlSignal>;
    responseSerialize: grpc.serialize<file_pb.DownloadChunk>;
    responseDeserialize: grpc.deserialize<file_pb.DownloadChunk>;
}
interface IFileStorageServiceService_Icreate_ticket extends grpc.MethodDefinition<file_pb.CreateTicketRequest, file_pb.CreateTicketResponse> {
    path: "/file.FileStorageService/create_ticket";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<file_pb.CreateTicketRequest>;
    requestDeserialize: grpc.deserialize<file_pb.CreateTicketRequest>;
    responseSerialize: grpc.serialize<file_pb.CreateTicketResponse>;
    responseDeserialize: grpc.deserialize<file_pb.CreateTicketResponse>;
}
interface IFileStorageServiceService_IGetAllStoredFilesNames extends grpc.MethodDefinition<file_pb.Empty, file_pb.Files> {
    path: "/file.FileStorageService/GetAllStoredFilesNames";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<file_pb.Empty>;
    requestDeserialize: grpc.deserialize<file_pb.Empty>;
    responseSerialize: grpc.serialize<file_pb.Files>;
    responseDeserialize: grpc.deserialize<file_pb.Files>;
}
interface IFileStorageServiceService_IRemoveFile extends grpc.MethodDefinition<file_pb.RemoveFileRequest, file_pb.Empty> {
    path: "/file.FileStorageService/RemoveFile";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<file_pb.RemoveFileRequest>;
    requestDeserialize: grpc.deserialize<file_pb.RemoveFileRequest>;
    responseSerialize: grpc.serialize<file_pb.Empty>;
    responseDeserialize: grpc.deserialize<file_pb.Empty>;
}

export const FileStorageServiceService: IFileStorageServiceService;

export interface IFileStorageServiceServer extends grpc.UntypedServiceImplementation {
    upload: grpc.handleBidiStreamingCall<file_pb.UploadChunk, file_pb.UploadControlSignal>;
    download: grpc.handleBidiStreamingCall<file_pb.DownloadControlSignal, file_pb.DownloadChunk>;
    create_ticket: grpc.handleUnaryCall<file_pb.CreateTicketRequest, file_pb.CreateTicketResponse>;
    getAllStoredFilesNames: grpc.handleUnaryCall<file_pb.Empty, file_pb.Files>;
    removeFile: grpc.handleUnaryCall<file_pb.RemoveFileRequest, file_pb.Empty>;
}

export interface IFileStorageServiceClient {
    upload(): grpc.ClientDuplexStream<file_pb.UploadChunk, file_pb.UploadControlSignal>;
    upload(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<file_pb.UploadChunk, file_pb.UploadControlSignal>;
    upload(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<file_pb.UploadChunk, file_pb.UploadControlSignal>;
    download(): grpc.ClientDuplexStream<file_pb.DownloadControlSignal, file_pb.DownloadChunk>;
    download(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<file_pb.DownloadControlSignal, file_pb.DownloadChunk>;
    download(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<file_pb.DownloadControlSignal, file_pb.DownloadChunk>;
    create_ticket(request: file_pb.CreateTicketRequest, callback: (error: grpc.ServiceError | null, response: file_pb.CreateTicketResponse) => void): grpc.ClientUnaryCall;
    create_ticket(request: file_pb.CreateTicketRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: file_pb.CreateTicketResponse) => void): grpc.ClientUnaryCall;
    create_ticket(request: file_pb.CreateTicketRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: file_pb.CreateTicketResponse) => void): grpc.ClientUnaryCall;
    getAllStoredFilesNames(request: file_pb.Empty, callback: (error: grpc.ServiceError | null, response: file_pb.Files) => void): grpc.ClientUnaryCall;
    getAllStoredFilesNames(request: file_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: file_pb.Files) => void): grpc.ClientUnaryCall;
    getAllStoredFilesNames(request: file_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: file_pb.Files) => void): grpc.ClientUnaryCall;
    removeFile(request: file_pb.RemoveFileRequest, callback: (error: grpc.ServiceError | null, response: file_pb.Empty) => void): grpc.ClientUnaryCall;
    removeFile(request: file_pb.RemoveFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: file_pb.Empty) => void): grpc.ClientUnaryCall;
    removeFile(request: file_pb.RemoveFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: file_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class FileStorageServiceClient extends grpc.Client implements IFileStorageServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public upload(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<file_pb.UploadChunk, file_pb.UploadControlSignal>;
    public upload(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<file_pb.UploadChunk, file_pb.UploadControlSignal>;
    public download(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<file_pb.DownloadControlSignal, file_pb.DownloadChunk>;
    public download(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<file_pb.DownloadControlSignal, file_pb.DownloadChunk>;
    public create_ticket(request: file_pb.CreateTicketRequest, callback: (error: grpc.ServiceError | null, response: file_pb.CreateTicketResponse) => void): grpc.ClientUnaryCall;
    public create_ticket(request: file_pb.CreateTicketRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: file_pb.CreateTicketResponse) => void): grpc.ClientUnaryCall;
    public create_ticket(request: file_pb.CreateTicketRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: file_pb.CreateTicketResponse) => void): grpc.ClientUnaryCall;
    public getAllStoredFilesNames(request: file_pb.Empty, callback: (error: grpc.ServiceError | null, response: file_pb.Files) => void): grpc.ClientUnaryCall;
    public getAllStoredFilesNames(request: file_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: file_pb.Files) => void): grpc.ClientUnaryCall;
    public getAllStoredFilesNames(request: file_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: file_pb.Files) => void): grpc.ClientUnaryCall;
    public removeFile(request: file_pb.RemoveFileRequest, callback: (error: grpc.ServiceError | null, response: file_pb.Empty) => void): grpc.ClientUnaryCall;
    public removeFile(request: file_pb.RemoveFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: file_pb.Empty) => void): grpc.ClientUnaryCall;
    public removeFile(request: file_pb.RemoveFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: file_pb.Empty) => void): grpc.ClientUnaryCall;
}
