import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  /**Required, the upload address*/
  action: string;
  /**The array for uploaded files */
  defaultFileList?: UploadFile[];
  /**The event before upload, if return false or promise, stop */
  beforeUpload? : (file: File) => boolean | Promise<File>;
  /**The event when upload */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**The event when upload successfully */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**The event when upload unsuccessfully */
  onError?: (err: any, file: UploadFile) => void;
  /**The event when upload no matter successfully or unsuccessfully */
  onChange?: (file: UploadFile) => void;
  /**The event when remove the file */
  onRemove?: (file: UploadFile) => void;
  /**Set the header for upload */
  headers?: {[key: string]: any };
  /**Name for the file */
  name?: string;
  /**Additional data when upload */
  data?: {[key: string]: any };
  /**Sending cookies */
  withCredentials?: boolean;
  /**Acceptable file types */
  accept?: string;
  /**If support uploading multiple files */
  multiple?: boolean;
  /**Support drag function or not */
  drag?: boolean;
}

/**
 * Click or drag the file here for upload
 * ### How to import
 * 
 * ~~~js
 * import { Upload } from 'maplecomponent'
 * ~~~
 */
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    } 
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading'})
          _file.status = 'uploading'
          _file.percent = percentage
          if (onProgress) {
            onProgress(percentage, _file)
          }
        }
      }
    }).then(resp => {
      updateFileList(_file, {status: 'success', response: resp.data})
      _file.status = 'success'
      _file.response = resp.data
      if (onSuccess) {
        onSuccess(resp.data, _file)
      }
      if (onChange) {
        onChange(_file)
      }
    }).catch(err => {
      updateFileList(_file, { status: 'error', error: err})
      _file.status = 'error'
      _file.error = err
      if (onError) {
        onError(err, _file)
      }
      if (onChange) {
        onChange(_file)
      }
    })
  }

  return (
    <div 
      className="viking-upload-component"
    >
      <div className="viking-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}>
          {drag ? 
            <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger>:
            children
          }
        <input
          className="viking-file-input"
          style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList 
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}
export default Upload;