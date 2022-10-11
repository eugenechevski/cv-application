import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

const Modal = (props: any) => {
  const { fileName } = props;
  const pdfFile = require(`src/assets/pdf/${fileName}.pdf`);
  const zoomPluginInstance = zoomPlugin();
  const { ZoomIn, ZoomOut } = zoomPluginInstance;
  
  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-white">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
            <div className="flex">
              <ZoomIn></ZoomIn>
              <ZoomOut></ZoomOut>
            </div>
            <Viewer fileUrl={pdfFile} plugins={[zoomPluginInstance]} />
          </Worker>
          <div className="modal-action">
            <label htmlFor="my-modal-5" className="purple-btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
