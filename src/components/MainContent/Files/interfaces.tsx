
export interface FileInterface {
  id: number;
  date: string;
  project: number;
  title: string;
  upload: Blob | undefined;
}
export interface FileUploadInterface {
  upload: Blob | undefined;
  projectId: string;
  title: string
}