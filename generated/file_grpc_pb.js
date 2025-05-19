// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var file_pb = require('./file_pb.js');

function serialize_file_CreateTicketRequest(arg) {
  if (!(arg instanceof file_pb.CreateTicketRequest)) {
    throw new Error('Expected argument of type file.CreateTicketRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_CreateTicketRequest(buffer_arg) {
  return file_pb.CreateTicketRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_CreateTicketResponse(arg) {
  if (!(arg instanceof file_pb.CreateTicketResponse)) {
    throw new Error('Expected argument of type file.CreateTicketResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_CreateTicketResponse(buffer_arg) {
  return file_pb.CreateTicketResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_DownloadChunk(arg) {
  if (!(arg instanceof file_pb.DownloadChunk)) {
    throw new Error('Expected argument of type file.DownloadChunk');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_DownloadChunk(buffer_arg) {
  return file_pb.DownloadChunk.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_DownloadControlSignal(arg) {
  if (!(arg instanceof file_pb.DownloadControlSignal)) {
    throw new Error('Expected argument of type file.DownloadControlSignal');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_DownloadControlSignal(buffer_arg) {
  return file_pb.DownloadControlSignal.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_Empty(arg) {
  if (!(arg instanceof file_pb.Empty)) {
    throw new Error('Expected argument of type file.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_Empty(buffer_arg) {
  return file_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_Files(arg) {
  if (!(arg instanceof file_pb.Files)) {
    throw new Error('Expected argument of type file.Files');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_Files(buffer_arg) {
  return file_pb.Files.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_RemoveFileRequest(arg) {
  if (!(arg instanceof file_pb.RemoveFileRequest)) {
    throw new Error('Expected argument of type file.RemoveFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_RemoveFileRequest(buffer_arg) {
  return file_pb.RemoveFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_UploadChunk(arg) {
  if (!(arg instanceof file_pb.UploadChunk)) {
    throw new Error('Expected argument of type file.UploadChunk');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_UploadChunk(buffer_arg) {
  return file_pb.UploadChunk.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_UploadControlSignal(arg) {
  if (!(arg instanceof file_pb.UploadControlSignal)) {
    throw new Error('Expected argument of type file.UploadControlSignal');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_UploadControlSignal(buffer_arg) {
  return file_pb.UploadControlSignal.deserializeBinary(new Uint8Array(buffer_arg));
}


// The FileStorageService service definition.
var FileStorageServiceService = exports.FileStorageServiceService = {
  // Uploads chunks of a file and returns control signals.
upload: {
    path: '/file.FileStorageService/upload',
    requestStream: true,
    responseStream: true,
    requestType: file_pb.UploadChunk,
    responseType: file_pb.UploadControlSignal,
    requestSerialize: serialize_file_UploadChunk,
    requestDeserialize: deserialize_file_UploadChunk,
    responseSerialize: serialize_file_UploadControlSignal,
    responseDeserialize: deserialize_file_UploadControlSignal,
  },
  // Downloads chunks of a file and receives control signals.
download: {
    path: '/file.FileStorageService/download',
    requestStream: true,
    responseStream: true,
    requestType: file_pb.DownloadControlSignal,
    responseType: file_pb.DownloadChunk,
    requestSerialize: serialize_file_DownloadControlSignal,
    requestDeserialize: deserialize_file_DownloadControlSignal,
    responseSerialize: serialize_file_DownloadChunk,
    responseDeserialize: deserialize_file_DownloadChunk,
  },
  // Admin-only operation to create a ticket for file upload or download.
create_ticket: {
    path: '/file.FileStorageService/create_ticket',
    requestStream: false,
    responseStream: false,
    requestType: file_pb.CreateTicketRequest,
    responseType: file_pb.CreateTicketResponse,
    requestSerialize: serialize_file_CreateTicketRequest,
    requestDeserialize: deserialize_file_CreateTicketRequest,
    responseSerialize: serialize_file_CreateTicketResponse,
    responseDeserialize: deserialize_file_CreateTicketResponse,
  },
  // RPC to get the names and sizes of all stored files.
getAllStoredFilesNames: {
    path: '/file.FileStorageService/GetAllStoredFilesNames',
    requestStream: false,
    responseStream: false,
    requestType: file_pb.Empty,
    responseType: file_pb.Files,
    requestSerialize: serialize_file_Empty,
    requestDeserialize: deserialize_file_Empty,
    responseSerialize: serialize_file_Files,
    responseDeserialize: deserialize_file_Files,
  },
  // RPC to remove a file with a specific file ID.
removeFile: {
    path: '/file.FileStorageService/RemoveFile',
    requestStream: false,
    responseStream: false,
    requestType: file_pb.RemoveFileRequest,
    responseType: file_pb.Empty,
    requestSerialize: serialize_file_RemoveFileRequest,
    requestDeserialize: deserialize_file_RemoveFileRequest,
    responseSerialize: serialize_file_Empty,
    responseDeserialize: deserialize_file_Empty,
  },
};

exports.FileStorageServiceClient = grpc.makeGenericClientConstructor(FileStorageServiceService);
