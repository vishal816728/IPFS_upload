// SPDX-License-Identifier: Vishal
pragma solidity ^0.8.0;

contract DStorage{
   uint fileCount=0;

    struct File{
        uint fileId;
        string fileHash;
        uint fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint uploadTime;
        address payable uploader;
    }

    mapping(uint=>File) public files;
    event FileEvent(
        uint fileId,
        string fileHash,
        uint fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint uploadTime,
        address payable uploader
    );
    constructor() {
      
    }

    function uploadFiles(string memory _fileHash,
    uint _filesize,
    string memory _fileType,
    string memory _filename,
    string memory _fileDescription
    ) public{
        require(msg.sender!=address(0),"not a valid address");
        require(bytes(_fileHash).length>0,"not a valid fileHash");
        require(bytes(_fileType).length>0,"not a valid fileType");
        require(bytes(_filename).length>0,"not a valid fileName");
        require(bytes(_fileDescription).length>0,"not a valid fileDescription");
        require(_filesize>0);
        fileCount++;

        files[fileCount]=File(fileCount,_fileHash,_filesize,_fileType,_filename,_fileDescription,
        block.timestamp,payable(msg.sender));
        
        emit FileEvent(fileCount,_fileHash,_filesize,_fileType,_filename,_fileDescription,
        block.timestamp,payable(msg.sender));
    }
}
