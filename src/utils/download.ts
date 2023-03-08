import FileSaver from "file-saver";

const download = (url : string, filename : string) => {
    FileSaver.saveAs(url, filename);
};

export default download;